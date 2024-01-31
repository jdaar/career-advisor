<script lang="ts">
	import { createSvelteBehaviourSubject } from '$lib/stores';
	import type { ListedData } from '$lib/types';
	import { createPopover, createLabel, melt } from '@melt-ui/svelte';
	import { BehaviorSubject } from 'rxjs';
	import { fade } from 'svelte/transition';
	import ListInputItem from './list-input-item.svelte';

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true
	});

	const {
		elements: { root: rootLabel }
	} = createLabel();

	export let id: string;
	export let items: BehaviorSubject<ListedData[]>;
	export let error: string | null = null;
	export let title: string;
	export let dictionary: {
		title: string;
		subtitle: string;
		description: string;
	} = {
		title: 'Untitled',
		subtitle: 'No subtitle',
		description: 'No description'
	};

	const modalTitle$ = createSvelteBehaviourSubject<string>('');
	const modalSubtitle$ = createSvelteBehaviourSubject<string>('');
</script>

<fieldset class="flex flex-col pt-sm pb-sm">
	<div
		class="flex h-fit justify-between border rounded-none rounded-t-lg m-0 {error !== null
			? 'bg-yellow-100 border-yellow-400'
			: 'bg-gray-100'}"
	>
		<label for={id} class="text-xs font-medium h-fit self-center pl-sm" use:melt={$rootLabel}
			>{title ?? 'Untitled'}</label
		>
		<button
			use:melt={$trigger}
			class="p-sm pl-md pr-md text-xs border-l rounded-tr-lg {error !== null
				? 'bg-yellow-200 border-yellow-400 hover:bg-yellow-300'
				: 'bg-gray-200 hover:bg-gray-300'}"
			aria-label="Create education"
		>
			<span class="sr-only">Open Popover</span>
			+
		</button>
		{#if $open}
			<div use:melt={$content} transition:fade={{ duration: 100 }} class="content">
				<div use:melt={$arrow} />
				<div class="flex flex-col gap-2.5 bg-white p-sm border rounded">
					<fieldset>
						<label for={`${id}-title`} class="text-xs font-medium" use:melt={$rootLabel}
							>{dictionary.title}</label
						>
						<input
							id={`${id}-title`}
							bind:value={$modalTitle$}
							type="text"
							class="border rounded w-full p-sm text-sm"
						/>
					</fieldset>
					<fieldset>
						<label for={`${id}-subtitle`} class="text-xs font-medium" use:melt={$rootLabel}
							>{dictionary.subtitle}</label
						>
						<input
							id={`${id}-subtitle`}
							bind:value={$modalSubtitle$}
							type="text"
							class="border rounded w-full p-sm text-sm"
						/>
					</fieldset>
					<div class="flex w-full flex-row gap-sm">
						<button
							class="p-sm pl-md pr-md text-xs border rounded w-full"
							aria-label="create"
							use:melt={$close}
							on:click={() => {
								$items = [
									...$items,
									{ id: $items.length, title: $modalTitle$, subtitle: $modalSubtitle$, description: '' }
								];
							}}
						>
							<span class="sr-only">Add</span>
							Add
						</button>
						<button
							class="p-sm pl-md pr-md text-xs border rounded bg-red-50 border-red-300"
							aria-label="cancel"
							use:melt={$close}
						>
							<span class="sr-only">Cancel</span>
							Cancel
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div
		class="flex flex-col min-h-20 m-0 gap-sm p-sm border rounded-b-lg border-t-0 {error !== null
			? 'bg-yellow-50 border-yellow-400'
			: 'bg-gray-50'}"
	>
		{#each $items as _, i}
			<ListInputItem id={i} {items} {error} {dictionary} />
		{/each}
	</div>

	{#if error !== null}
		<p class="text-xs mt-sm text-yellow-500">{error}</p>
	{/if}
</fieldset>
