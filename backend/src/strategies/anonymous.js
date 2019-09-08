const { AuthenticationBaseStrategy } = require('@feathersjs/authentication');

class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication, params) {
    if (authentication.strategy !== 'anonymous') throw new Error();
    const { entity } = this.configuration;
    const user = await this.entityService.create({ anonymous: true });
    return {
      [entity]: user,
      anonymous: true
    };
  }
}

module.exports = AnonymousStrategy;
