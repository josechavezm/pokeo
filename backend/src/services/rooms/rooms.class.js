const { Service } = require('feathers-mongoose');

exports.Rooms = class Rooms extends Service {
  setup(app) {
    this.app = app;
  }
  async create(data, params) {
    const userId = params.user._id;
    await this.app.service('api/users').patch(userId, { canVote: false }); //quien crea no vota
    return super.create({ ...data, createdBy: userId });
  }
  async patch(_id, data, params) {
    const userId = params.user._id;
    if (params && params.$push && params.$push.estimations) {
      //se agrega userid a la votacion
      params.push.estimations.userId = userId;
    }
    return super.patch(_id, data, params);
  }
};
