const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');

dotenv.config();

fastify.register(require('fastify-mongodb'), {
	forceClose: true,
	url: process.env.MONGO_URL,
});

fastify.get('/', function (req, reply) {
	reply.send('Hello, world!');
});

fastify.listen(8080, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	fastify.log.info(`server listening on ${address}`);
});
