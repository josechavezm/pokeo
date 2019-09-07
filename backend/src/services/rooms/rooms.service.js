// Initializes the `rooms` service on path `/api/rooms`
const { Rooms } = require('./rooms.class');
const createModel = require('../../models/rooms.model');
const hooks = require('./rooms.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/rooms', new Rooms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/rooms');

  service.publish((data, context) => {
    // Filter the channels to only authenticated
    return app.channel(`room/${data.slug}`);
  });

  service.hooks(hooks);
};
