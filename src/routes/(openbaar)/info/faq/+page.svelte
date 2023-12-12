<svelte:head>
	<title>Frequently Asked Questions</title>
	<meta name="description" content="Een antwoord op vaak gestelde vragen met betrekking tot het homeleven.">
</svelte:head>

<div
	class="min-h-[calc(100vh-64px)] overflow-hidden flex flex-col items-center w-full p-10 md:py-5"
>
	<div class="prose mt-5">
		<h1 class="text-center">FAQ</h1>
		<div class="join join-vertical w-full">
			<div class="collapse collapse-arrow join-item border border-base-300 bg-base-200">
				<input type="checkbox" name="faq" />
				<div class="collapse-title text-xl font-medium">
					Hoe verbind ik met het internet?
				</div>
				<div class="collapse-content">
					<p>
						Op de homes kan je net zoals op alle UGent campussen en resto's gebruik maken van het
						Eduroam netwerk. Ook kan je gebruik maken van een bekabelde verbinding op je kamer.
					</p>
					<p>
						Inloggen gebeurt met het emailadres (bv. <code>student@ugent.be</code>) en wachtwoord
						dat je gebruikt om in te loggen op Ufora.
					</p>
					<p>
						Op sommige toestellen verloopt dit echter minder vlot: meestal volstaat het dan om bij
						de wifi-instellingen van je toestel <code>EAP-methode</code> in te stellen op
						<code>PEAP</code>
						en <code>CA-Certificaat</code> in te stellen op <code>Gebruik systeemcertificaten</code>
						met als domein <code>radius.ugent.be</code>
					</p>
					<p>Het veld <code>anonieme identiteit</code> hoef je niet in te vullen.</p>
					<p>
						Nog problemen? De ICT-verantwoordelijke van de Homeraad en de mensen aan het onthaal van
						het Home helpen je graag verder :)
					</p>
				</div>
			  </div>
			  <div class="collapse collapse-arrow join-item border border-base-300 bg-base-200">
				<input type="checkbox" name="faq" />
				<div class="collapse-title text-xl font-medium">
					Sleutel vergeten! Wat nu?
				</div>
				<div class="collapse-content">
					<p>
						Aan het <a class="link link-hover underline" href="tel:092647100">onthaal</a> van de Home
						kan je de reservesleutel van je kamer gaan opvragen.
					</p>
					<p>
						Indien het onthaal gesloten is kan je aan de zijkant van de Home (aan de kant van Home Heymans) aanbellen bij de permanentiedienst (24/7).
						Zij kunnen je dan verder helpen.
					</p>
				</div>
			  </div>
			  <div class="collapse collapse-arrow join-item border border-base-300 bg-base-200">
				<input type="checkbox" name="faq" />
				<div class="collapse-title text-xl font-medium">
					Overlast
				</div>
				<div class="collapse-content">
					<p>
						Bij overlast in het gebouw kan je 24/7 contact opnemen met het <a
							class="link link-hover underline"
							href="tel:080067888">permanentiecentrum</a
						> van de UGent.
					</p>
				</div>
			  </div>
		</div>
	</div>
</div>
