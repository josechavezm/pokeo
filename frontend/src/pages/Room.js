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

const Member = ({ room, ...props }) => {
  const { user } = useUser()
  // const firstRender = useRef(true)
  // useEffect(() => {
  //   firstRender.current = false
  // }, [])

  const userVoted = room.estimations.map(e => e.userId).includes(user._id)

  const availableVotes = [1, 2, 3, 5, 8, 13, 100]
  const morphs = useMorphKeys(availableVotes)

  const machineRef = useRef(
    {
      // TODO: revisar cuando ya voto
      initial: user.canVote && !userVoted ? 'voting' : 'waiting',
      context: {
        room: null
      },
      states: {
        waiting: {
          on: {
            ALL_VOTED: 'showResult',
            RESTART: user.canVote ? 'voting' : 'waiting'
          }
        },
        showResult: {
          on: {
            RESTART: user.canVote ? 'voting' : 'waiting'
          }
        },
        voting: {
          on: {
            ALL_VOTED: 'showResult',
            VOTED: 'waiting',
            RESTART: user.canVote ? 'voting' : 'waiting'
          }
        }
      }
    },
    [user.canVote]
  )

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

  const { state, transition } = useMachine(machineRef.current)
  if (!room) return null

  const getPage = () => {
    if (state.value === 'showResult') {
      return room.estimations.length > 0 && <ShowResult morphs={morphs} room={room} />
    }
    if (state.value === 'voting') {
      return <Voting availableVotes={availableVotes} morphs={morphs} onVote={patchRoom} />
    }
    if (state.value === 'waiting') {
      return <Waiting availableVotes={availableVotes} morphs={morphs} room={room}></Waiting>
    }
  }

  const isCreator = user._id === room.createdBy

  return (
    <div>
      {getPage()}
      {isCreator && (
        <Button onClick={handleNewVote}>
          {state.value === 'waiting' && <span>Reiniciar votación</span>}
          {state.value === 'showResult' && <span>Empezar nueva votación</span>}
        </Button>
      )}
    </div>
  )
}

export default withRoom(Member)
