import { createClient } from "redis";

let redisClient;

const getRedisClient = async () => {
  if (!redisClient) {
    redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST || "127.0.0.1"}:${process.env.REDIS_PORT || 6379}`,
    });

    redisClient.on("error", (err) => console.error("Redis error:", err));

    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  }
  return redisClient;
};

export default getRedisClient;