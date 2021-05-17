const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return json object', async (done) => {
    await request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .then((res) => {
        expect(res.body).toMatchObject({
          message: 'My Rule-Validation API.',
          status: 'success',
          data: {
            name: 'Gideon Idowu',
            github: '@Prodigy00',
            email: 'simplygiddy@gmail.com',
            mobile: '08064999937',
          },
        });
        done();
      })
      .catch((err) => done(err));
  });
});
