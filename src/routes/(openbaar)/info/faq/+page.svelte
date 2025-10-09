<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import { Button } from '$lib/components/ui/button';
	import { LucidePhone } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Veelgestelde vragen</title>
	<meta
		name="description"
		content="Een antwoord op vaak gestelde vragen met betrekking tot het homeleven."
	/>
	<link rel="canonical" href="https://homevermeylen.be/info/faq">
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center">
	<div class="flex flex-col items-center text-center">
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-24 mb-8"
		>
            Veelgestelde vragen
		</h1>
		<Accordion.Root class="w-56 md:w-96">
			<Accordion.Item value="internet">
				<Accordion.Trigger>Hoe verbind ik met het internet?</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Op de homes kan je net zoals op alle UGent campussen en resto's gebruik maken van het
						Eduroam netwerk. Ook kan je gebruik maken van een bekabelde verbinding op je kamer.
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Inloggen gebeurt met het emailadres (bv. <code
							class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
							>student@ugent.be</code
						>) en wachtwoord dat je gebruikt om in te loggen op Ufora.
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Op sommige toestellen verloopt dit echter minder vlot: meestal volstaat het dan om bij
						de wifi-instellingen van je toestel <code
							class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
							>EAP-methode</code
						>
						in te stellen op
						<code
							class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
							>PEAP</code
						>
						en
						<code
							class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
							>CA-Certificaat</code
						>
						in te stellen op <code>Gebruik systeemcertificaten</code>
						met als domein
						<code
							class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
							>radius.ugent.be</code
						>
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Het veld <code
							class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
							>anonieme identiteit</code
						> hoef je niet in te vullen.
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Nog problemen? De ICT-verantwoordelijke van de Homeraad en de mensen aan het onthaal van
						de Home helpen je graag verder :)
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="sleutel">
				<Accordion.Trigger>Sleutel vergeten?</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Aan het <Button class="inline-flex gap-1" href="tel:092647100" variant="link"><LucidePhone class="h-4 w-4"/> onthaal</Button> van de Home
						kan je de reservesleutel van je kamer gaan opvragen.
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Indien het onthaal gesloten is kan je aan de zijkant van de Home (aan de kant van Home
						Heymans) aanbellen bij de permanentiedienst (24/7). Zij kunnen je dan verder helpen.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="overlast">
				<Accordion.Trigger>Overlast</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Bij overlast in het gebouw kan je 24/7 contact opnemen met het <Button
							variant="link"
							href="tel:080067888"> <LucidePhone class="h-4 w-4" /> permanentiecentrum</Button
						> van de UGent.
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>
</div>
