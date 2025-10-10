<script lang="ts">
	let academiejaren = ['2023 - nu', 'Pré 2023'];
	let geselecteerd_academiejaar = '2023 - nu';

	const clublied: Record<string, string> = {
		'2023 - nu': `
<b>1.</b> Blauw en wit, ja, dat zijn onze kleuren
<br />Bij Vermeylen heerst onze clubgeest
<br />Want hier valt er niets te betreuren
<br />Ja, bij ons is het altijd dik feest

<b>R.</b> Met een pint in de hand gaan we vieren
<br />Op Vermeylen is 't leven apart
<br />Maar dat geeft niet, er valt veel te plezieren
<br />Home Vermeylen voor altijd in je hart

<b>2.</b> Home Vermeylen, de Home van mijn leven
<br />Eens bij ons ga je zeker niet geen
<br />'t is de Home waar ik alles voor zou geven
<br />Neen, bij ons ben je nooit meer alleen

<b>3.</b> Onze feestjes zijn echt de beste
<br />En op cantussen zijn wij heel luid
<br />Dat gaat onze sfeer niet verpesten
<br />En nadien gaan wij samen nog uit

<b>4.</b> Al die jaren zijn hier verstreken
<br />Nu met senior (naam praeses) aan het stuur
<br />De proseniores mogen niet ontbreken
<br />Home Vermeylen voor ieder door het vuur

<b>R.</b> Met een pint in de hand gaan we vieren
<br />Op Vermeylen is 't leven apart
<br />Maar dat geeft niet, er valt veel te plezieren
<br />Home Vermeylen de beste Home van 't stad!
		`,
		'Pré 2023': `
<b>1.</b> Wat is de beste home van 't stad? Home Vermeylen
<br />Wie drinkt er alweer een vat? Home Vermeylen
<br />Wiens kleuren zijn blauw en wit? Home Vermeylen
<br />'t Is de Home waar ik op zit! Home Vermeylen

<b>R.</b> Op Home Vermeylen, op Home Vermeylen
<br />Wij zijn de zatste van het hele land, ja het hele land
<br />Op Home Vermeylen, ja Home Vermeylen
<br />Daar is het leven, toch zo plezant, ja, heel plezant!

<b>2.</b> Wat is dat studentenoord? Home Vermeylen
<br />Plezant en dicht bij d'Overpoort? Home Vermeylen
<br />Welke naam scanderen wij? Home Vermeylen
<br />Zingen 't luide zij aan zij? Home Vermeylen

<b>3.</b> Waar zijn de spuiten altijd klaar? Home Vermeylen
<br />En soms ook de pruimpjes gaar? Home Vermeylen
<br />Wat drinken wij toch zo graag! Home Vermeylen
<br />Pintjes met een schone kraag! Home Vermeylen

<b>4.</b> Met senior <i>(naam praeses)</i> aan het stuur, Home Vermeylen
<br />Vieren wij tot het vroegste uur, Home Vermeylen
<br />Met de prosenioren op bezoek, Home Vermeylen
<br />Is de leute nooit meer zoek, Home Vermeylen
		`
	};

	// functie om de tekst in strofen te verdelen
	function getStrofes(tekst: string): string[] {
		return tekst
			.trim()
			.split(/(?=<b>)/g) // splits telkens vóór <b>
			.filter((strofe) => strofe.trim().length > 0);
	}
</script>

<svelte:head>
	<title>Homeraad - Clublied</title>
	<meta name="description" content="Het clublied van de studentenvereniging Home Vermeylen." />
	<link rel="canonical" href="https://homevermeylen.be/homeraad/clublied" />
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center">
	<div class="flex flex-col items-center text-center max-w-prose px-4">
		<h1 class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors pt-24 mb-4">
			Clublied
		</h1>

		<select
			bind:value={geselecteerd_academiejaar}
			class="border rounded-md px-3 py-2 mb-8 w-[200px] text-center"
		>
			{#each academiejaren as aj}
				<option value={aj}>{aj}</option>
			{/each}
		</select>

		<!-- Strofes mooi tonen -->
		<div class="flex flex-col items-center text-center space-y-8 leading-7">
			{#each getStrofes(clublied[geselecteerd_academiejaar]) as strofe}
	<p class="leading-7">
		{@html strofe}
	</p>
{/each}

		</div>
	</div>
</div>
