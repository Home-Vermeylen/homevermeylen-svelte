<script lang="ts">
	import Activiteitenmodal from '$lib/components/activiteitenmodal.svelte';
	import DataTable from '$lib/components/data-table.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { page } from '$app/stores';
	import { columns } from './columns.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CalendarPlus } from 'lucide-svelte';
	import { pushState } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	let { data } = $props();
</script>

{#if $page.state.verwijder_ids}
	<AlertDialog.Root open={true}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Ben je zeker?</AlertDialog.Title>
				<AlertDialog.Description>
					Deze actie kan niet ongedaan gemaakt worden. Dit zal {$page.state.verwijder_ids.length} activiteit{$page
						.state.verwijder_ids.length == 1
						? ''
						: 'en'} permanent verwijderen.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={() => history.back()}>Annuleer</AlertDialog.Cancel>
				<AlertDialog.Action>Verwijder</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}

{#if $page.state.activiteit || $page.state.new_modal}
	<Activiteitenmodal data={data.activiteiten_form} />
{/if}

{#await data.activiteiten_promise}
	<div class="flex items-center space-x-4">
		<Skeleton class="size-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
{:then activiteiten}
	<Button onclick={() => pushState('', { new_modal: true })}
		><CalendarPlus class="h-4 w-4" /> Nieuwe Activiteit</Button
	>
	<DataTable modelsPerPage={5} data={activiteiten} {columns} />
{/await}
