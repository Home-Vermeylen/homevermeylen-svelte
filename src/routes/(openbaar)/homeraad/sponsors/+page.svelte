<script>
	import * as Card from '$lib/components/ui/card';
</script>

<svelte:head>
	<title>Homeraad - Sponsors</title>
	<meta name="description" content="Sponsors homeraad Home Vermeylen" />
	<link rel="canonical" href="https://homevermeylen.be/homeraad/sponsors" />
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center mx-5">
	<div class="flex flex-col items-center text-center w-full">
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-[2.5dvh] mb-[2.5dvh]"
		>
			Sponsors
		</h1>

		<div class="grid gap-x-10 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			<Card.Root>
				<Card.Header>
					<Card.Title>Kingslize</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/kingslize.jpg" alt="Logo Kingslize" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Stefano's Place</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/stefanos.png" alt="Logo Stefanos" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Papier & Co</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/papier&co.jpg" alt="Logo Papier&Co" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Bocca</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/bocca.png" alt="Logo Bocca" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Bioshop</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/bioshop.jpg" alt="Logo Bioshop" width="250" height="250" />
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
