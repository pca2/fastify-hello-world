// server.js
const fastify = require('fastify')({ logger: true });
const { currentDate } = require('./utils');

// "Hello World" route
fastify.get('/', async (request, reply) => {
  return { message: 'Hello World' };
});

// Route to get the current date
fastify.get('/current-date', async (request, reply) => {
  const date = currentDate();
  return { currentDate: date };
});

// Export the server instance for testing
module.exports = fastify;

// Run the server if this file is executed directly
if (require.main === module) {
  const start = async () => {
    try {
      await fastify.listen(3000);
      fastify.log.info(`Server is running at http://localhost:3000`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  start();
}
