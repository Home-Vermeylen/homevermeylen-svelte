<script lang="ts">
	import { enhance } from '$app/forms';
	import { Edit, Trash, File } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	export let verslag: any;
	export let dialog: HTMLDialogElement;
	export let geselecteerd_verslag: any | undefined;
	let loading = false;

	const bewerk_verslag = () => {
		geselecteerd_verslag = verslag;
		dialog.showModal();
	};

	const verwijder_verslag = () => {
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
			<button class="btn btn-square h-7 w-7" on:click={bewerk_verslag}>
				<Edit class="h-4 w-4" />
			</button>
			<form use:enhance={verwijder_verslag} method="post" action="?/verwijder">
				<input type="hidden" name="id" value={verslag.id} />
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
		<div class="font-bold">{verslag.naam}</div>
	</td>
	<td>
		<a class="btn" href={verslag.verslag} target="_blank">
			<File class="h-4 w-4" />
		</a>
	</td>
	<td>
		<div>{verslag.created}</div>
	</td>
</tr>
