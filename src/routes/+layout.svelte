<script>
	import { Toaster } from '$lib/components/ui/sonner';

	export let data;
</script>

<svelte:head>
	<meta charset="utf8" />
	{#if import.meta.env.PROD}
		<script
			defer
			src="https://cloud.umami.is/script.js"
			data-website-id="a628ad5e-8f36-43aa-8215-374451f852df"
		></script>
	{/if}
</svelte:head>

<Toaster richColors theme="dark" />

{#key data.url}
	<slot />
{/key}
