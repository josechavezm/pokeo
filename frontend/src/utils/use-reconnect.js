import React, { useEffect } from 'react'
import { socket } from '../feathers'

const useReconnect = handler => {
  useEffect(() => {
    handler()
    socket.on('reconnect', handler)
    return () => socket.removeListener('reconnect', handler)
  }, [handler])
}

export default useReconnect
