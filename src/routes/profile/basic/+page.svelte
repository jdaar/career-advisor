<script lang="ts">
	import type { PageData } from './$types';
	import TextInput from '$lib/components/text-input.svelte';

	export let data: PageData;

	const { name$, email$, cellphone$, error$ } = data.userStore;
</script>

<div class="flex flex-col flex-wrap p-sm">
	<TextInput
		id="name"
		title="Name"
		observable={name$}
		error={$error$?.find((v) => v.field == 'name')?.message[0] ?? null}
	/>
	<TextInput
		id="email"
		title="Email"
		observable={email$}
		error={$error$?.find((v) => v.field == 'email')?.message[0] ?? null}
	/>
	<TextInput
		id="cellphone"
		title="Cellphone"
		observable={cellphone$}
		error={$error$?.find((v) => v.field == 'cellphone')?.message[0] ?? null}
	/>
</div>
