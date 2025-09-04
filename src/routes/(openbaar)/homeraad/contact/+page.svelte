<script>
	import { Button } from "$lib/components/ui/button";

	
</script>
<svelte:head>
	<title>Homeraad - Contact</title>
    <meta name="description" content="Contactgegevens homeraad Home Vermeylen">
	<link rel="canonical" href="https://homevermeylen.be/homeraad/contact">
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center mx-5">
	<div class="flex flex-col items-center text-center w-full">
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-[2.5dvh] mb-[2.5dvh]"
		>
            Contact
		</h1>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
            De homeraad is bereikbaar via volgend e-mailadres: <Button class="w-56" variant="link" href="mailto:homeraadvermeylen@gmail.com">homeraadvermeylen@gmail.com</Button>
        </p>
    </div>
</div>

