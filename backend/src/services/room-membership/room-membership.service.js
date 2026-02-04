// Initializes the `RoomMembership` service on path `/api/room-membership`
const { RoomMembership } = require('./room-membership.class');
const hooks = require('./room-membership.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/room-membership', new RoomMembership(options, app));
  // Get our initialized service so that we can register hooks
  const service = app.service('api/room-membership');

  service.hooks(hooks);
};
