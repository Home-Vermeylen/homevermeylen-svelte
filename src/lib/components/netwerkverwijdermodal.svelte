<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Trash } from 'lucide-svelte';

	export let modal_open: boolean;
	export let personen: any;
	export let connecties: any;
</script>

<Dialog.Root bind:open={modal_open}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Connectie / Persoon verwijderen</Dialog.Title>
		</Dialog.Header>
		{#each personen as persoon (persoon.id)}
			<div class="flex flex-col">
				<div class="flex flex-row justify-between">
					<div>
						<h2><b>{persoon.label}</b> <i>({persoon.group})</i></h2>
						<ol>
							{#each connecties.filter((c) => {
								return c.from == persoon.id;
							}) as connectie (connectie.id)}
								<li class="flex flex-col">
									Wat? {connectie.color.color == '#a3f307'
										? 'Gemuild'
										: connectie.color.color == '#05f9e2'
										? 'Seks'
										: 'Relatie'} met {personen.find((p) => p.id == connectie.to)?.label} ({personen.find(
										(p) => p.id == connectie.to
									)?.group})

									<form method="post" action="/api/vriendschapsnetwerk/verwijder_connectie" on:submit={async () => await invalidateAll()}>
										<input
											type="hidden"
											name="type"
											value={connectie.color.color == '#a3f307'
												? 'GEMUILD'
												: connectie.color.color == '#05f9e2'
												? 'SEKS'
												: 'RELATIE'}
										/>
										<input type="hidden" name="id1" value={connectie.from} />
										<input type="hidden" name="id2" value={connectie.to} />
										<button type="submit" class="link italic">verwijder</button>
									</form>
								</li>
							{/each}
							{#each connecties.filter((c) => {
								return c.to == persoon.id;
							}) as connectie (connectie.id)}
								<li class="flex flex-col">
									Wat? {connectie.color.color == '#a3f307'
										? 'Gemuild'
										: connectie.color.color == '#05f9e2'
										? 'Seks'
										: 'Relatie'} met {personen.find((p) => p.id == connectie.from)?.label} ({personen.find(
										(p) => p.id == connectie.from
									)?.group})

									<form method="post" action="/api/vriendschapsnetwerk/verwijder_connectie" on:submit={async () => await invalidateAll()}>
										<input
											type="hidden"
											name="type"
											value={connectie.color.color == '#a3f307'
												? 'GEMUILD'
												: connectie.color.color == '#05f9e2'
												? 'SEKS'
												: 'RELATIE'}
										/>
										<input type="hidden" name="id1" value={connectie.from} />
										<input type="hidden" name="id2" value={connectie.to} />
										<button type="submit" class="link italic">verwijder</button>
									</form>
								</li>
							{/each}
						</ol>
					</div>
					<div>
						<form method="post" action="/api/vriendschapsnetwerk/verwijder_persoon" on:submit={async () => await invalidateAll()}>
							<input type="hidden" name="id" value={persoon.id} />
							<button type="submit" class="btn btn-square btn-error"
								><Trash class="h-4 w-4" /></button
							>
						</form>
					</div>
				</div>
				<div class="divider" />
			</div>
		{/each}
	</Dialog.Content>
</Dialog.Root>
