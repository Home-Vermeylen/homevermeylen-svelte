<script>
	import { pushState } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Edit } from 'lucide-svelte';

	const { fakkels_bakken } = $props();
</script>

<Button onclick={() => pushState('', { fakkels_bakken })}><Edit /></Button>
