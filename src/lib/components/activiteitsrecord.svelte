<script lang="ts">
	import { CheckCircle2, Edit, Eye, EyeOff, MoreHorizontal, Trash, XCircle } from 'lucide-svelte';

	export let activiteit: any;

    const datum = new Date(activiteit.datum);
</script>

<tr>
	<td>
		<div class="flex flex-row gap-2">
			<div class="tooltip tooltip-primary tooltip-right" data-tip="Bewerk activiteit">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label
					class="btn btn-square h-7 w-7"
				>
					<Edit class="h-4 w-4"/>
				</label>
			</div>
			<div
				class="tooltip tooltip-primary"
				data-tip={`${activiteit.gepubliceerd ? 'Maak onzichtbaar' : 'Maak zichtbaar'}`}
			>
				<form>
					<input type="hidden" value={activiteit.id} />
					<button type="submit" class="btn btn-square h-7 w-7">
						{#if activiteit.gepubliceerd}
							<EyeOff class="h-4 w-4" />
						{:else}
							<Eye class="h-4 w-4" />
						{/if}
					</button>
				</form>
			</div>
            <form>
                <input type="hidden" value={activiteit.id} />
                <button
				type="submit"
				class="btn btn-square btn-error h-7 w-7"
			>
				<Trash class="h-4 w-4"/>
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
				<div class="font-bold">{activiteit.naam}</div>
			</div>
		</div>
	</td>
	<td>
		{#if activiteit.omschrijving}
            <MoreHorizontal/>
        {:else}
        <strong>Geen Omschrijving</strong>
        {/if}
	</td>
	<td>
		{#if activiteit.gepubliceerd}
            <CheckCircle2/>
            {:else}
            <XCircle/>
        {/if}
	</td>
	<td>
			{datum.toLocaleDateString() +
				' ' +
				datum.toLocaleTimeString()}
	</td>
</tr>
