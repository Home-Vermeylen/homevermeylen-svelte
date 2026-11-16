<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		geselecteerde_node: any;
		personen: any[];
		connecties: any[];
	}

	let { geselecteerde_node = $bindable(), personen, connecties }: Props = $props();

	function anderePersoon(connectie: any) {
		const andereId =
			connectie.persoon1 === geselecteerde_node?.id ||
			connectie.from === geselecteerde_node?.id
				? connectie.persoon2 ?? connectie.to
				: connectie.persoon1 ?? connectie.from;

		return personen.find((persoon) => persoon.id === andereId);
	}

	function typeNaam(type: string) {
		const types: Record<string, string> = {
			KUSJE: 'Kusje',
			GEMUILD: 'Gemuild',
			VOORSPEL: 'Voorspel',
			SEKS: 'Seks',
			DATEN: 'Daten',
			RELATIE: 'Relatie'
		};

		return types[type] ?? type;
	}
</script>

<Dialog.Root
	open={true}
	onOpenChange={(open) => {
		if (!open) {
			geselecteerde_node = null;
		}
	}}
>
	<Dialog.Content class="max-h-[85vh] overflow-y-auto sm:max-w-lg">
		<Dialog.Header>
			<Dialog.Title class="text-xl">
				{#if geselecteerde_node}
					{geselecteerde_node.label}
				{/if}
			</Dialog.Title>
			<p class="text-sm text-muted-foreground">
				{geselecteerde_node?.group}
			</p>
		</Dialog.Header>

		{#if geselecteerde_node}
			{@const relevanteConnecties = connecties.filter(
				(connectie) =>
					connectie.persoon1 === geselecteerde_node.id ||
					connectie.persoon2 === geselecteerde_node.id ||
					connectie.from === geselecteerde_node.id ||
					connectie.to === geselecteerde_node.id
			)}

			<div class="mt-3 space-y-3">
				<div class="flex items-center justify-between">
					<h3 class="font-semibold">Connecties</h3>
					<span class="text-sm text-muted-foreground">
						{relevanteConnecties.length}
						{relevanteConnecties.length === 1 ? 'connectie' : 'connecties'}
					</span>
				</div>

				{#if relevanteConnecties.length === 0}
					<p class="rounded-lg border p-4 text-sm text-muted-foreground">
						Deze persoon heeft nog geen geregistreerde connecties.
					</p>
				{:else}
					{#each relevanteConnecties as connectie (connectie.id)}
						{@const persoon = anderePersoon(connectie)}

						<div class="rounded-lg border p-4 shadow-sm">
							<div class="flex items-start justify-between gap-3">
								<div>
									<h4 class="font-semibold">
										{typeNaam(connectie.type ?? connectie.label)}
									</h4>
									<p class="text-sm text-muted-foreground">
										{persoon?.label ?? persoon?.naam ?? 'Onbekende persoon'}
										{#if persoon?.group ?? persoon?.club}
											({persoon?.group ?? persoon?.club})
										{/if}
									</p>
								</div>
							</div>

							{#if connectie.extra_info || connectie.locatie || connectie.commentaar}
								<div class="mt-3 space-y-2 border-t pt-3 text-sm">
									{#if connectie.extra_info}
										<p>{connectie.extra_info}</p>
									{/if}

									{#if connectie.locatie}
										<p class="text-muted-foreground">
											Locatie: {connectie.locatie}
										</p>
									{/if}

									{#if connectie.commentaar}
										<p class="text-muted-foreground">
											{connectie.commentaar}
										</p>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>