<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Activiteit } from '$lib/types';
	import { Edit, Trash } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	export let activiteit: Activiteit;
	export let dialog: HTMLDialogElement;
	export let geselecteerde_activiteit: Activiteit | null;
	let loading = false;

	const bewerk_activiteit = () => {
		geselecteerde_activiteit = activiteit;
		dialog.showModal();
	};

	const verwijder_activiteit = () => {
		loading = true;

		return async ({ result, update }: { result: any; update: any }) => {
			switch (result.type) {
				case 'success':
					toast.success('Verwijdering voltooid.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'invalid':
					toast.error('Verwijdering mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'error':
					toast.error('Verwijdering mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<tr>
	<td>
		<div class="flex flex-row gap-2">
			<button class="btn btn-square h-7 w-7" on:click={bewerk_activiteit}>
				<Edit class="h-4 w-4" />
			</button>
			<form use:enhance={verwijder_activiteit} method="post" action="?/verwijder">
				<input type="hidden" name="id" value={activiteit.id} />
				<button
					type="submit"
					class={`btn btn-square btn-error h-7 w-7 ${loading ? 'loading-spinner loading' : ''}`}
				>
					<Trash class="h-4 w-4" />
				</button>
			</form>
		</div>
	</td>
	<td>
		<div class="flex items-center space-x-3">
			<div class="avatar">
				<div class="mask mask-squircle w-12 h-12">
					<img
						loading="lazy"
						height={50}
						width={50}
						src={activiteit.banner.includes('.png') ||
						activiteit.banner.includes('.gif') ||
						activiteit.banner.includes('.jpg') ||
						activiteit.banner.includes('.jpeg')
							? activiteit.banner
							: '/foto_placeholder.png'}
						alt="Banner"
					/>
				</div>
			</div>
			<div>
				<span>{activiteit.naam}</span>
			</div>
		</div>
	</td>
	<td title={activiteit.omschrijving}> Geef weer </td>
	<td>
		<div>{activiteit.datum}</div>
	</td>
</tr>
