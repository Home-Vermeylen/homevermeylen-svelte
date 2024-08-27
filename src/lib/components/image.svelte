<script lang="ts">
    export let alt: string;
    export let src: string;
    export let height = '64';
    export let width = '64';
</script>

<img
	{alt}
	{src}
	class="aspect-square rounded-md object-cover"
	{height}
	{width}
/>
