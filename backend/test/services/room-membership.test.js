const app = require('../../src/app');

describe('\'RoomMembership\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/room-membership');
    expect(service).toBeTruthy();
  });
});
