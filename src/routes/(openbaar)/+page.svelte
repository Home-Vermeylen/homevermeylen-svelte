<script lang="ts">
	import { ChevronRight, Euro, MapPin, Pin, Users } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Thuispagina</title>
	
</svelte:head>

<div
	class="overflow-hidden bg-no-repeat bg-cover min-h-[calc(100vh-64px)]"
	style="
      background-position: 50%;
      background-image: url('/omslag.jpg');
      height: 500px;
    "
>
	<div class="w-full h-full overflow-hidden bg-fixed" style="background-color: rgba(0, 0, 0, 0.75)">
		<div class="flex flex-col justify-center items-center h-full">
			<div class=" text-white px-6 md:px-12 items-center text-center">
				<h1 class="text-center text-5xl font-bold tracking-tight mb-5">Home Vermeylen</h1>
				<h2 class="text-xl prose md:text-2xl xl:text-3xl tracking-tight mb-12">
					Een gezellig kotgebouw gelegen in het hartje van Gent
				</h2>
				<div class="flex flex-col gap-2">
					<a href="#over" type="button" class="btn btn-primary">
						Nieuwe bewoners <ChevronRight />
					</a>
					<a class="btn btn-outline no-animation" href="/info/faq">
						FAQ <ChevronRight />
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
<section class="flex flex-col align-middle items-center p-10 pt-20">
	<!-- svelte-ignore a11y-missing-content -->
	<a id="over" />
	<div class="prose">
		<h1 class="text-center">De Home</h1>
		<p>
			<strong>Home Vermeylen</strong> is een kotgebouw uitgebaat door de dienst Huisvesting van de
			Gentse universiteit, gelegen aan het{' '}
			<a href="https://goo.gl/maps/N8xuRbRZ1nJiNQcP9">Stalhof</a>. Ook het onthaal van deze dienst
			is hier gevestigd.
		</p>
		<p>
			Het gebouw telt 8 verdiepingen en 453 kamers waarvan er enkel aangepast zijn voor personen met
			een handicap. De Home biedt naast een kot zelf ook een tuin, ontspanningszaal fietsenstalling
			en twee studiezalen aan.
		</p>
		<p>
			Home Vermeylen maakt deel uit van het{' '}
			<a class="link" href="https://www.homekonvent.be"> Home Konvent </a>
			, de overkoepelende organisatie die alle homebewoners van de UGent, Arteveldehogeschool en HoGent
			vertegenwoordigt.
		</p>
		<p>
			Zoals elke andere studentenhome heeft Home Vermeylen een{' '}
			<a class="link link-hover" href="/homeraad/leden">Homeraad</a>, deze verdedigt de belangen van
			elke bewoner en organiseert ook sportactiviteiten, cultuuractiviteiten, fuiven, cantussen en
			de wekelijkse baravond.
		</p>
		<p>
			Home Vermeylen heeft ook een eigen tijdschrift: het{' '}
			<a class="link link-hover" href="/augustjes">Augustje</a>, vernoemd naar August Vermeylen.
		</p>
	</div>
</section>
<section class="flex flex-col align-middle items-center p-10">
	<!-- svelte-ignore a11y-missing-content -->
	<a id="troeven" />
	<div class="prose">
		<h1 class="text-center">Waarom voor een studentenhome kiezen?</h1>
		<h2 class="flex flex-row gap-2 items-center rounded-xl p-3 bg-base-200">
			<MapPin />
			Ligging
		</h2>
		<p>
			Omdat het gebouw centraal gelegen is liggen alle voornaamste campussen en
			studentenrestauranten op fiets- of wandelafstand. Ook ligt de Home vlakbij de Overpoort, de
			uitgaansbuurt van Gent.
		</p>
		<h2 class="flex flex-row gap-2 items-center rounded-xl p-3 bg-base-200">
			<Users />
			Sociaal
		</h2>
		<p>
			In het homeleven staat het sociale aspect centraal. Aangezien je met veel mensen op een
			verdieping leeft zal je je kotgenoten dus heel vaak zien. Dit vereist misschien een zekere
			aanpassing in het begin van je verblijf, maar de meeste mensen worden dit snel gewoon. Het
			sociale leven en sfeer in het gebouw is een enorme troef die een studentenhome onderscheidt
			van private koten.
		</p>
		<h2 class="flex flex-row gap-2 items-center rounded-xl p-3 bg-base-200">
			<Pin />
			Activiteiten
		</h2>
		<p>
			Naast de wekelijkse baravond die elke dinsdagavond in ontspanningszaal doorgaat worden er ook
			diverse activiteiten door de Homeraad georganiseerd: fuiven, cantussen, sportactiviteiten,
			cultuuractiviteiten, ons jaarlijks festival August In April en nog zoveel meer.
		</p>
		<p>
			Ook is er op de eerste dag van het academiejaar op elke verdieping een <i>gangfeest</i> waar je
			als nieuwe of oude bewoner de kans krijgt om je ganggenoten wat beter te leren kennen. Vaak worden
			er per gang ook spontane activiteiten georganiseerd zoals bijvoorbeeld een filmavond.
		</p>
		<h2 class="flex flex-row gap-2 items-center rounded-xl p-3 bg-base-200">
			<Euro /> Voordelig
		</h2>
		<p>
			De huurprijs voor een kamer op een studentenhome ligt lager dan de meeste koten op de
			privémarkt.
		</p>
	</div>
</section>
<section class="flex flex-col align-middle items-center p-10">
	<!-- svelte-ignore a11y-missing-content -->
	<a id="aanvragen" />
	<div class="prose">
		<h1 class="text-center">Hoe vraag ik een kamer aan?</h1>
		<p>
			Een kamer aanvragen voor het volgende academiejaar kan vanaf 1 maart. Meer informatie vind je
			op{' '}
			<a
				href="https://www.ugent.be/student/nl/meer-dan-studeren/huisvesting"
				target="_blank"
				rel="noopener"
				class="link"
			>
				de website van de dienst Huisvesting
			</a>
			. Omdat er jaarlijks heel veel aanvragen zijn en slechts een beperkt aanbod, is het dus best om
			zo vroeg mogelijk een aanvraag op te starten.
		</p>
	</div>
</section>
<section class="flex flex-col align-middle items-center p-10 pb-20">
	<!-- svelte-ignore a11y-missing-content -->
	<a id="vragen" />
	<div class="prose">
		<h1 class="text-center">Nog vragen?</h1>
		<p>
			De{' '}
			<a href="/info/faq" class="link"> FAQ-pagina </a>{' '}
			van de site probeert een antwoord te geven op veelgestelde vragen van bewoners. Indien je zelf
			nog een vraag hebt kan je hiervoor altijd terecht bij het onthaal van de dienst Huisvesting op
			het gelijkvloers of bij een {' '}
			<a href="/homeraad/leden" class="link"> lid van de Homeraad </a>
			.
		</p>
	</div>
</section>
