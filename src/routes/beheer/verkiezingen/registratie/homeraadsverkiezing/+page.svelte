<script lang="ts">
	let voortgang = 1;
</script>

<div class="flex min-h-screen flex-col items-center justify-evenly">
	<ul class="steps steps-vertical lg:steps-horizontal">
		<li class="step step-primary">Datum</li>
		<li class="step" class:step-primary={voortgang > 1}>Verkiesbare functies</li>
		<li class="step" class:step-primary={voortgang > 2}>Instellingen</li>
		<li class="step" class:step-primary={voortgang > 3}>Controleer</li>
	</ul>
	{#if voortgang == 1}
		<div class="flex flex-row gap-2 items-center">
			<div class="card w-96 bg-base-200 shadow-xl items-center text-center">
				<div class="card-body items-center text-center">
					<h2 class="card-title">Type</h2>
					<span class="badge badge-primary font-semibold">Homeraadsverkiezing</span>
				</div>
			</div>
			<div class="card w-96 bg-base-200 shadow-xl">
				<div class="card-body items-center text-center">
					<h2 class="card-title">Academiejaar</h2>
					<span class="badge badge-primary font-semibold">2024-2025</span>
				</div>
			</div>
		</div>
		<div class="card w-[48rem] bg-base-200 shadow-xl items-center text-center">
			<div class="card-body items-center text-center">
				<h2 class="card-title">Datum Verkiezingsbar</h2>
				<input
					type="date"
					placeholder="Datum waarop de verkiezing zal plaatsvinden"
					class="input input-bordered bg-base-200 w-full max-w-xs"
				/>
			</div>
			<div class="card-body items-center text-center">
				<h2 class="card-title">Opening kandidaturen</h2>
				<input
					type="date"
					placeholder="Datum waarop de verkiezing zal plaatsvinden"
					class="input input-bordered bg-base-200 w-full max-w-xs"
				/>
			</div>
		</div>
	{:else if voortgang == 2}
		<div class="flex flex-col">
			<div class="flex flex-row gap-2">
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Praeses</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Vice-Praeses</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
			</div>
			<div class="flex flex-row gap-2">
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Penning</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Cultuur</span>
						<input type="checkbox" class="toggle toggle-error" checked />
					</label>
				</div>
			</div>

			<div class="flex flex-row gap-2">
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Sport</span>
						<input type="checkbox" class="toggle toggle-error" checked />
					</label>
				</div>
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Feest</span>
						<input type="checkbox" class="toggle toggle-error" checked />
					</label>
				</div>
			</div>

			<div class="flex flex-row gap-2">
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Bar</span>
						<input type="checkbox" class="toggle toggle-error" checked />
					</label>
				</div>
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Secretaris</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
			</div>

			<div class="flex flex-row gap-2">
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">ICT</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Schachtentemmer</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
			</div>

			<div class="flex flex-row gap-2">
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Internationaal</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Zeden</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
			</div>

			<div class="flex flex-row gap-2">
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Cantor</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Milieu</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
			</div>

			<div class="flex flex-row gap-2">
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">PR-Intern</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">PR-Extern</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
			</div>

			<div class="flex flex-row gap-2">
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Scriptor</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>
				<div class="form-control w-52">
					<label class="cursor-pointer label">
						<span class="label-text">Lustrum</span>
						<input type="checkbox" class="toggle toggle-primary" />
					</label>
				</div>
			</div>
		</div>
	{:else if voortgang == 3}
		<div class="flex flex-col items-center">
			<div class="form-control w-52">
				<label class="cursor-pointer label">
					<span class="label-text">Registreer nieuw praesidium automatisch.</span>
					<input type="checkbox" class="toggle toggle-primary" />
				</label>
			</div>
		</div>
	{/if}
	{#if voortgang == 4}
		<button
			class="btn btn-success"
			on:click={() => {
				voortgang += 1;
			}}>Voltooi</button
		>
	{:else}
		<button
			class="btn btn-primary"
			on:click={() => {
				voortgang += 1;
			}}>Volgende</button
		>
	{/if}
</div>
