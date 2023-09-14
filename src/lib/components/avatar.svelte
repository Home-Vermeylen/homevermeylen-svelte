<script lang="ts">
	import { getImageURL } from '$lib/utils';

	export let gebruiker;
	export let image: HTMLImageElement | undefined = undefined;

	const avatar = gebruiker?.avatar
		? getImageURL(gebruiker?.collectionId, gebruiker?.id, gebruiker?.avatar)
		: `https://ui-avatars.com/api/?name=${gebruiker?.voornaam}+${gebruiker?.familienaam}`;
</script>

<img bind:this={image} width={50} height={50} src={avatar} alt="profielfoto gebruiker" />
