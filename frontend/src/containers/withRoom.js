import React, { useState, useEffect } from 'react'
import { services } from '../feathers'

const withRoom = Component => ({
  children,
  match: {
    params: { roomSlug }
  }
}) => {
  const [room, setRoom] = useState(null)

  useEffect(() => {
    services.roomMembership
      .create({ slug: roomSlug })
      .then(setRoom)
      .then(() => {
        services.rooms.on('patched', room => setRoom(room))
      })
  }, [])

  if (!room) return null

  return <Component room={room} />
}

export default withRoom
