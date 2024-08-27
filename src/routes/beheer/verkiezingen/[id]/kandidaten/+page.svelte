<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import type { PageData } from './$types';
	import DataTable from './data_table.svelte';

	export let data: PageData;
</script>

{#await data.verkiezing then verkiezing}
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/beheer/verkiezingen">Verkiezingen</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href={`/beheer/verkiezingen/${verkiezing.id}`}>{verkiezing.naam}</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Kandidaten</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
	<div class="container mx-auto py-10">
		<DataTable {verkiezing} data={data.form} />
	</div>
{/await}
