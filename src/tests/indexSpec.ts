import supertest from 'supertest';
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
});
