const allowAnonymous = require('../../hooks/allow-anonymous');
const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [allowAnonymous(), authenticate('jwt', 'anonymous')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
