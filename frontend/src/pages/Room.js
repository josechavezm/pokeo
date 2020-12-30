import React, { useEffect, useState, useRef } from 'react'
import { services } from '../feathers'
import { useUser } from '../layouts/Auth'
import Voting from '../components/Voting'
import Waiting from '../components/Waiting'
import ShowResult from '../components/ShowResult'
import Button from '../components/Button'
import withRoom from '../containers/withRoom'
import { useMorphKeys } from 'react-morph'
import { assign } from 'xstate'
import { useMachine } from '@xstate/react'
import { Machine } from 'xstate'

const Member = ({ room, ...props }) => {
  const { user, login, setUser } = useUser()
  const availableVotes = [1, 2, 3, 5, 8, 13, 100]
  const morphs = useMorphKeys(availableVotes)
  const userVoted = room.estimations.map(e => e.userId).includes(user._id)
  const roomMachine = Machine(
    {
      initial: 'verifying',
      context: {
        canVote: user.canVote,
        room
      },
      on: {
        SYNC_ROOM: {
          actions: 'syncRoom'
        },
        RESTART: [
          {
            target: 'voting',
            cond: context => context.canVote
          },
          {
            target: 'waiting',
            cond: context => !context.canVote
          }
        ]
      },
      states: {
        verifying: {
          on: {
            '': [
              {
                target: 'voting',
                cond: ctx => user.canVote && !userVoted
              },
              { target: 'waiting', cond: ctx => !user.canVote }
            ]
          }
        },
        waiting: {
          on: {
            ALL_VOTED: 'showResult',
            CAN_VOTE: {
              target: 'voting',
              actions: assign(context => ({ canVote: true }))
            }
          }
        },
        showResult: {},
        voting: {
          on: {
            CANT_VOTE: {
              target: 'waiting',
              actions: assign(context => ({ canVote: false }))
            },
            ALL_VOTED: 'showResult',
            VOTED: 'waiting'
          }
        }
      }
    },
    {
      actions: {
        syncRoom: assign((context, event) => ({
          room: event.room
        }))
      }
    }
  )
  const [current, send] = useMachine(roomMachine)

  useEffect(() => {
    const prevRoom = current.context.room
    const prevUserVoted = prevRoom?.estimations.map(e => e.userId).includes(user._id)
    const userVoted = room.estimations.map(e => e.userId).includes(user._id)
    if (prevRoom?.estimations.length <= room.estimations.length && room.estimations.length === room.votersCount) {
      send('ALL_VOTED', room)
    }
    if (!prevUserVoted && userVoted) {
      send('VOTED', room)
    }
    if (prevRoom?.estimations.length > 0 && room.estimations.length === 0) {
      send('RESTART', room)
    }
    send('SYNC_ROOM', { room })
  }, [room])

  const patchRoom = vote =>
    services.rooms.patch(current.context.room._id, {
      $push: { estimations: { value: vote } }
    })

  const handleNewVote = () => services.rooms.patch(room._id, { estimations: [] })

  const handleCanVote = async canVote => {
    try {
      const patchedUser = await services.users.patch(user._id, { canVote })
      setUser(patchedUser)
      canVote ? send('CAN_VOTE') : send('CANT_VOTE')
    } catch (error) {
      console.log('got error')
    }
  }

  const getPage = () => {
    if (current.value === 'showResult') {
      return <ShowResult morphs={morphs} room={current.context.room} />
    }
    if (current.value === 'voting') {
      return (
        <Voting
          onCantVote={() => handleCanVote(false)}
          availableVotes={availableVotes}
          morphs={morphs}
          onVote={patchRoom}
        />
      )
    }
    if (current.value === 'waiting') {
      return (
        <Waiting
          onCanVote={() => handleCanVote(true)}
          availableVotes={availableVotes}
          morphs={morphs}
          room={current.context.room}
        />
      )
    }
  }

  const isCreator = user._id === room.createdBy

  return (
    <div>
      {getPage()}
      {isCreator && (
        <Button className="mt-6" onClick={handleNewVote}>
          {(current.value === 'waiting' || current.value === 'voting') && <span>Reiniciar votación</span>}
          {current.value === 'showResult' && <span>Empezar nueva votación</span>}
        </Button>
      )}
    </div>
  )
}

export default withRoom(Member)
