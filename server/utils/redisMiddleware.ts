import { NextFunction, Request, Response } from "express";
import redisClient from "../services/redisClient";

const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const cacheKey = req.originalUrl;

        const cacheData = await redisClient.get(cacheKey);

        if (cacheData) {
            return res.json(JSON.parse(cacheData))
        }
        next()
    } catch (error) {
        return res.status(400).json({ message: "Redis Middleware Error", error })
    }
};

const invalidateCache = async (cacheKey: string) => {
    try {
        const response = await redisClient.del(cacheKey);
        console.log(`Cache key "${cacheKey}" invalidated. Response: ${response}`);
    } catch (err) {
        console.error(`Error invalidating cache key "${cacheKey}":`, err);
        throw err;
    }
};

module.exports = { cacheMiddleware, invalidateCache }