<script lang="ts">
	interface Props {
		alt: string;
		src: string;
		height?: string;
		width?: string;
	}

	let {
		alt,
		src,
		height = '64',
		width = '64'
	}: Props = $props();
</script>

<img
	{alt}
	{src}
	class="aspect-square rounded-md object-cover"
	{height}
	{width}
/>
