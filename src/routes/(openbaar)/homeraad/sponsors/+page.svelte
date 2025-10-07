<script>
	import { Button } from '$lib/components/ui/button';
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
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-24 mb-8"
		>
			Sponsors
		</h1>

		<div class="grid gap-x-10 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			<Card.Root>
				<Card.Header>
					<Card.Title>Benji's</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/benjis.png" alt="Logo Benji's" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Delilunch</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/delilunch.png" alt="Logo Delilunch" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Cappuccino</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/cappuccino.png" alt="Logo Cappuccino" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Studentendrukker</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/studentendrukker.png" alt="Logo Studentendrukker" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Snack Tosi</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/snacktosi.png" alt="Logo Snack Tosi" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Panotto</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/panotto.png" alt="Logo Panotto" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Mayana</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/mayana.png" alt="Logo Mayana" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Kuiperskano</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/kuiperskano.png" alt="Logo Kuiperskano" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Overpoort Bowl</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/overpoortbowl.png" alt="Logo Overpoort Bowl" width="250" height="250" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Paul's Boutique</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src="/paulsboutique.png" alt="Logo Paul's Boutique" width="250" height="250" />
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
