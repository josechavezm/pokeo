/* eslint-disable no-unused-vars */
exports.RoomMembership = class RoomMembership {
  constructor(options, app) {
    this.app = app || {};
    this.options = options || {};
  }

  async create(data, params) {
    if (params.connection) {
      this.app.channel(`room/${data.slug}`).join(params.connection);
    }
    const room = await this.app.service('api/rooms').find({ slug: data.slug });
    return room.data[0];
  }

  async remove(slug, params) {
    if (params.connection) {
      this.app.channel(`room/${slug}`).leave(params.connection);
    }
    return { slug };
  }
};
