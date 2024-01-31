<script lang="ts">
	import type { ListedData } from '$lib/types';
	import {
		createAccordion,
		createContextMenu,
		createDialog,
		createLabel,
		createPopover,
		melt
	} from '@melt-ui/svelte';
	import { BehaviorSubject } from 'rxjs';
	import { fade, slide } from 'svelte/transition';

	export let id: number;
	export let items: BehaviorSubject<ListedData[]>;
	export let error: string | null = null;
	export let dictionary: {
		title: string;
		subtitle: string;
		description: string;
	} = {
		title: 'Untitled',
		subtitle: 'No subtitle',
		description: 'No description'
	};

	const {
		elements: { root: rootLabel }
	} = createLabel();

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true
	});

	const {
		elements: { content: contentAccordion, item: itemAccordion, trigger: triggerAccordion },
		helpers: { isSelected }
	} = createAccordion({
		defaultValue: 'item-1'
	});

	const {
		elements: {
			trigger: triggerDialog,
			portalled,
			overlay,
			content: contentDialog,
			close: closeDialog
		},
		states: { open: openDialog }
	} = createDialog();

	const {
		elements: { menu, item: itemContextMenu, trigger: triggerContextMenu, arrow: arrowContextMenu }
	} = createContextMenu();

	let description = $items[id].description;
	$: setItemDescription(description);

	function setItemDescription(description: string) {
		$items = $items.map((item) => {
			if (item.id === id) {
				return { ...item, description };
			}
			return item;
		});
	}
	function deleteItem() {
		$items = $items.filter((item) => item.id !== id);
	}
	const itemId = `item-${$items[id].title}-${$items[id].subtitle}`;
</script>

<div use:melt={$itemAccordion(itemId)}>
	<header
		class="flex p-sm w-full border content-center {error !== null
			? 'bg-yellow-100 border-yellow-400'
			: 'bg-gray-50'} {$isSelected(itemId) ? 'rounded-b-0 rounded-t-md' : 'rounded-md'}"
		use:melt={$triggerContextMenu}
	>
		<button class="flex flex-col text-sm w-full text-start" use:melt={$triggerAccordion(itemId)}>
			{$items[id].title}
			<span class="text-xs {error !== null ? 'text-yellow-700' : 'text-gray-700'}"
				>{$items[id].subtitle}</span
			>
		</button>
		<div class="flex gap-sm">
			<button
				class="hidden sm:block text-xs border rounded p-sm {error !== null
					? 'bg-yellow-200 border-yellow-400'
					: 'bg-gray-100'}"
				use:melt={$trigger}
			>
				Edit
			</button>
			<button
				class="hidden sm:block text-xs border rounded p-sm border-red-300 {error !== null
					? 'bg-red-200'
					: 'bg-red-50'}"
				on:click={deleteItem}
			>
				Delete
			</button>
		</div>
	</header>
	{#if $isSelected(itemId)}
		<div use:melt={$contentAccordion(itemId)} transition:slide>
			<div
				class="p-sm border rounded rounded-t-none border-t-0 flex gap-sm flex-col {error !== null &&
					'border-yellow-400'}"
			>
				<label for={`${id}-description`} class="text-xs" use:melt={$rootLabel}
					>{dictionary.description}</label
				>
				<textarea
					id={`${id}-description`}
					class="border max-h-20 min-h-10 rounded w-full p-sm text-sm {error !== null &&
						'border-yellow-400'}"
					bind:value={description}
				/>
			</div>
		</div>
	{/if}
</div>

{#if $open}
	<div use:melt={$content} transition:fade={{ duration: 100 }} class="content">
		<div use:melt={$arrow} />
		<div class="flex flex-col gap-sm bg-white p-sm border rounded">
			<fieldset>
				<label for={`${id}-title`} class="text-xs font-medium" use:melt={$rootLabel}
					>{dictionary.title}</label
				>
				<input
					id={`${id}-title`}
					type="text"
					class="border rounded w-full p-sm text-sm"
					bind:value={$items[id].title}
				/>
			</fieldset>
			<fieldset>
				<label for={`${id}-subtitle`} class="text-xs font-medium" use:melt={$rootLabel}
					>{dictionary.subtitle}</label
				>
				<input
					id={`${id}-subtitle`}
					type="text"
					class="border rounded w-full p-sm text-sm"
					bind:value={$items[id].subtitle}
				/>
			</fieldset>
			<div class="flex w-full flex-row gap-sm justify-end">
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

{#if $openDialog}
<div use:melt={$portalled} class="absolute w-full h-full flex justify-center items-center">
	<div use:melt={$overlay} class="absolute bg-black w-full h-full opacity-20" />
	<div use:melt={$contentDialog} class="bg-white border rounded p-sm sm:w-1/2 m-md sm:m-0 w-full gap-sm z-10 flex-col flex justify-end">
		<fieldset>
			<label for={`${id}-title`} class="text-xs font-medium" use:melt={$rootLabel}
				>{dictionary.title}</label
			>
			<input
				id={`${id}-title`}
				type="text"
				class="border rounded w-full p-sm text-sm"
				bind:value={$items[id].title}
			/>
		</fieldset>
		<fieldset>
			<label for={`${id}-subtitle`} class="text-xs font-medium" use:melt={$rootLabel}
				>{dictionary.subtitle}</label
			>
			<input
				id={`${id}-subtitle`}
				type="text"
				class="border rounded w-full p-sm text-sm"
				bind:value={$items[id].subtitle}
			/>
		</fieldset>
		<button
			class="p-sm pl-md pr-md text-xs border rounded bg-red-50 border-red-300"
			aria-label="cancel"
			use:melt={$closeDialog}
		>
			<span class="sr-only">Cancel</span>
			Cancel
		</button>
	</div>
</div>
{/if}
<div use:melt={$menu} class="p-sm bg-white border rounded text-xs flex gap-sm">
	<div use:melt={$itemContextMenu} use:melt={$triggerDialog} class="p-sm border rounded">Edit</div>
	<div
		use:melt={$itemContextMenu}
		on:click={deleteItem}
		class="p-sm border border-red-300 bg-red-50 rounded"
	>
		Delete
	</div>
	<div use:melt={$arrowContextMenu} class="border-l border-t" />
</div>
