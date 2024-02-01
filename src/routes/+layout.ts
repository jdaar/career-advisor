import { createUserStore } from "$lib/stores/user";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
    const userStore = createUserStore();

    return {
        userStore,
    };
};