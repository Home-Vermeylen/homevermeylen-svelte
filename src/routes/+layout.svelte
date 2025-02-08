<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	let { data, children } = $props();
</script>

<ModeWatcher />

<svelte:head>
	<meta charset="utf8" />
	{#if import.meta.env.PROD}
		<script
			async
			src="https://cloud.umami.is/script.js"
			data-website-id="a628ad5e-8f36-43aa-8215-374451f852df"
		></script>
	{/if}
</svelte:head>

<Toaster richColors theme="dark" />

{#key data.url}
	{@render children?.()}
{/key}
