<script lang="ts">
	import type { PageData } from './$types';
	import ListInput from '$lib/components/list-input.svelte';
	import TextInput from '$lib/components/text-input.svelte';

	export let data: PageData;

	const { education$, experience$, skills$, projects$, error$, yearsOfExperience$ } = data.userStore;

	$: console.log($yearsOfExperience$);
</script>

<div class="flex flex-col flex-wrap p-sm">
	<TextInput
		id="years-of-experience"
		title="Years of experience"
		observable={yearsOfExperience$}
		error={$error$?.find((v) => v.field == 'yearsOfExperience')?.message[0] ?? null}
	/>
	<TextInput
		id="skills"
		title="Skills"
		listMode={true}
		observable={skills$}
		error={$error$?.find((v) => v.field == 'skills')?.message[0] ?? null}
	/>
	<ListInput
		id="experience"
		title="Experience"
		error={$error$?.find((v) => v.field == 'experience')?.message[0] ?? null}
		items={experience$}
		dictionary={{
			title: 'Job title',
			subtitle: 'Company',
			description: 'What should I know about this experience?'
		}}
	/>
	<ListInput
		id="education"
		title="Education"
		error={$error$?.find((v) => v.field == 'education')?.message[0] ?? null}
		items={education$}
		dictionary={{
			title: 'Degree',
			subtitle: 'Institution',
			description: 'What should I know about this degree?'
		}}
	/>
	<ListInput
		id="projects"
		title="Projects"
		error={$error$?.find((v) => v.field == 'projects')?.message[0] ?? null}
		items={projects$}
		dictionary={{
			title: 'Project title',
			subtitle: 'URL/Github',
			description: 'What is this project about?'
		}}
	/>
</div>
