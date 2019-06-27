const UserHandler = require('../../libs/userHandler');

describe('lib.userHandler', () => {
  let userId = 0;
  let imageUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg';

  it('correct input validation', () => {
    const obj = UserHandler.validateUserInput({ userId: 1 });
    expect(obj).toMatchObject({ error: null });
  });

  it('wrong input validation', () => {
    const obj = UserHandler.validateUserInput({ userId: 'sadasd' });
    expect(obj).toHaveProperty('error');
  });

  it('correct image download', async () => {
    const image = await UserHandler.imageDownload(userId, imageUrl);
    expect(`${image}`).toMatch(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/);
  });

  it('correct image base64', async () => {
    const image = await UserHandler.getUserImageB64(userId);
    expect(`${image.data}`).toMatch(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/);
  });

  it('delete image', async () => {
    const obj = await UserHandler.deleteUserImage(userId);
    expect(obj).toBe(undefined);
  });

  it('wrong image base64', async () => {
    const image = await UserHandler.getUserImageB64(userId);
    expect(image).toHaveProperty('error');
  });
});
