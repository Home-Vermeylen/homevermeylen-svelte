<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	let { variant = 'ghost', text, ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<Button {variant} {...restProps}>
	{text}
	<ArrowUpDown class="ml-2" />
</Button>
