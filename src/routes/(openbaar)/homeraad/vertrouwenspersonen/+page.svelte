<script lang="ts">
	let vertrouwensleden = [
		{
			id: 'jutta',
			voornaam: 'Jutta',
			familienaam: 'Van Daele',
			avatar: '/jutta.jpg',
			email: 'jutta.vandaele@ugent.be',
			kamernummer: 'nr. 63 - Home Heymans'
		},
		{
			id: 'flip',
			voornaam: 'Flip',
			familienaam: 'Pronk',
			avatar: '/flip.jpg',
			email: 'flip.pronk@ugent.be',
			kamernummer: '19, gang 8 - Home Vermeylen'
		}
	];
</script>

<svelte:head>
	<title>Homeraad - Vertrouwenspersonen</title>
	<meta name="description" content="Vertrouwenspersonen Home Vermeylen" />
	<link rel="canonical" href="https://homevermeylen.be/homeraad/vertrouwenspersonen" />
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center mx-5">
	<div class="flex flex-col items-center text-center w-full">
		<h1 class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-[2.5dvh] mb-[2.5dvh]">
			Vertrouwenspersonen
		</h1>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			De vertrouwenspersonen voor dit academiejaar zijn Jutta Van Daele 
			en Flip Pronk.
		</p>
	</div>

	<div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-10 mt-12">
		{#each vertrouwensleden as lid}
			<div class="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[350px] mx-auto">
				<img
					src={lid.avatar}
					alt="{lid.voornaam} {lid.familienaam}"
					class="w-32 h-32 object-cover rounded-full mb-4 border-2 border-gray-200 bg-gray-100"
				/>

				<h2 class="text-xl font-semibold text-center mb-2">{lid.voornaam} {lid.familienaam}</h2>
				<p class="text-sm text-gray-500 mb-2">Vertrouwenspersoon</p>
				<a href={`mailto:${lid.email}`} class="text-sm text-blue-600 hover:underline mb-2">{lid.email}</a>
				<p class="text-sm text-gray-600">Kamer {lid.kamernummer}</p>
			</div>
		{/each}
	</div>
</div>
