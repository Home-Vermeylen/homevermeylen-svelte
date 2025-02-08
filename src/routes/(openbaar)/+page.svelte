<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ChevronRight, Euro, MapPin, Pin, Users } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Thuispagina</title>
	<meta name="description" content="Thuispagina Home Vermeylen" />
	<link rel="canonical" href="https://homevermeylen.be" />
</svelte:head>

<div
	class="overflow-hidden bg-no-repeat bg-cover min-h-[calc(100vh)]"
	style="
      background-position: 50%;
      background-image: url('/omslag.jpg');
      height: 500px;
    "
>
	<div class="w-full h-full overflow-hidden bg-fixed" style="background-color: rgba(0, 0, 0, 0.75)">
		<div class="flex flex-col justify-center items-center h-full">
			<div class="text-foreground px-6 md:px-12 items-center text-center">
				<h1 class="text-center text-5xl font-bold tracking-tight mb-5">Home Vermeylen</h1>
				<h2 class="text-xl md:text-2xl xl:text-3xl tracking-tight mb-12">
					Een gezellig kotgebouw gelegen in het hartje van Gent
				</h2>
				<div class="flex flex-col gap-2">
					<Button href="#over">Nieuwe bewoners <ChevronRight class="h-4 w-4" /></Button>
					<Button variant="outline" href="/homeraad/sponsors"
						>Ontdek onze sponsors <ChevronRight class="h-4 w-4" /></Button
					>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="flex flex-col items-center">
	<section class="flex flex-col justify-center p-10 max-w-prose">
		<!-- svelte-ignore a11y_missing_content -->
		<a id="over"></a>

		<h1
			class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center"
		>
			De Home
		</h1>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			<strong>Home Vermeylen</strong> is een kotgebouw uitgebaat door de dienst Huisvesting van de
			Gentse universiteit, gelegen aan het{' '}
			<a href="https://goo.gl/maps/N8xuRbRZ1nJiNQcP9">Stalhof</a>. Ook het onthaal van deze dienst
			is hier gevestigd.
		</p>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Het gebouw telt 8 verdiepingen en 453 kamers waarvan er enkele aangepast zijn voor personen
			met een handicap. De Home biedt naast een kot zelf ook een tuin, ontspanningszaal
			fietsenstalling en twee studiezalen aan.
		</p>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Home Vermeylen maakt deel uit van het{' '}
			<a class="link" href="https://www.homekonvent.be"> Home Konvent </a>
			, de overkoepelende organisatie die alle homebewoners van de UGent, Arteveldehogeschool en HoGent
			vertegenwoordigt.
		</p>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Zoals elke andere studentenhome heeft Home Vermeylen een{' '}
			<a class="link link-hover" href="/homeraad/leden">Homeraad</a>, deze verdedigt de belangen van
			elke bewoner en organiseert ook sportactiviteiten, cultuuractiviteiten, fuiven, cantussen en
			de wekelijkse baravond.
		</p>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Home Vermeylen heeft ook een eigen tijdschrift: het{' '}
			<a class="link link-hover" href="/augustjes">Augustje</a>, vernoemd naar August Vermeylen.
		</p>
	</section>
	<section class="flex flex-col align-middle items-center p-10 max-w-prose">
		<!-- svelte-ignore a11y_missing_content -->
		<a id="troeven"></a>
		<h1
			class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center"
		>
			Waarom voor een studentenhome kiezen?
		</h1>
		<div class="flex gap-2 items-center pt-5">
			<MapPin class="h-4 w-4" />
			<h2 class="flex gap-2 content-center scroll-m-20 text-2xl font-semibold tracking-tight">
				Ligging
			</h2>
		</div>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Omdat het gebouw centraal gelegen is liggen alle voornaamste campussen en
			studentenrestauranten op fiets- of wandelafstand. Ook ligt de Home vlakbij de Overpoort, de
			uitgaansbuurt van Gent.
		</p>
		<div class="flex gap-2 items-center pt-5">
			<Users class="h-4 w-4" />
			<h2 class="flex gap-2 content-center scroll-m-20 text-2xl font-semibold tracking-tight">
				Sociaal
			</h2>
		</div>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			In het homeleven staat het sociale aspect centraal. Aangezien je met veel mensen op een
			verdieping leeft zal je je kotgenoten dus heel vaak zien. Dit vereist misschien een zekere
			aanpassing in het begin van je verblijf, maar de meeste mensen worden dit snel gewoon. Het
			sociale leven en sfeer in het gebouw is een enorme troef die een studentenhome onderscheidt
			van private koten.
		</p>
		<div class="flex gap-2 items-center pt-5">
			<Pin class="h-4 w-4" />
			<h2 class="flex gap-2 content-center scroll-m-20 text-2xl font-semibold tracking-tight">
				Activiteiten
			</h2>
		</div>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Naast de wekelijkse baravond die elke dinsdagavond in ontspanningszaal doorgaat worden er ook
			diverse activiteiten door de Homeraad georganiseerd: fuiven, cantussen, sportactiviteiten,
			cultuuractiviteiten, ons jaarlijks festival August In April en nog zoveel meer.
		</p>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Ook is er op de eerste dag van het academiejaar op elke verdieping een <i>gangfeest</i> waar je
			als nieuwe of oude bewoner de kans krijgt om je ganggenoten wat beter te leren kennen. Vaak worden
			er per gang ook spontane activiteiten georganiseerd zoals bijvoorbeeld een filmavond.
		</p>
		<div class="flex gap-2 items-center pt-5">
			<Euro class="h-4 w-4" />
			<h2 class="flex gap-2 content-center scroll-m-20 text-2xl font-semibold tracking-tight">
				Voordelig
			</h2>
		</div>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			De huurprijs voor een kamer op een studentenhome ligt lager dan de meeste koten op de
			privémarkt.
		</p>
	</section>
	<section class="flex flex-col align-middle items-center p-10 max-w-prose">
		<!-- svelte-ignore a11y_missing_content -->
		<a id="aanvragen"></a>
		<h1
			class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center"
		>
			Hoe vraag ik een kamer aan?
		</h1>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Een kamer aanvragen voor het volgende academiejaar kan vanaf 1 maart. Meer informatie vind je
			op
			<Button
				href="https://www.ugent.be/student/nl/meer-dan-studeren/huisvesting"
				target="_blank"
				rel="noopener"
				variant="link"
				class="w-60"
			>
				de website van de dienst Huisvesting
			</Button>
			. Omdat er jaarlijks heel veel aanvragen zijn en slechts een beperkt aanbod, is het best om zo
			vroeg mogelijk een aanvraag op te starten.
		</p>
	</section>
	<section class="flex flex-col align-middle items-center p-10 pb-20 max-w-prose">
		<!-- svelte-ignore a11y_missing_content -->
		<a id="vragen"></a>
		<h1
			class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center"
		>
			Nog vragen?
		</h1>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			De
			<Button variant="link" href="/info/faq" class="w-48">Veelgestelde Vragen pagina</Button>
			van de site probeert een antwoord te geven op vaak terugkomende vragen van bewoners. Indien je
			zelf nog een vraag hebt kan je hiervoor altijd terecht bij het onthaal van de dienst Huisvesting
			op het gelijkvloers of bij een
			<Button href="/homeraad/leden" variant="link" class="w-60"
				>vertegenwoordiger van de Homeraad</Button
			>
			.
		</p>
	</section>
</div>
