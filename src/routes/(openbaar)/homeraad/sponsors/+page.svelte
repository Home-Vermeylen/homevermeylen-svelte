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
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-24 mb-8"
		>
			Sponsors
		</h1>

		<div class="grid gap-x-10 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

			<!-- Benji's met hover overlay -->
			<a href="https://frituur-benjis.be/" target="_blank" rel="noopener noreferrer" class="relative group">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Benji's</Card.Title>
					</Card.Header>
					<Card.Content class="relative flex justify-center items-center">
						<img src="/benjis.png" alt="Logo Benji's" width="250" height="250" />
						<div class="absolute inset-0 bg-black bg-opacity-80 text-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
							10% korting op vertoon van lidkaart
						</div>
					</Card.Content>
				</Card.Root>
			</a>

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

			<!-- Cappuccino met hover overlay -->
			<a href="https://cappuccino-gent.com/" target="_blank" rel="noopener noreferrer" class="relative group">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Cappuccino</Card.Title>
					</Card.Header>
					<Card.Content class="relative flex justify-center items-center">
						<img src="/cappuccino.png" alt="Logo Cappuccino" width="250" height="250" />
						<div class="absolute inset-0 bg-black bg-opacity-80 text-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
							1 euro korting bij aankoop van een cappuccino
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
							10% korting met code: <span class="font-bold">2526VERMEY10</span>
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

			<!-- Mayana met hover overlay -->
			<a href="https://mayana.be" target="_blank" rel="noopener noreferrer" class="relative group">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Mayana</Card.Title>
					</Card.Header>
					<Card.Content class="relative flex justify-center items-center">
						<img src="/mayana.png" alt="Logo Mayana" width="250" height="250" />
						<div class="absolute inset-0 bg-black bg-opacity-80 text-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-sm">
							Chocoholic actie: bij elke warme chocolademelk, 1 gratis slice brownie met chocolade en topping<br>
							Chococlate Junkie actie: bij aankoop van een Choc&Dip Mono, 1 extra potje chocolade gratis<br>
							Cocktail o'clock actie: bij aankoop van een cocktail of wijntje, 1 brownie gratis<br>
							Try your Luck actie: gooi dubbel met 2 dobbelstenen, bij aankoop van 1 Gin & Tonic Mayana, krijg je er 1 gratis<br>
							Early Bird actie: bij bestelling van een smoothiebowl/yoghurtbowl, 1 koffie of thee gratis (tussen12h en 15h)
						</div>
					</Card.Content>
				</Card.Root>
			</a>

			<!-- Kuiperskano met hover overlay -->
			<a href="https://kuiperskano.be" target="_blank" rel="noopener noreferrer" class="relative group">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Kuiperskano</Card.Title>
					</Card.Header>
					<Card.Content class="relative flex justify-center items-center">
						<img src="/kuiperskano.png" alt="Logo Kuiperskano" width="250" height="250" />
						<div class="absolute inset-0 bg-black bg-opacity-80 text-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
							5 euro korting bij het huren van een kano met een waterdichte ton
						</div>
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

			<!-- Paul's Boutique met hover overlay -->
			<a href="https://paulsboutiquegent.be" target="_blank" rel="noopener noreferrer" class="relative group">
				<Card.Root class="cursor-pointer hover:shadow-lg transition-shadow">
					<Card.Header>
						<Card.Title>Paul's Boutique</Card.Title>
					</Card.Header>
					<Card.Content class="relative flex justify-center items-center">
						<img src="/paulsboutique.png" alt="Logo Paul's Boutique" width="250" height="250" />
						<div class="absolute inset-0 bg-black bg-opacity-80 text-white flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
							1 burger kopen 1 gratis
						</div>
					</Card.Content>
				</Card.Root>
			</a>

		</div>
	</div>
</div>
