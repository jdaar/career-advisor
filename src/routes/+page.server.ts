import { getProfiles } from "$lib/redis";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const profiles = await getProfiles();
    console.log('profiles', profiles);

    return {
        profiles,
    };
};