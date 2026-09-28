<script lang="ts">
	let vertrouwensleden = [
		{
			id: 'nefeli',
			voornaam: 'Nefeli',
			familienaam: 'Syngelakis',
			avatar: '/nefeli.jpeg',
			email: 'nefeli.syngelakis@ugent.be',
			kamernummer: '7, gang 4 - Home Heymans'
		},
		{
			id: 'kyano',
			voornaam: 'Kyano',
			familienaam: 'Monteny',
			avatar: '/kyano.jpg',
			email: 'kyano.monteny@ugent.be',
			kamernummer: '43, gang 4 - Home Vermeylen'
		}
	];
</script>

<svelte:head>
	<title>Homeraad - Vertrouwenscontacten</title>
	<meta name="description" content="Vertrouwenscontacten Home Vermeylen" />
	<link rel="canonical" href="https://homevermeylen.org/homeraad/vertrouwenscontacten" />
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center mx-5">
	<div class="flex flex-col items-center text-center w-full">
		<h1 class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-24 mb-8">
			Vertrouwenscontacten
		</h1>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			De vertrouwenscontacten voor dit academiejaar zijn Nefeli Syngelakis 
			en Kyano Monteny.
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
				<p class="text-sm text-gray-500 mb-2">Vertrouwenscontact</p>
				<a href={`mailto:${lid.email}`} class="text-sm text-blue-600 hover:underline mb-2">{lid.email}</a>
				<p class="text-sm text-gray-600">Kamer {lid.kamernummer}</p>
			</div>
		{/each}
	</div>
</div>
