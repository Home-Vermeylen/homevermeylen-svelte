<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data_table.svelte';

	export let data: PageData;
</script>

{#await data.verkiezingen then verkiezingen}
	<DataTable data={verkiezingen} form={data.form} />
{/await}
