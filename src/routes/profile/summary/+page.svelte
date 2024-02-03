<script lang="ts">
	import { createLabel, melt } from "@melt-ui/svelte";
	import type { PageData } from "./$types";
	import { prettyName } from "$lib/utils";

  export let data: PageData;

  const { UserObservable, error$ } = data.userStore;

	function createProfile() {
    if ($error$.length == 0) {
      console.log($UserObservable)
      console.log(` 
        Suppose you are a developer named ${$UserObservable.name} that has ${$UserObservable.yearsOfExperience} years of experience.

        You have the following skills: ${$UserObservable.skills.join(', ')}
        ${
          $UserObservable.education.length > 0 ?
          `You have studied at ${$UserObservable.education.map((v) => `${v.subtitle} achieving a ${v.title} degree and ended up describing the experience with the following paragraph: "${v.description}"`).join(' also ')}.\n`
          : ''
        }${
          $UserObservable.experience.length > 0 ?
          `You have worked at ${$UserObservable.experience.map((v) => `${v.subtitle} as a ${v.title} and ended up describing the experience with the following paragraph: "${v.description}"`).join(' also ')}.\n`
          : ''
        }${
          $UserObservable.projects.length > 0 ?
          `You have also worked on the following projects: ${$UserObservable.projects.map((v) => `${v.title} which is a software that does the following: ${v.description}`).join(' also worked on ')}.\n`
          : ''
        }

        Create a description with a maximum of 256 characters for a developer in search of a job
      `)
    }
	}

  const {
    elements: { root: rootLabel }
  } = createLabel()
</script>

{#if $error$.length > 0}
  <div class="flex flex-col gap-sm p-sm">
    {#each $error$ as error}
      <p class="text-xs text-red-500">You must first fix the errors in the {prettyName(error.field)} field</p>
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
  {#if $UserObservable.yearsOfExperience}
  <fieldset class="w-full">
    <label for="years-of-experience" class="text-xs font-medium" use:melt={$rootLabel}>Years of experience</label>
    <p id="years-of-experience" class="font-mono text-sm">{$UserObservable.yearsOfExperience}</p>
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
      <p id="experience" class="font-mono text-sm">{experience.title} at {experience.subtitle}</p>
    {/each}
  </fieldset>
  {/if}
  {#if $UserObservable.projects.length > 0}
  <fieldset class="w-full">
    <label for="projects" class="text-xs font-medium" use:melt={$rootLabel}>Projects</label>
    {#each $UserObservable.projects as project}
      <p id="projects" class="font-mono text-sm">{project.title} at {project.subtitle}</p>
    {/each}
  </fieldset>
  {/if}
  <form method="post" action="/profile/summary" class="flex flex-col gap-sm w-full">
    <input type="hidden" name="name" value={$UserObservable.name} />
    <input type="hidden" name="email" value={$UserObservable.email} />
    <input type="hidden" name="cellphone" value={$UserObservable.cellphone} />
    <input type="hidden" name="yearsOfExperience" value={$UserObservable.yearsOfExperience} />
    <input type="hidden" name="skills" value={$UserObservable.skills.join('\0')} />
    <input type="hidden" name="education" value={$UserObservable.education.map((v) => `${v.title}\0${v.subtitle}\0${v.description}`).join('\0')} />
    <input type="hidden" name="experience" value={$UserObservable.experience.map((v) => `${v.title}\0${v.subtitle}\0${v.description}`).join('\0')} />
    <input type="hidden" name="projects" value={$UserObservable.projects.map((v) => `${v.title}\0${v.subtitle}\0${v.description}`).join('\0')} />
    <button
      class="p-sm pl-md pr-md text-xs border rounded w-fit mt-md self-center border-green-300 bg-green-50 hover:bg-green-100"
      aria-label="create-profile"
      on:click={createProfile}
    >
      <span class="sr-only">Create profile</span>
      Create profile
    </button>
  </form>
</div>
{/if}