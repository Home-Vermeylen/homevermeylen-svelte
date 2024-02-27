<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let academiejaren: string[];
	export let geselecteerd_academiejaar: string;

	const nav = (academiejaar: string) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('aj', academiejaar);
		goto(`?${query.toString()}`, { invalidateAll: true });
	};
</script>

<select on:change={(e) => nav(e.target.value)} class="select select-bordered">
	<option selected>{geselecteerd_academiejaar}</option>

	{#each academiejaren as academiejaar (academiejaar)}
		{#if academiejaar != geselecteerd_academiejaar}
			<option value={academiejaar}>{academiejaar}</option>
		{/if}
	{/each}
</select>
