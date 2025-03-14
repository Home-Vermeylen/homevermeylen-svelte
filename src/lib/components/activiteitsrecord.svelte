<script lang="ts">
	import { Edit, Trash } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	interface Props {
		activiteit: any;
		dialog: HTMLDialogElement;
		geselecteerde_activiteit: any | null;
	}

	let { activiteit, dialog, geselecteerde_activiteit = $bindable() }: Props = $props();

	const datum = new Date(activiteit.datum);
	let loading = $state(false);

	const bewerk_activiteit = () => {
		geselecteerde_activiteit = activiteit;
		dialog.showModal();
	};

	const verwijder_activiteit = async (id: string) => {
		loading = true;

		const res = await fetch('/api/activiteiten', {
			method: 'DELETE',
			body: JSON.stringify({
				id
			})
		});

		switch (res.status) {
			case 200:
				toast.success('Verwijdering voltooid.', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
				break;
			case 403:
				toast.error('Verwijdering mislukt: geen toegang', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
				break;
			case 500:
				toast.error('Verwijdering mislukt: serverfout', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
				break;
		}
		loading = false;
	};
</script>

<tr>
	<td>
		<div class="flex flex-row gap-2">
			<button class="btn btn-square h-7 w-7" onclick={bewerk_activiteit}>
				<Edit class="h-4 w-4" />
			</button>
			<button
				type="submit"
				onclick={() => verwijder_activiteit(activiteit.id)}
				class={`btn btn-square btn-error h-7 w-7 ${loading ? 'loading-spinner loading' : ''}`}
			>
				<Trash class="h-4 w-4" />
			</button>
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
	<td>
		<div>{datum.toLocaleString()}</div>
	</td>
</tr>
