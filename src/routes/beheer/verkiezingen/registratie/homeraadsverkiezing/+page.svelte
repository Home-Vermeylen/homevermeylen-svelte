<script lang="ts">
	let voortgang = 1;
</script>

<div class="flex h-screen flex-col items-center justify-evenly">
	<ul class="steps steps-vertical lg:steps-horizontal">
		<li class="step step-primary">Datum</li>
		<li class="step" class:step-primary={voortgang > 1}>Verkiesbare functies</li>
		<li class="step">Purchase</li>
		<li class="step">Receive Product</li>
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
				<h2 class="card-title">Datum</h2>
				<input type="date" placeholder="Datum waarop de verkiezing zal plaatsvinden" class="input input-bordered bg-base-200 w-full max-w-xs" />
			</div>
		</div>
	{/if}
    <button class="btn btn-primary" on:click={() => {voortgang += 1}}>Volgende</button>
</div>
