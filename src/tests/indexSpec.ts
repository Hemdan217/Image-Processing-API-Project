import supertest from 'supertest';
// eslint-disable-next-line import/no-unresolved, import/extensions
import app from '../index';

const request = supertest(app);
describe('1. Test endpoint responses', () => {
  it('1.1 gets the placeholder endpoint', async done => {
    const response = await request.get('/placeholder');
    expect(response.status).toBe(200);
    done();
  });
  it('1.2 gets the api endpoint', async done => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    done();
  });
  it('1.3 gets the api endpoint', async done => {
    const response = await request.get('/upload');
    expect(response.status).toBe(200);
    done();
  });
  it('1.4 gets the api endpoint', async done => {
    const response = await request.get('/generate');
    expect(response.status).toBe(200);
    done();
  });
});
