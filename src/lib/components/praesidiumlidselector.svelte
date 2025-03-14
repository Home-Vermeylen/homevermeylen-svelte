<script lang="ts">
	import { Check, ChevronsUpDown, LoaderCircle, Send } from 'lucide-svelte';
	import { Button } from './ui/button';
	import * as Command from './ui/command';
	import * as Popover from './ui/popover';
	import { superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { Input } from './ui/input';
	import { cn } from '$lib/utils';

	interface Props {
		praesidium_leden: object;
		geselecteerde_functies: string[];
		verkiezing_id: string;
	}

	let { praesidium_leden, geselecteerde_functies, verkiezing_id }: Props = $props();

	const form = superForm(
		{ geselecteerde_functies },
		{
			invalidateAll: true
		}
	);

	const { form: formData, enhance, delayed, isTainted, tainted } = form;
	let open = $state(false);
</script>

<form method="POST" use:enhance action={`/api/verkiezingen/${verkiezing_id}`}>
	<div class="flex flex-row gap-2">
		<Form.Field {form} name="geselecteerde_functies" class="flex flex-col items-center">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Stemgerechtigde Homeraadsleden</Form.Label>
					<Input type="hidden" {...props} bind:value={$formData.geselecteerde_functies} />
					<Popover.Root>
						<div class="flex flex-row gap-2">
							<Popover.Trigger>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={open}
									class="w-[200px] md:w-[400px] justify-between"
								>
									{$formData.geselecteerde_functies.length}
									{$formData.geselecteerde_functies.length == 1 ? 'lid' : 'leden'} geselecteerd
									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</Popover.Trigger>
							<Button disabled={!$tainted} onclick={() => form.submit()}
								>{#if $delayed}<LoaderCircle class="animate-spin" />
								{:else}<Send />{/if}</Button
							>
						</div>
						<Popover.Content class="w-[200px] md:w-[400px] h-56 p-0 overflow-y-auto">
							<Command.Root>
								<Command.Input autofocus placeholder="Zoek homeraadslid..." class="h-9" />
								<Command.Empty>Geen homeraadsleden gevonden.</Command.Empty>
								<Command.Group class="overflow-y-auto">
									{#each praesidium_leden as praesidium_lid}
										<Command.Item
											value={`${praesidium_lid.expand.functie.username.replace(/[0-9]/g, '')} (${
												praesidium_lid.voornaam
											} ${praesidium_lid.familienaam})`}
											onSelect={() => {
												if (
													$formData.geselecteerde_functies.find(
														(n) => n == praesidium_lid.expand.functie.id
													)
												) {
													$formData.geselecteerde_functies =
														$formData.geselecteerde_functies.filter(
															(n) => n != praesidium_lid.expand.functie.id
														);
												} else {
													$formData.geselecteerde_functies.push(praesidium_lid.expand.functie.id);
													$formData.geselecteerde_functies = $formData.geselecteerde_functies;
												}
											}}
										>
											{`${praesidium_lid.expand.functie.username.replace(/[0-9]/g, '')} (${
												praesidium_lid.voornaam
											} ${praesidium_lid.familienaam})`}
											<Check
												class={cn(
													'ml-auto h-4 w-4',
													$formData.geselecteerde_functies.find(
														(n) => n == praesidium_lid.expand.functie.id
													)
														? ''
														: 'text-transparent'
												)}
											/>
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
				{/snippet}
			</Form.Control>
		</Form.Field>
	</div>
</form>
