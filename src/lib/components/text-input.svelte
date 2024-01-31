<script lang="ts">
	import { createLabel, createTagsInput, melt } from "@melt-ui/svelte";
	import type { Observable } from "rxjs";
	import { fade } from "svelte/transition";

  export let title: string;
  export let id: string;
  export let error: string | null = null;
  export let listMode = false;
  export let observable: Observable<string> | Observable<string[]>;

  const {
    elements: { root: rootLabel }
  } = createLabel()

  const {
    elements: { root, input, tag, deleteTrigger, edit },
    states: { tags }
  } = createTagsInput({
    editable: true,
  })

  let initialized = false;

  $: {
    if (Array.isArray($observable)) {
      if (!initialized) {
        tags.set($observable.map(v => ({ id: v, value: v })));
        initialized = true;
      }
      else 
        $observable = ($tags.map(v => v.value))
    }
  }
</script>

<div class="flex flex-col gap-sm pt-sm pb-sm">
  <label for={id} class="text-xs font-medium" use:melt={$rootLabel}>{title}</label>
  {#if listMode === true && Array.isArray($observable)}
    <div use:melt={$root} class="flex flex-row flex-wrap w-full border rounded p-sm text-sm gap-sm {error !== null && 'bg-yellow-100 border-yellow-400 border'}">
      {#each $tags as t}
        <div use:melt={$tag(t)} class="flex p-sm border rounded-lg bg-gray-50 text-xs gap-sm" transition:fade>
          <span>{t.value}</span>
          <button use:melt={$deleteTrigger(t)} class="font-bold text-gray-600">x</button>
        </div>
        <div use:melt={$edit(t)} class="flex p-sm border rounded text-sm">{t.value}</div>
      {/each}
      <input id={id} use:melt={$input} type="text" class="{error !== null ? 'bg-yellow-100' : ''}" />
    </div>
  {:else}
    <input id={id} type="text" bind:value="{$observable}" class="border rounded w-full p-sm text-sm {error !== null && 'bg-yellow-100 border-yellow-400 border'}" />
  {/if}
  {#if error !== null}
      <p class="text-xs text-yellow-500">{error}</p>
  {/if}
</div>