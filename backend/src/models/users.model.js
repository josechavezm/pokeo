// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema(
    {
      email: {
        type: String,
        lowercase: true,
        index: {
          unique: true,
          partialFilterExpression: { email: { $type: 'string' } }
        }
      },
      role: { type: String, enum: ['master', 'member', 'product_owner'], default: 'member' },
      canVote: {
        type: Boolean,
        default: function() {
          return this.role === 'member';
        }
      },
      anonymous: { type: Boolean },
      password: { type: String },

      googleId: { type: String },

      githubId: { type: String }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('users', users);
};
