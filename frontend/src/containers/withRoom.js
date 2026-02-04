import React, { useState, useEffect, useCallback } from 'react'
import { services } from '../feathers'
import useReconnect from '../utils/use-reconnect'

const withRoom = Component => ({
  children,
  match: {
    params: { roomSlug }
  }
}) => {
  const [room, setRoom] = useState(null)
  const handler = useCallback(() => {
    services.roomMembership
      .create({ slug: roomSlug })
      .then(setRoom)
      .then(() => services.rooms.on('patched', setRoom))
  }, [])
  useReconnect(handler)
  if (!room) return null

  return <Component room={room} />
}

export default withRoom
