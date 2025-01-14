import redis from "redis"

const redisUrl = process.env.REDIS_URL

const redisClient = redis.createClient({
    url: redisUrl,
})

redisClient.connect().catch((err) => {
    console.error("Failed to connect to Redis:", err)
})

redisClient.on("connect", () => {
    console.log('Connected to Redis');
})

redisClient.on("error", (err) => {
    console.error('Redis error:', err);
});

export default redisClient