<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data_table.svelte';

	export let data: PageData;
</script>

<div class="container mx-auto py-10">
	{#await data.verkiezingen then verkiezingen}
		<DataTable data={verkiezingen} form={data.form}/>
	{/await}
</div>
