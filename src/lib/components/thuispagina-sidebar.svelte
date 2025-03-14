<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Calendar, ChevronRight, Info, Newspaper, Users } from 'lucide-svelte';
	import type { ComponentProps } from 'svelte';
	import * as Collapsible from '$lib/components/ui/collapsible';

	let {
		ref = $bindable(null),
		nav_items,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {...restProps} bind:ref>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div class="flex items-center">
								<img src="/logo.png" alt="Home Vermeylen" class="h-10 w-10 object-contain" />
								<span class="sr-only">Home Vermeylen</span>
							</div>

							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-semibold">Home Vermeylen</span>
								<span class="">Navigatiemenu</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content class="gap-0">
		<!-- We create a Sidebar.Group for each parent. -->
		{#each nav_items as group (group.title)}
			<Collapsible.Root title={group.title} open={true} class="group/collapsible">
				<Sidebar.Group>
					<Sidebar.GroupLabel
						class="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
					>
						{#snippet child({ props })}
							<Collapsible.Trigger {...props}>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={group.url} {...props}>
											{#if group.icon}
												<group.icon />
											{/if}
											<span>{group.title}</span>
										</a>
										{#if group.items}
											<ChevronRight
												class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
											/>
										{/if}
									{/snippet}
								</Sidebar.MenuButton>
							</Collapsible.Trigger>
						{/snippet}
					</Sidebar.GroupLabel>
					<Collapsible.Content>
						<Sidebar.GroupContent>
							<Sidebar.MenuSub>
								{#each group.items as item (item.title)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuButton>
											{#snippet child({ props })}
												<a href={item.url} {...props}
													>{#if item.icon}<item.icon />{/if}<span>{item.title}</span></a
												>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						</Sidebar.GroupContent>
					</Collapsible.Content>
				</Sidebar.Group>
			</Collapsible.Root>
		{/each}
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
