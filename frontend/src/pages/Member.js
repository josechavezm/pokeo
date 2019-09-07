import React, { useEffect, useState } from 'react'
import { services } from '../feathers'

const Member = ({
  match: {
    params: { roomSlug }
  },
  ...props
}) => {
  const [room, setRoom] = useState()

  useEffect(() => {
    services.roomMembership.create({ slug: roomSlug }).then(setRoom)
  }, [])

  useEffect(() => {
    services.rooms.on('patched', message => console.log('New room patched', message))
  }, [])

  const patchRoom = vote => () => {
    services.rooms.patch(room._id, { $push: { votes: vote } })
  }

  const availableVotes = [1, 2, 3, 5, 8, 13, 100]

  return (
    <div>
      Vota!
      <div className="flex flex-wrap mt-4 -mx-4">
        {availableVotes.map(a => (
          <button key={a} onClick={patchRoom(a)} className="mx-4 mb-4 min-w-8 block bg-red-500 py-20 ">
            {a}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Member
