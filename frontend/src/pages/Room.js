import React, { useEffect, useState, useRef } from 'react'
import { services } from '../feathers'
import { useMachine } from '../utils/use-machine'
import { useUser } from '../layouts/Auth'
import Voting from '../components/Voting'
import Waiting from '../components/Waiting'
import ShowResult from '../components/ShowResult'
import Button from '../components/Button'
import withRoom from '../containers/withRoom'
import { useMorphKeys } from 'react-morph'
import { assign } from '@xstate/fsm'

const Member = ({ room, ...props }) => {
  const { user, login, setUser } = useUser()

  console.log('TCL: Member -> user', user.canVote)
  // const firstRender = useRef(true)
  // useEffect(() => {
  //   firstRender.current = false
  // }, [])

  const userVoted = room.estimations.map(e => e.userId).includes(user._id)

  const availableVotes = [1, 2, 3, 5, 8, 13, 100]
  const morphs = useMorphKeys(availableVotes)

  const machineRef = {
    initial: user.canVote && !userVoted ? 'voting' : 'waiting',
    context: {
      canVote: user.canVote,
      room: null
    },
    states: {
      waiting: {
        on: {
          ALL_VOTED: 'showResult',
          CAN_VOTE: { target: 'voting', actions: assign(context => ({ canVote: true })) },
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
        }
      },
      showResult: {
        on: {
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
        }
      },
      voting: {
        on: {
          CANT_VOTE: { target: 'waiting', actions: assign(context => ({ canVote: false })) },
          ALL_VOTED: 'showResult',
          VOTED: 'waiting',
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
        }
      }
    }
  }

  useEffect(() => {
    if (!room) return
    if (room.estimations.length === room.votersCount) {
      transition('ALL_VOTED')
      return
    }
    if (userVoted) {
      transition('VOTED')
      return
    }
    if (room.estimations.length === 0) {
      transition('RESTART')
    }
  }, [room])

  const patchRoom = async vote => {
    await services.rooms.patch(room._id, { $push: { estimations: { value: vote } } })
  }

  const handleNewVote = async () => {
    await services.rooms.patch(room._id, { estimations: [] })
  }

  const handleCanVote = async canVote => {
    try {
      const patchedUser = await services.users.patch(user._id, { canVote })
      setUser(patchedUser)
      canVote ? transition('CAN_VOTE') : transition('CANT_VOTE')
    } catch (error) {
      console.log('got error')
    }
  }

  const { state, transition } = useMachine(machineRef)
  if (!room) return null

  const getPage = () => {
    if (state.value === 'showResult') {
      return room.estimations.length > 0 && <ShowResult morphs={morphs} room={room} />
    }
    if (state.value === 'voting') {
      return (
        <Voting
          onCantVote={() => handleCanVote(false)}
          availableVotes={availableVotes}
          morphs={morphs}
          onVote={patchRoom}
        />
      )
    }
    if (state.value === 'waiting') {
      return (
        <Waiting
          onCanVote={() => handleCanVote(true)}
          availableVotes={availableVotes}
          morphs={morphs}
          room={room}
        ></Waiting>
      )
    }
  }

  const isCreator = user._id === room.createdBy

  return (
    <div>
      {getPage()}

      {isCreator && (
        <Button className="mt-6" onClick={handleNewVote}>
          {(state.value === 'waiting' || state.value === 'voting') && <span>Reiniciar votación</span>}
          {state.value === 'showResult' && <span>Empezar nueva votación</span>}
        </Button>
      )}
    </div>
  )
}

export default withRoom(Member)
