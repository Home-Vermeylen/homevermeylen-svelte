<script>
	import { getImageURL } from "$lib/utils";

    export let data;

    const avatar = data.user?.avatar ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar) : `https://ui-avatars.com/api/?name=${data.user?.voornaam}+${data.user?.familienaam}`
</script>

<img width={50} height={50} src={avatar} alt="profielfoto gebruiker" />