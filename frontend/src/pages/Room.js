import React, { useEffect, useState, useRef } from 'react'
import { services } from '../feathers'
import { useMachine } from '../utils/use-machine'
import { useUser } from '../layouts/Auth'
import Voting from '../components/Voting'
import Waiting from '../components/Waiting'
import ShowResult from '../components/ShowResult'

const Member = ({
  match: {
    params: { roomSlug }
  },
  ...props
}) => {
  const [room, setRoom] = useState(null)
  const { user } = useUser()

  const machineRef = useRef(
    {
      // TODO: revisar cuando ya voto
      initial: user.canVote ? 'voting' : 'waiting',
      states: {
        waiting: {
          on: {
            ALL_VOTED: 'showResult'
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
            VOTED: 'waiting'
          }
        }
      }
    },
    [user.canVote]
  )

  useEffect(() => {
    services.roomMembership
      .create({ slug: roomSlug })
      .then(setRoom)
      .then(() => {
        services.rooms.on('patched', room => setRoom(room))
      })
  }, [])

  useEffect(() => {
    if (!room) return
    if (room.estimations.length === 0) {
      transition('RESTART')
      return
    }
    if (room.estimations.length === room.votersCount) {
      console.log(new Date(), 'all_voted')
      transition('ALL_VOTED')
    }
  }, [room])

  const patchRoom = async vote => {
    await services.rooms.patch(room._id, { $push: { estimations: { value: vote } } })
    transition('VOTED')
  }

  const handleNewVote = async () => {
    await services.rooms.patch(room._id, { estimations: [] })
    transition('RESTART')
  }

  const { state, transition } = useMachine(machineRef.current)
  if (!room) return null
  const isCreator = user._id === room.createdBy
  if (state.value === 'showResult') {
    return room.estimations.length > 0 && <ShowResult onNewVote={handleNewVote} isCreator={isCreator} room={room} />
  }
  if (state.value === 'voting') return <Voting onVote={patchRoom} />
  if (state.value === 'waiting') return <Waiting room={room}></Waiting>

  return <div>wut</div>
}

export default Member
