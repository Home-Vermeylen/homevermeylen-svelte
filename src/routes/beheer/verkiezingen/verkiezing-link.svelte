<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let { verkiezing } = $props();
</script>

<Button href={'/beheer/verkiezingen/' + verkiezing.id} variant="link">{verkiezing.naam}</Button>
