<script lang="ts">
	
	export let geselecteerde_fakkel: Record | null;
	export let dialog: HTMLDialogElement;
	export let gebruiker: any;
	export let fakkels: any;
	export let FakkelsForm: any;
	export let FakkelsEnhance: any;
	export let FakkelsMessage: any;
	export let FakkelsDelayed: any;
	export let FakkelsErrors: any;
	export let praesidium_leden: any;



	const resetGeselecteerdeFakkel = () => {
		dialog.close();
		geselecteerde_fakkel = null;
	};
</script>

<dialog bind:this={dialog} id="fakkels_modal" class="modal" on:cancel={resetGeselecteerdeFakkel}>
	<form
		use:FakkelsEnhance
		method="post"
		action="/api/fakkels"
		enctype="multipart/form-data"
		class="modal-box flex flex-col space-y-5 items-center"
	>
		<h3 class="text-center font-bold text-lg">
			{geselecteerde_fakkel
				? `Fakkels: ${geselecteerde_fakkel?.expand?.gebruiker?.voornaam}`
				: 'Nieuwe fakkels'}
		</h3>

		{#if geselecteerde_fakkel}
			<input type="hidden" name="id" value={geselecteerde_fakkel?.id} />
		{:else if praesidium_leden}
				<select name="gebruiker" class="select select-bordered w-full max-w-xs">
					<option disabled selected>Selecteer een gebruiker.</option>
					{#each [].slice.call(praesidium_leden) as lid (lid.id)}
						<option value={lid?.expand?.gebruiker?.id}>{lid?.voornaam} {lid?.familienaam}</option>
					{/each}
				</select>
		{/if}

		<input
			type="hidden"
			name="praesidium"
			value={gebruiker?.expand?.praesidiumlid?.expand.praesidium.id ?? ''}
		/>

		<div class="form-control w-full max-w-lg mb-2">
			<label for="aantal" class="label font-medium pb-1">
				<span class="label-text">Aantal fakkels</span>
			</label>
			<input
				type="number"
				id="aantal"
				name="aantal"
				aria-invalid={$FakkelsErrors.aantal ? 'true' : undefined}
				value={(
					fakkels.find &&
					fakkels.find((val) => {
						return val.gebruiker == geselecteerde_fakkel?.gebruiker;
					})
				)?.aantal ?? 0}
				required
				class={`input input-bordered`}
			/>
			{#if $FakkelsErrors.aantal}<label for="aantal" class="label py-0 pt-1">
					<span class="label-text-alt text-error">{$FakkelsErrors.aantal}</span>
				</label>{/if}
		</div>


		<div class="modal-action">
			<button type="submit" formmethod="dialog" class="btn btn-ghost">Annuleer</button>
			<button type="submit" class={`btn btn-outline ${$FakkelsDelayed ? 'loading loading-spinner' : ''}`}
				>Opslaan</button
			>
		</div>
	</form>
</dialog>
