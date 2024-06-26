<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { createPagination, melt } from '@melt-ui/svelte';
	import type { LayoutData } from '../$types';
	import Alert from '$lib/components/alert.svelte';
	import { blur } from 'svelte/transition';
	import { prettyName } from '$lib/utils';

	const routes = ['/profile/basic', '/profile/details', '/profile/summary'];

	const {
		elements: {
			root: rootPagination,
			pageTrigger: pageTriggerPagination,
			prevButton: prevButtonPagination,
			nextButton: nextButtonPagination
		},
		states: { pages: pagesPagination, range: rangePagination }
	} = createPagination({
		count: routes.length,
		perPage: 1,
		defaultPage: 1,
		siblingCount: 1
	});

	$: {
		if (browser) goto(routes[$rangePagination.start]);
	}

	export let data: LayoutData;

	const { error$ } = data.userStore;
</script>

<div class="w-full h-full flex flex-col justify-center p-sm items-center">
	{#if $error$ && $error$.length > 0}
		<div class="sm:w-2/3 w-full">
			<Alert>
				<p class="font-bold">There was an error validating the following fields</p>
				{#each $error$ as error}
					<p class="flex flex-col sm:flex-row mt-sm">
						<span class="font-semibold w-full sm:w-20 mr-md"
							>{prettyName(error.field)}</span
						>
						<span class="flex flex-col">
							{#each error.message as message}
								<span>{message}</span>
							{/each}
						</span>
					</p>
				{/each}
			</Alert>
		</div>
	{/if}
	<nav class="border rounded p-sm flex flex-col gap-sm w-full sm:w-2/3" use:melt={$rootPagination}>
		<div>
			<div class="flex justify-between">
				<h1 class="m-0 text-md font-medium p-sm">Create profile</h1>
				<button
					class="p-sm text-xs border rounded w-fit border-gray-300 bg-gray-50 hover:bg-gray-100"
					on:click={() => {
						goto("/");
					}}
					aria-label="go-back"
				>
				Go back
				</button>
			</div>
			{#key $rangePagination.start}
				<div in:blur>
					<slot />
				</div>
			{/key}
		</div>
		<div class="w-full flex flex-wrap justify-center gap-sm">
			<button class="hover:bg-gray-200 p-sm border rounded text-xs" use:melt={$prevButtonPagination}>Prev</button>
			{#each $pagesPagination as page}
				{#if page.type === 'ellipsis'}
					<span>...</span>
				{:else}
					<button
						class="hover:bg-gray-200 p-sm pl-md pr-md text-xs border rounded {$rangePagination.end == page.value &&
							'bg-gray-100'}"
						use:melt={$pageTriggerPagination(page)}>{page.value}</button
					>
				{/if}
			{/each}
			<button class="hover:bg-gray-200 p-sm border rounded text-xs" use:melt={$nextButtonPagination}>Next</button>
		</div>
	</nav>
</div>
