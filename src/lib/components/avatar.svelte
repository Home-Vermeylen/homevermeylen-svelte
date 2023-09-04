<script>
	import { getImageURL } from "$lib/utils";

    export let gebruiker;

    const avatar = gebruiker?.avatar ? getImageURL(gebruiker?.collectionId, gebruiker?.id, gebruiker?.avatar) : `https://ui-avatars.com/api/?name=${gebruiker?.voornaam}+${gebruiker?.familienaam}`
</script>

<img width={50} height={50} src={avatar} alt="profielfoto gebruiker" />