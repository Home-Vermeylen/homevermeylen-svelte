<script>
	import { Toaster } from 'svelte-french-toast';
	import { fly } from 'svelte/transition';

	export let data;

</script>

<Toaster />

{#key data.url}
  <div
    in:fly={{ x: -200, duration: 300, delay: 300 }}
    out:fly={{ x: 200, duration: 300 }}
  >
    <slot />
  </div>
{/key}