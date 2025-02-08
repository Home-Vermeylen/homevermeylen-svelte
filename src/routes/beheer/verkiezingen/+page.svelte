<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data_table.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

{#await data.verkiezingen then verkiezingen}
	<DataTable data={verkiezingen} form={data.form} />
{/await}
