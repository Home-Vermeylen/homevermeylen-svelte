<script lang="ts">
	import { getImageURL } from '$lib/utils';
	import {
		Calendar,
		ChevronDown,
		Heart,
		Info,
		KeyRound,
		Lock,
		LogIn,
		LogOut,
		Newspaper,
		Pencil,
		UserCog,
		Users
	} from 'lucide-svelte';
	import Avatar from './avatar.svelte';
	import Gebruikersmodal from './gebruikersmodal.svelte';
	import Updatewachtwoordmodal from './updatewachtwoordmodal.svelte';

	export let data: import('../../routes/(openbaar)/$types').LayoutData;
	export let form: any;

	let gebruikers_dialog: HTMLDialogElement;
	let wachtwoord_dialog: HTMLDialogElement;

	const toonPreview = (event: Event) => {
		const target = event.target;
		const files = (target as any).files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview') as HTMLImageElement;

			preview.src = src;
		}
	};

	const nav_items = [
		{
			naam: 'Activiteiten',
			href: '/activiteiten',
			icon: Calendar
		},
		{
			naam: 'Augustje',
			href: '/augustje',
			icon: Newspaper
		},
		{
			naam: 'Homeraad',
			icon: Users,
			sub: [
				{
					naam: 'Leden',
					href: '/homeraad/leden'
				},
				{
					naam: 'Verslagen',
					href: '/homeraad/verslagen'
				},
				{
					naam: 'Clublied',
					href: '/homeraad/clublied'
				},
				{
					naam: 'Statuten',
					href: '/statuten.pdf'
				}
			]
		},
		{
			naam: 'Info',
			icon: Info,
			sub: [
				{
					naam: 'Geschiedenis',
					href: '/info/geschiedenis'
				},
				{
					naam: 'FAQ',
					href: '/info/faq'
				}
			]
		}
	];
</script>

<Gebruikersmodal bind:form bind:dialog={gebruikers_dialog} bind:gebruiker={data.user} />
<Updatewachtwoordmodal bind:form bind:dialog={wachtwoord_dialog} bind:gebruiker={data.user} />
<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown z-[1]">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabIndex={0} class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</label>
			<ul
				tabIndex={0}
				class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[1]"
			>
				{#each nav_items as nav_item}
					<li>
						{#if nav_item.sub}
							<span><svelte:component this={nav_item.icon} class="h-4 w-4" /> {nav_item.naam}</span>
							<ul class="pt-2">
								{#each nav_item.sub as sub}
									<li>
										<a href={sub.href}>{sub.naam}</a>
									</li>
								{/each}
							</ul>
						{:else}
							<a href={nav_item.href} class="gap-2 flex flew-row items-center"
								><svelte:component this={nav_item.icon} class="h-4 w-4" /> {nav_item.naam}</a
							>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl">
			<img
				alt="Logo Home Vermeylen"
				class="h-10 w-10 object-scale-down"
				height={901}
				width={1080}
				src="/logo.png"
			/>
		</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each nav_items as nav_item}
				{#if nav_item.sub}
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<li tabindex="0">
						<details>
							<summary>
								<svelte:component this={nav_item.icon} class="h-4 w-4" />
								{nav_item.naam}
							</summary>
							<ul class="pt-2">
								{#each nav_item.sub as sub}
									<li>
										<a href={sub.href}>{sub.naam}</a>
									</li>
								{/each}
							</ul>
						</details>
					</li>
				{:else}
					<li>
						<a href={nav_item.href} class="gap-2 flex flew-row items-center"
							><svelte:component this={nav_item.icon} class="h-4 w-4" /> {nav_item.naam}</a
						>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
	<div class="navbar-end">
		{#if !data.user}
			<a href="/login" class="btn btn-outline">
				Log In <LogIn class="h-4 w-4" />
			</a>
		{:else}
			<div class="dropdown dropdown-left z-[1]">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabIndex={0} class="btn btn-ghost">
					<div class="avatar">
						<div class="w-10 rounded-full ring-primary ring-1 ring-offset-1">
							<Avatar gebruiker={data.user} />
						</div>
					</div>
				</label>
				<div
					tabIndex={0}
					class="dropdown-content card card-compact bg-base-100 w-64 p-2 shadow flex flex-col justify-center align-middle"
				>
					<div class="card-body text-center items-center">
						<form method="post">
							<div class="form-control w-full max-w-lg">
								<label for="avatar" class="hover:cursor-pointer">
									<div class="avatar">
										<label for="avatar" class="absolute -bottom-0.5 -right-0.5">
											<span class="btn btn-circle btn-sm btn-secondary">
												<Pencil class="w-4 h-4" />
											</span>
										</label>
										<div class="w-36 rounded-full ring-primary ring-1 ring-offset-1">
											<Avatar gebruiker={data.user} />
										</div>
									</div>
								</label>
								<input
									type="file"
									name="avatar"
									id="avatar"
									value=""
									accept="image/*"
									hidden
									on:change={toonPreview}
								/>
							</div>
						</form>
						<h3 class="card-title">
							{data.user.voornaam}
							{data.user.familienaam}
						</h3>
						<div class="flex gap-2">
							<button
								class="btn btn-circle mt-2"
								on:click={() => {
									gebruikers_dialog.showModal();
								}}
							>
								<UserCog class="h-4 w-4" />
							</button>
							<button on:click={() => wachtwoord_dialog.showModal()} class="btn btn-circle mt-2">
								<KeyRound class="h-4 w-4" />
							</button>
						</div>
						<div class="divider" />
						<a class="btn btn-wide btn-ghost" href="/beheer">
							Beheer <Lock class="h-4 w-4" />
						</a>
						<a class="btn btn-wide btn-ghost" href="/beheer/vriendschapsnetwerk">
							Vriendschapnetwerk <Heart class="h-4 w-4" />
						</a>
						<form action="/logout" method="post">
							<button class="btn btn-wide btn-ghost">Log uit <LogOut class="h-4 w-4" /> </button>
						</form>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
