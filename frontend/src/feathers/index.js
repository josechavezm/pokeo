import feathers from '@feathersjs/client'
import io from 'socket.io-client'

const url = process.env.NODE_ENV === 'production' ? 'http://localhost:3030' : 'http://localhost:3030'
const socket = io(url, { transports: ['websocket'], forceNew: true })
// const restClient = feathers.rest(url)
const socketClient = feathers.socketio(socket)
export const app = feathers()

app.configure(socketClient)
// .configure(restClient.fetch(window.fetch))
app.configure(
  feathers.authentication({
    storage: typeof window !== 'undefined' && window.localStorage,
    path: '/api/authentication'
  })
)

export const services = {
  users: app.service('api/users'),
  rooms: app.service('api/rooms'),
  roomMembership: app.service('api/room-membership')
}
