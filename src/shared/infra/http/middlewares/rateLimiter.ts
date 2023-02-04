import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import { AppError } from '@shared/errors/AppError';

const redisClient = redis.createClient({
	url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on('connect', () => {
	console.log(' - Redis client successfully connected');
});

const limiter = new RateLimiterRedis({
	storeClient: redisClient,
	keyPrefix: 'rateLimiter',
	points: 5,
	duration: 5,
});

export default async function rateLimiter(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	try {
		await limiter.consume(request.ip);

		next();
	} catch (err) {
		throw new AppError('Too many requests', 429);
	}
}
