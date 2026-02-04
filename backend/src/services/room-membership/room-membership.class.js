const { NotFound } = require('@feathersjs/errors');
/* eslint-disable no-unused-vars */
exports.RoomMembership = class RoomMembership {
  constructor(options, app) {
    this.app = app || {};
    this.options = options || {};
  }

  async create(data, params) {
    const rooms = await this.app.service('api/rooms').find({ query: { slug: data.slug } });
    const room = rooms.data[0];
    if (!room) {
      throw new NotFound('La sala no existe');
    }
    if (params.connection) {
      try {
        this.app.channel(`room/${data.slug}`).join(params.connection);
      } catch (error) {
        console.log(error);
      }
    }
    return room;
  }

  async remove(slug, params) {
    if (params.connection) {
      this.app.channel(`room/${slug}`).leave(params.connection);
    }
    return { slug };
  }
};
