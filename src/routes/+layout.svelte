<script>
	import { Toaster } from "$lib/components/ui/sonner";
	
	export let data;

</script>

<svelte:head>
  <meta charset="utf8" />
</svelte:head>

<Toaster richColors theme="dark" />

{#key data.url}
    <slot />
{/key}