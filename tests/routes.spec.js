const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return json object with a specified format', (done) => {
    const expectedResult = {
      message: 'My Rule-Validation API.',
      status: 'success',
      data: {
        name: 'Gideon Idowu',
        github: '@Prodigy00',
        email: 'simplygiddy@gmail.com',
        mobile: '08064999937',
      },
    };
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(expectedResult)
      .then(() => done())
      .catch((err) => done(err));
  });
});

describe('POST /validate-rule', () => {
  it('should throw an error if the rule field is missing', (done) => {
    const data = { data: 'some data' };
    const expectedResult = {
      message: 'rule is required.',
      status: 'error',
      data: null,
    };
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(expectedResult)
      .then(() => done())
      .catch((err) => done(err));
  });

  it('should throw an error if the data field is missing', (done) => {
    const data = {
      rule: {
        field: 'missions',
        condition: 'gte',
        condition_value: 30,
      },
    };
    const expectedResult = {
      message: 'data is required.',
      status: 'error',
      data: null,
    };
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(expectedResult)
      .then(() => done())
      .catch((err) => done(err));
  });

  it('should throw an error if the rule field is not an object', (done) => {
    const data = {
      rule: 'some rule',
    };
    const expectedResult = {
      message: 'rule must be of type object.',
      status: 'error',
      data: null,
    };
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(expectedResult)
      .then(() => done())
      .catch((err) => done(err));
  });

  it('should throw an error if the field specified in the rule object is missing from the data passed', (done) => {
    const data = {
      rule: {
        field: 'missions.score',
        condition: 'gte',
        condition_value: 30,
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45,
      },
    };
    const expectedResult = {
      message: 'field score is missing from data.',
      status: 'error',
      data: null,
    };
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(expectedResult)
      .then(() => done())
      .catch((err) => done(err));
  });

  it('should respond with a 200 status code and a response object if rule is successfully validated', (done) => {
    const data = {
      rule: {
        field: 'missions',
        condition: 'gte',
        condition_value: 30,
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45,
      },
    };
    const expectedResult = {
      message: 'field missions successfully validated.',
      status: 'success',
      data: {
        validation: {
          error: false,
          field: 'missions',
          field_value: 45,
          condition: 'gte',
          condition_value: 30,
        },
      },
    };
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(expectedResult)
      .then(() => done())
      .catch((err) => done(err));
  });

  it('should respond with a 400 status code and a response object if rule validation fails', (done) => {
    const data = {
      rule: {
        field: 'missions',
        condition: 'gte',
        condition_value: 50,
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 1,
      },
    };

    const expectedResult = {
      message: 'field missions failed validation.',
      status: 'error',
      data: {
        validation: {
          error: true,
          field: 'missions',
          field_value: 1,
          condition: 'gte',
          condition_value: 50,
        },
      },
    };
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(expectedResult)
      .then(() => done())
      .catch((err) => done(err));
  });
});
