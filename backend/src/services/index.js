const users = require('./users/users.service.js');
const rooms = require('./rooms/rooms.service.js');
const roomMembership = require('./room-membership/room-membership.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(rooms);
  app.configure(roomMembership);
};
