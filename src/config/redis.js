const { createClient } = require('redis');


const RedisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'megastable-basin-ground-20388.db.redis.io',
        port: 15315
    }
});

module.exports = RedisClient;