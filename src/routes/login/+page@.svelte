<script>
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import toast from 'svelte-french-toast';
	export let form;

	let loading = false;

	const submitLogin = () => {
		loading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'invalid':
					toast.error('Inloggen mislukt.');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Log In</title>
</svelte:head>

<div class="hero min-h-screen" style="background-image: url('/omslag.jpg');">
	<div class="hero-content w-96 flex-col lg:flex-row-reverse">
		<div class="card bg-base-200 flex-shrink-0 w-full max-w-sm shadow-2xl">
			<div class="card-body">
				<figure>
					<img alt="Logo Home Vermeylen" class="h-20 w-20 object-contain" src="/logo.png" />
				</figure>
				<h1 class="text-3xl font-bold text-center">Aanmelden</h1>
				<form use:enhance={submitLogin} action="?/login" method="post">
					<Input
						type="text"
						id="gebruikersnaam"
						label="Gebruikersnaam"
						value={form?.data?.gebruikersnaam ?? ''}
						errors={form?.errors?.gebruikersnaam}
						disabled={loading}
					/>
					<Input
						type="password"
						id="wachtwoord"
						label="Wachtwoord"
						errors={form?.errors?.wachtwoord}
						disabled={loading}
					/>
					<div class="form-control mt-6 w-full max-w-lg">
						<button type="submit" class="btn btn-primary">Login</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
