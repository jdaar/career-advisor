import Redis from 'ioredis';
import type { UserProfile } from './types';

// TODO: multi user
const userId = 'jhonatan';

const redisClient = new Redis({ keyPrefix: `user:${userId}:` });

export async function getProfiles() {
    return (await Promise.allSettled(
        (await redisClient.smembers('profiles'))
            .map(async (id) => {
                const profile = await redisClient.hgetall(`profile:${id}`);
                return profile;
        })
    )).map((result) => result.status === 'fulfilled' ? result.value : null);
}

export async function createUserProfile(user: UserProfile) {
    const id = crypto.randomUUID();
    await redisClient.hset(`profile:${id}`, {
        name: user.name,
        email: user.email,
        cellphone: user.cellphone,
        yearsOfExperience: user.yearsOfExperience
    });
    await redisClient.sadd('profiles', id);
    await redisClient.sadd(`profile:${id}:skills`, ...user.skills);

    for (const exp of user.experience) {
        const expId = crypto.randomUUID();
        await redisClient.hset(`experience:${expId}`, exp);
        await redisClient.sadd(`profile:${id}:experiences`, expId);
    }

    for (const edu of user.education) {
        const eduId = crypto.randomUUID();
        await redisClient.hset(`education:${eduId}`, edu);
        await redisClient.sadd(`profile:${id}:educations`, eduId);
    }

    for (const proj of user.projects) {
        const projId = crypto.randomUUID();
        await redisClient.hset(`project:${projId}`, proj);
        await redisClient.sadd(`profile:${id}:projects`, projId);
    }
}