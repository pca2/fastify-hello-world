const fastify = require('../server');
const { currentDate } = require('../utils');

describe('Fastify server routes', () => {
  beforeAll(async () => {
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  test('GET / should return Hello World', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/',
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: 'Hello World' });
  });

  test('GET /current-date should return the current date', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/current-date',
    });
    expect(response.statusCode).toBe(200);
    const responseData = response.json();
    expect(responseData).toHaveProperty('currentDate');
    // Check if the returned date is in ISO format
    expect(new Date(responseData.currentDate).toISOString()).toBe(responseData.currentDate);
  });
});