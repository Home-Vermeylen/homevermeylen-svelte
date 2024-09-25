<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Homeraad - Werking</title>
	<meta name="description" content="Een woordje uitleg over de werking van de homeraad" />
	<link rel="canonical" href="https://homevermeylen.be/homeraad/werking" />
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center mx-5">
	<div class="flex flex-col items-center w-full">
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-24 mb-8"
		>
			Werking
		</h1>
		<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Homeraad?</h3>
		<p class="leading-7 [&:not(:first-child)]:mt-6 max-w-56 md:max-w-prose">
			De structuur van de homeraad is te vergelijken met die van elk andere studentenclub. De
			functie van de homeraad als een geheel is echter voor een stuk anders. Zeker als men die
			vergelijkt met de functie van een FK-praesidium.
		</p>

		<p class="leading-7 [&:not(:first-child)]:mt-6 max-w-56 md:max-w-prose">
			Het FK staat voor Faculteiten Konvent en verzamelt alle studentenclubs die rechtstreeks
			afhangen van een bepaalde studierichting. De homeraden maken deel uit het van HK, het Home
			Konvent.
		</p>

		<p class="leading-7 [&:not(:first-child)]:mt-6 max-w-56 md:max-w-prose">
			De homeraad van Home Vermeylen stelt zich meer op als tussenpersoon tussen wat wij ludiek de
			"overheid" noemen (lees: de huisvestingsdienst) en de studenten die bij ons verblijven. De
			homeraad organiseert ook allerlei activiteiten, zoals baravonden, fuiven, cantussen, film
			avonden en culturele uitstapjes.
		</p>

		<br />
		<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Functiebeschrijvingen</h3>
		<br />
		<Accordion.Root class="w-full max-w-56 md:max-w-prose">
			<Accordion.Item value="praeses">
				<Accordion.Trigger>Praeses</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						De voorzitter van de homeraad, staat aan het hoofd en neemt de beslissingen, in
						samenspraak met de overige leden van de homeraad.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="vice-praeses">
				<Accordion.Trigger>Vice-Praeses</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						De rechterhand van de praeses, dient deze ook te vervangen mocht er iets met de praeses
						gebeuren.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="penning">
				<Accordion.Trigger>Penning</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Beheert het geld van de homeraad. De homeraad krijgt elk jaar een bepaald bedrag aan
						subsidies en verder zijn er inkomsten uit een aantal activiteiten.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="ICT">
				<Accordion.Trigger>ICT</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Heeft de verantwoordelijkheid over deze website en is een aansprekingspunt voor
						internetproblemen in het gebouw.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="milieu">
				<Accordion.Trigger>Milieu</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Spoort de bewoners en homeraad aan om zo goed mogelijk zorg de dragen voor onze planeet.
						Organiseert enkele milieu gerelateerde activiteiten en zetelt in de maandelijkse
						milieu-raad van het Home Konvent.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="secretaris">
				<Accordion.Trigger>Secretaris</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						De primaire taak van de secretaris is het maken van een verslag van alle vergaderingen
						van de homeraad. Er zijn twee soorten vergaderingen: een beperkte homeraad, bedoeld voor
						de homeraadleden en gangverantwoordelijken, en een algemene homeraad, bedoeld voor de
						ganse home.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="sport">
				<Accordion.Trigger>Sport</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Organiseren een aantal sportieve activiteiten, waaronder de deelname aan de grotere
						happenings zoals 12-urenloop en Inter Home Run. Deze activiteiten gaan meestal door in
						het GUSB.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="feest">
				<Accordion.Trigger>Feest</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Deze personen zijn verantwoordelijk voor het organiseren van de fenomenale
						Vermeylen-fuiven
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="bar">
				<Accordion.Trigger>Bar</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Zorgen dat er altijd genoeg frisse pintjes (en andere dranken natuurlijk ;) ) aanwezig
						zijn op baravonden, verder onderhouden zij de contacten met brouwers en zorgen voor een
						brandschoon drankkot.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="PR-Intern">
				<Accordion.Trigger>PR-Intern</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						PR-Intern houdt zich bezig met het maken van banners voor de activiteiten, het
						weekoverzicht dat in elke lift hangt en posters.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="PR-Extern">
				<Accordion.Trigger>PR-Extern</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						De hoofdtaak van de PR-Extern is het verzamelen van sponsorgeld om onze kas te spijzen.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="cultuur">
				<Accordion.Trigger>Cultuur</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Zijn verantwoordelijk voor het organiseren van allerlei culturele activiteiten, zoals
						het bezoeken van musea, naar de film of opera gaan, bezoeken van een brouwerij,
						uitstapjes, etc. Deze personen hebben ook de eindverantwoordelijkheid over Home
						Vermeylen's eigen festival, August In April.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="schachtentemmer">
				<Accordion.Trigger>Schachtentemmer</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Deze persoon zorgt voor de werving en opleiding van nieuwe leden (ook wel schachten
						genoemd) en leidt de doop in goede banen. Helpt mee bij de organisatie van de cantussen.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="scriptor">
				<Accordion.Trigger>Scriptor</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Deze persoon (of personen) zijn verantwoordelijk voor het periodieke boekje van Home
						Vermeylen, het Augustje.
					</p>
				</Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="zeden">
				<Accordion.Trigger>Zeden</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Helpt mee bij de organisatie van cantussen en zorgt ervoor dat de orde bewaard blijft.
					</p>
				</Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="internationaal">
				<Accordion.Trigger>Internationaal</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Het eerste aansprekingspunt voor Erasmusstudenten die op de home verblijven.
					</p>
				</Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="cantor">
				<Accordion.Trigger>Cantor</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Helpt mee bij de organisatie van cantussen en zingt de liedjes voor.
					</p>
				</Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="meter-peter">
				<Accordion.Trigger>Meter / Peter</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Een erefunctie bestemd voor personen die veel voor de homeraad hebben betekend.
					</p>
				</Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="vm">
				<Accordion.Trigger>Vaste Medewerker</Accordion.Trigger>
				<Accordion.Content>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Ook wel VM genoemd. Ondersteunt de homeraad waar nodig bij het organiseren van activiteiten.
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            Een overzicht van wie welke functie bekleedt kan je op <Button class="w-5" variant="link" href="/homeraad/leden">deze</Button> pagina terugvinden.
        </p>
	</div>
</div>
