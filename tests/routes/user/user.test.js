const request = require('supertest');
const server = require('../../../index');
const UserHandler = require('../../../libs/userHandler');

describe('user route get id', () => {
  const userId = 1;

  const getUser = user => request(server).get(`/api/user/${user}`);
  const getAvatar = user => request(server).get(`/api/user/${user}/avatar`);
  const deleteAvatar = user => request(server).delete(`/api/user/${user}/avatar`);

  afterEach(async () => {
    await server.close();
  });

  it('user get success', async () => {
    const user = await getUser(userId);
    expect(user.status).toBe(200);
  });

  it('user get wrong user id', async () => {
    const user = await getUser('asdafs');
    expect(user.status).toBe(400);
  });

  it('user get avatar success', async () => {
    const avatar = await getAvatar(userId);
    expect(avatar.status).toBe(200);
    expect(`${avatar.body.data.avatar}`).toMatch(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/);
  });

  it('user get avatar wrong user id', async () => {
    const avatar = await getAvatar('asdafs');
    expect(avatar.status).toBe(400);
  });

  it('user delete avatar success', async () => {
    const avatar = await deleteAvatar(userId);
    expect(avatar.status).toBe(200);

    const image = await UserHandler.getUserImageB64(userId);
    expect(image).toHaveProperty('error');
  });

  it('user delete avatar wrong user id', async () => {
    const avatar = await deleteAvatar('asdafs');
    expect(avatar.status).toBe(400);
  });
});
