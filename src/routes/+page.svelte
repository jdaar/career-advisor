<script lang="ts">
	import { goto } from "$app/navigation";
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="w-full h-full flex flex-col justify-center p-sm items-center">
	<nav class="border rounded p-sm flex flex-col gap-md w-full sm:w-2/3">
        <div class="flex justify-between">
        <h1 class="m-0 text-md font-medium p-sm">Profiles</h1>
                <button
                    class="p-sm text-xs border rounded w-fit border-green-300 bg-green-50 hover:bg-green-100"
                    on:click={() => {
                        goto("/profile/basic");
                    }}
                    aria-label="create-profile"
                >
                Create profile
                </button>
        </div>
        <div class="gap-sm flex flex-col">
        {#each data.profiles as profile}
        <section class="border gap-sm rounded flex-wrap p-sm flex">
            <header class="w-full">
                    <h2 class="text-base font-medium">{profile?.name}</h2>
                    <h3 class="text-gray-700 text-sm">{profile?.email}</h3>
            </header>
            <footer class="flex gap-sm justify-center content-center">
                <button
                    class="p-sm text-xs border rounded w-fit border-gray-300 bg-gray-50 hover:bg-gray-100"
                    aria-label="profile-pipelines"
                >
                Pipelines
                </button>
                <button
                    class="p-sm text-xs border rounded w-fit border-gray-300 bg-gray-50 hover:bg-gray-100"
                    aria-label="edit-profile"
                >
                Edit
                </button>
                <button
                    class="p-sm text-xs border rounded w-fit border-red-300 bg-red-50 hover:bg-red-100"
                    aria-label="delete-profile"
                >
                Delete 
                </button>
            </footer>
        </section>
        {/each}
        </div>
    </nav>
</div>