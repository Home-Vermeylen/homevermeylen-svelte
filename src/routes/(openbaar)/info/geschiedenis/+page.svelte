<svelte:head>
	<title>Geschiedenis</title>
	<meta
		name="description"
		content="Een korte uiteenzetting over de geschiedenis van Home Vermeylen."
	/>
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center">
	<div class="flex flex-col items-center text-center">
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-32 mb-8"
		>
			Geschiedenis
		</h1>
		<div class="max-w-56">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-5">Onze Home</h3>
			<div class="flex flex-row gap-2">
				<div class="text-left">
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Home Vermeylen maakt, samen met Home Fabiola, Home Heymans, <a
							class="link"
							href="https://www.homeboudewijn.be/">Home Boudewijn</a
						>, <a class="link" href="https://bertha.ugent.be/">Home Bertha de Vriese</a> en
						<a class="link" href="https://astrid.ugent.be/">Home Astrid</a>, deel uit van de
						studentenhomes van de Universiteit Gent. De ingang is gelegen langs het Stalhof, vlakbij
						de Erasmus homes.
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						{' '}
						De studentenhome dateert uit een latere periode dan de voorgaande homes. Hij is tegelijkertijd
						gebouwd en ingehuldigd met het studentenrestaurant Octopus in de Overpoortstraat.{' '}
					</p>
				</div>
				<figure>
					<img
						src="/foto_home_geschiedenis.jpg"
						width={400}
						height={400}
						alt="oude foto van de home"
					/>
					<figcaption>Een foto uit de oude doos</figcaption>
				</figure>
			</div>
			
			<p class="leading-7 [&:not(:first-child)]:mt-6 text-left">
				Een studie uit 1968, betreffende de noodzaak naar studentenhuisvesting van de universiteit,
				had aangetoond dat er meer dan 50% méér aanvragen waren ingediend dan er toen kamers
				beschikbaar waren. Er waren voor het academiejaar 1968-1969 493 studenten geweigerd wegens
				gebrek aan kamers, en aangezien de universiteit in die periode per academiejaar aanzienlijk
				aangroeide, verwachtte men in de komende jaren een steeds groter tekort aan kamers. Men
				dacht dat tegen 1978 het aantal kamers verdubbeld zou moeten worden, op grond van een raming
				van het toekomstig aantal studenten en van een vooropgestelde norm die aan de universiteiten
				een minimum aantal kamers oplegde. Als gevolg hiervan werd in mei 1969 begonnen met de bouw
				van een nieuw studentenhome, met een capaciteit van 474 kamers, en een gigantisch
				studentenrestaurant met een capaciteit van 15000 middagmalen. Op 21 juni 1971 werden beiden
				tegelijk geopend door rector D. Vandepitte.
			</p>
			<br />
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-5">August Vermeylen</h3>
			<div class="flex flex-row gap-3 justify-center">
				<figure class="justify-center">
					<img
						loading="lazy"
						height={300}
						width={200}
						src="/augustvermeylen.jpg"
						alt="august vermeylen"
					/>
					<figcaption>August Vermeylen</figcaption>
				</figure>
				<div class="text-left">
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						De naam van Home Vermeylen is afkomstig van August Vermeylen. August Vermeylen werd
						geboren op 12 mei 1872 te Brussel en stierf op 10 januari 1945 te Ukkel.
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Hij promoveerde in 1894 in de historische wetenschappen te Brussel, studeerde verder nog
						te Berlijn en Wenen en behaalde in 1899 te Brussel de titel van speciaal doctor. Hij was
						hoogleraar kunstgeschiedenis en Nederlandse letteren, eerst in Brussel (1901-1923) en
						later te Gent (1930-1933). Hij werd de eerste rector van de vernederlandste
						RijksUniversiteit van Gent.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
