import Redis from 'ioredis';
import type { UserProfile } from './types';

// TODO: multi user
const userId = 'jhonatan';

const redisClient = new Redis({ keyPrefix: `user:${userId}:` });

// ts-ignore
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

export async function getProfiles() {
    return (await Promise.allSettled(
        (await redisClient.smembers('profiles'))
            .map(async (id) => {
                const profile = await redisClient.hgetall(`profile:${id}`);
                return {
                    tag: `profile:${id}`,
                    ...profile
                } as {
                    tag: string;
                    name: string;
                    email: string;
                    cellphone: string;
                    yearsOfExperience: string;
                };
        })
    )).map((result) => result.status === 'fulfilled' ? result.value : null);
}

export async function deleteProfile(tag: string) {
    await redisClient.srem('profiles', tag.split(':')[1]);
    await redisClient.del(tag);
    
    (await redisClient.smembers(`${tag}:experiences`)).forEach(async (id) => {
        await redisClient.del(`experience:${id}`);
    });
    await redisClient.del(`${tag}:experiences`);

    (await redisClient.smembers(`${tag}:educations`)).forEach(async (id) => {
        await redisClient.del(`education:${id}`);
    }); 
    await redisClient.del(`${tag}:educations`);

    (await redisClient.smembers(`${tag}:projects`)).forEach(async (id) => {
        await redisClient.del(`project:${id}`);
    });
    await redisClient.del(`${tag}:projects`);

    await redisClient.del(`${tag}:skills`);
}

export async function createUserProfile(user: UserProfile) {
    const id = crypto.randomUUID();
    await redisClient.hset(`profile:${id}`, {
        name: user.name,
        email: user.email,
        cellphone: user.cellphone,
        yearsOfExperience: user.yearsOfExperience
    });
    
    const profilePrefix = `profile:${id}:`;

    await redisClient.sadd('profiles', id);
    await redisClient.sadd(`${profilePrefix}skills`, ...user.skills);


    for (const exp of user.experience) {
        const expId = crypto.randomUUID();
        await redisClient.hset(`experience:${expId}`, exp);
        await redisClient.sadd(`${profilePrefix}experiences`, expId);
    }

    for (const edu of user.education) {
        const eduId = crypto.randomUUID();
        await redisClient.hset(`education:${eduId}`, edu);
        await redisClient.sadd(`${profilePrefix}educations`, eduId);
    }

    for (const proj of user.projects) {
        const projId = crypto.randomUUID();
        await redisClient.hset(`project:${projId}`, proj);
        await redisClient.sadd(`${profilePrefix}projects`, projId);
    }
}