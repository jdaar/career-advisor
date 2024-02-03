import { deleteProfile, getProfiles } from "$lib/redis";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const profiles = await getProfiles();

    return {
        profiles,
    };
};

export const actions = {
	delete: async ({ cookies, request }) => {
        const data = await request.formData();
        const tag = data.get('tag') as string;

        await deleteProfile(tag);
    }
} satisfies Actions;