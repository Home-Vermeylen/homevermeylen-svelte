<script>
	import * as Card from '$lib/components/ui/card';
</script>

<svelte:head>
	<title>Homeraad - Sponsors</title>
	<meta name="description" content="Sponsors homeraad Home Vermeylen" />
	<link rel="canonical" href="https://homevermeylen.org/homeraad/sponsors" />
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center mx-5">
	<div class="flex flex-col items-center text-center w-full">
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-24 mb-8"
		>
			Sponsors
		</h1>

		<div class="grid gap-x-10 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			
			<!-- Delilunch met hover overlay -->
			<a href="https://delilunch.be" target="_blank" rel="noopener noreferrer" class="relative group">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Delilunch</Card.Title>
					</Card.Header>
					<Card.Content class="relative flex justify-center items-center">
						<img src="/delilunch.png" alt="Logo Delilunch" width="250" height="250" />
						<div class="absolute inset-0 bg-black bg-opacity-80 text-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
							10% korting op vertoon van lidkaart
						</div>
					</Card.Content>
				</Card.Root>
			</a>

			<!-- Studentendrukker met hover overlay -->
			<a href="https://studentendrukker.be/nl/home/" target="_blank" rel="noopener noreferrer" class="relative group">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Studentendrukker</Card.Title>
					</Card.Header>
					<Card.Content class="relative flex justify-center items-center">
						<img src="/studentendrukker.png" alt="Logo Studentendrukker" width="250" height="250" />
						<div class="absolute inset-0 bg-black bg-opacity-80 text-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
							10% korting met code: <span class="font-bold">2627VERMEYLEN10</span>
						</div>
					</Card.Content>
				</Card.Root>
			</a>

			<!-- Snack Tosi zonder overlay -->
			<a href="https://snack-tosi.be/" target="_blank" rel="noopener noreferrer">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Snack Tosi</Card.Title>
					</Card.Header>
					<Card.Content class="flex justify-center items-center">
						<img src="/snacktosi.png" alt="Logo Snack Tosi" width="250" height="250" />
					</Card.Content>
				</Card.Root>
			</a>

			<!-- Panotto zonder overlay -->
			<a href="https://panotto.be" target="_blank" rel="noopener noreferrer">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Panotto</Card.Title>
					</Card.Header>
					<Card.Content class="flex justify-center items-center">
						<img src="/panotto.png" alt="Logo Panotto" width="250" height="250" />
					</Card.Content>
				</Card.Root>
			</a>

			<!-- Overpoort Bowl zonder overlay -->
			<a href="https://overpoortbowl.be" target="_blank" rel="noopener noreferrer">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Overpoort Bowl</Card.Title>
					</Card.Header>
					<Card.Content class="flex justify-center items-center">
						<img src="/overpoortbowl.png" alt="Logo Overpoort Bowl" width="250" height="250" />
					</Card.Content>
				</Card.Root>
			</a>

			<!-- Nonna zonder overlay -->
			<a href="https://nonnagent.be" target="_blank" rel="noopener noreferrer">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Nonna Gent</Card.Title>
					</Card.Header>
					<Card.Content class="flex justify-center items-center">
						<img src="/nonna.png" alt="Logo Nonna Gent" width="250" height="250" />
					</Card.Content>
				</Card.Root>
			</a>

			<!-- Lockdown zonder overlay -->
			<a href="https://lockdown-escape.be" target="_blank" rel="noopener noreferrer">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Lockdown Escape Rooms</Card.Title>
					</Card.Header>
					<Card.Content class="flex justify-center items-center">
						<img src="/lockdown.png" alt="Logo Lockdown Escape Rooms" width="250" height="250" />
					</Card.Content>
				</Card.Root>
			</a>

			<!-- Ekart zonder overlay -->
			<a href="https://e-kart.be" target="_blank" rel="noopener noreferrer">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>E-Kart</Card.Title>
					</Card.Header>
					<Card.Content class="flex justify-center items-center">
						<img src="/ekart.jpg" alt="Logo Ekart" width="250" height="250" />
					</Card.Content>
				</Card.Root>
			</a>

			<!-- Barouche zonder overlay -->
			<a href="https://barouche.eu" target="_blank" rel="noopener noreferrer">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Barouche</Card.Title>
					</Card.Header>
					<Card.Content class="flex justify-center items-center">
						<img src="/barouche.png" alt="Logo Barouche" width="250" height="250" />
					</Card.Content>
				</Card.Root>
			</a>

		</div>
	</div>
</div>
