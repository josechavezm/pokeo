const randomstring = require('randomstring');
// rooms-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const rooms = new Schema(
    {
      slug: { type: String, unique: true },
      votersCount: { type: Number, required: true },
      estimations: [{ userId: { type: Schema.Types.ObjectId, ref: 'users' }, value: Number }],
      createdBy: { type: Schema.Types.ObjectId, ref: 'users' }
    },
    {
      timestamps: true
    }
  );

  rooms.pre('save', function(next) {
    this.slug = randomstring.generate({
      length: 4,
      charset: 'alphabetic',
      readable: true,
      capitalization: 'lowercase'
    });
    next();
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('rooms');
  } catch (e) {
    return mongooseClient.model('rooms', rooms);
  }
};
