<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data } = $props();

	function formatDatum(datum: string) {
		return new Intl.DateTimeFormat('nl-BE', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(new Date(datum));
	}
</script>

<div class="mx-auto flex w-full max-w-2xl flex-col gap-6 p-4">
	<div class="text-center">
		<h1 class="text-3xl font-bold">Drankentelling</h1>
		<p class="mt-2 text-muted-foreground">
			Selecteer de baravond waarvoor je wilt turven.
		</p>
	</div>

	{#if data.baravonden.length > 0}
		<div class="flex flex-col gap-4">
			{#each data.baravonden as baravond (baravond.id)}
				<Button
					variant="outline"
					class="h-auto min-h-24 w-full flex-col gap-2 whitespace-normal py-5 text-lg"
					onclick={() => goto(`/beheer/baravonden/${baravond.id}`)}
				>
					<span class="font-semibold">
						{baravond.naam}
					</span>

					{#if baravond.datum}
						<span class="text-sm font-normal text-muted-foreground">
							{formatDatum(baravond.datum)}
						</span>
					{/if}
				</Button>
			{/each}
		</div>
	{:else}
		<p class="rounded-lg border p-6 text-center text-muted-foreground">
			Er zijn momenteel geen openstaande baravonden.
		</p>
	{/if}
</div>