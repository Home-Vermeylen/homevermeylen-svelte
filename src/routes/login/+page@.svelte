<script>
    export let form;
</script>

<div class="hero min-h-screen" style="background-image: url('/omslag.jpg');">
	<div class="hero-content w-96 flex-col lg:flex-row-reverse">
		<div class="card bg-base-200 flex-shrink-0 w-full max-w-sm shadow-2xl">
			<div class="card-body">
				<figure>
					<img alt="Logo Home Vermeylen" class="h-20 w-20 object-contain" src="/logo.png" />
				</figure>
				<h1 class="text-3xl font-bold text-center">Aanmelden</h1>
				<form action="?/login" method="post">
					<div class="form-control">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text">Gebruikersnaam</span>
						</label>
						<input type="text" name="gebruikersnaam" class={`input input-bordered`} />
					</div>
					<div class="form-control">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text">Wachtwoord</span>
						</label>
						<input type="password" name="wachtwoord" class={`input input-bordered`} />
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<a href="#top" class="label-text-alt link link-hover"> Wachtwoord vergeten? </a>
						</label>
					</div>
					<div class="form-control mt-6">
						<button type="submit" class="btn btn-primary">Login</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
