<script lang="ts">
	import { createLabel, melt } from "@melt-ui/svelte";
	import type { PageData } from "./$types";

    export let data: PageData;

    const { UserObservable, error$ } = data.userStore;

    const {
        elements: { root: rootLabel }
    } = createLabel()
</script>

{#if $error$.length > 0}
  <div class="flex flex-col gap-sm p-sm">
    {#each $error$ as error}
      <p class="text-xs text-red-500">You must first fix the errors in the {error.field} field</p>
    {/each}
  </div>
{:else}
<div class="flex flex-col flex-wrap p-sm gap-sm items-center">
  {#if $UserObservable.name}
  <fieldset class="w-full">
    <label for="name" class="text-xs font-medium" use:melt={$rootLabel}>Name</label>
    <p id="name" class="font-mono text-sm">{$UserObservable.name}</p>
  </fieldset>
  {/if}
  {#if $UserObservable.email}
  <fieldset class="w-full">
    <label for="email" class="text-xs font-medium" use:melt={$rootLabel}>Email</label>
    <p id="email" class="font-mono text-sm">{$UserObservable.email}</p>
  </fieldset>
  {/if}
  {#if $UserObservable.cellphone}
  <fieldset class="w-full">
    <label for="cellphone" class="text-xs font-medium" use:melt={$rootLabel}>Cellphone</label>
    <p id="cellphone" class="font-mono text-sm">{$UserObservable.cellphone}</p>
  </fieldset>
  {/if}
  {#if $UserObservable.skills.length > 0}
  <fieldset class="w-full">
    <label for="skills" class="text-xs font-medium" use:melt={$rootLabel}>Skills</label>
    <div class="flex flex-wrap gap-sm">
    {#each $UserObservable.skills as skill}
      <p id="skills" class="font-mono border rounded-md p-1 text-sm">{skill}</p>
    {/each}
    </div>
  </fieldset>
  {/if}
  {#if $UserObservable.education.length > 0}
  <fieldset class="w-full">
    <label for="education" class="text-xs font-medium" use:melt={$rootLabel}>Education</label>
    {#each $UserObservable.education as education}
      <p id="education" class="font-mono text-sm">{education.title} at {education.subtitle}</p>
    {/each}
  </fieldset>
  {/if}
  {#if $UserObservable.experience.length > 0}
  <fieldset class="w-full">
    <label for="experience" class="text-xs font-medium" use:melt={$rootLabel}>Experience</label>
    {#each $UserObservable.experience as experience}
      <p id="education" class="font-mono text-sm">{experience.title} at {experience.subtitle}</p>
    {/each}
  </fieldset>
  {/if}
  {#if $UserObservable.projects.length > 0}
  <fieldset class="w-full">
    <label for="projects" class="text-xs font-medium" use:melt={$rootLabel}>Projects</label>
    {#each $UserObservable.projects as project}
      <p id="education" class="font-mono">{project.title} at {project.subtitle}</p>
    {/each}
  </fieldset>
  {/if}
  <button
    class="p-sm pl-md pr-md text-xs border rounded w-1/2 mt-md border-green-300 bg-green-50 hover:bg-green-100"
    aria-label="create-profile"
    on:click={() => {
      if ($error$.length == 0) {
        console.log($UserObservable)
      }
    }}
  >
    <span class="sr-only">Create profile</span>
    Create profile
  </button>
</div>
{/if}