<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import {
		getLocalTimeZone,
		type DateValue,
		today,
		DateFormatter,
		parseDate
	} from '@internationalized/date';
	import { CalendarIcon } from 'lucide-svelte';
	import { buttonVariants } from '../ui/button';
	import * as Popover from '../ui/popover';
	import { Calendar } from '../ui/calendar';
	import { cn } from '$lib/utils';

	interface Props {
		form: SuperForm<T>;
		field: FormPathLeaves<T>;
	}

	let { form, field, ...restprops }: Props = $props();

	const { value, errors, constraints } = formFieldProxy(form, field);

	const df = new DateFormatter('nl-BE', {
		dateStyle: 'long'
	});
	let value_state = $state<DateValue | undefined>();

	$effect(() => {
		let datum = $value
			? new Date($value).toISOString().substring(0, 10)
			: new Date().toISOString().substring(0, 10);

		value_state = parseDate(datum);
	});

	let placeholder = $state<DateValue>(today(getLocalTimeZone()));
</script>

<Form.Field {form} name={field} aria-invalid={$errors ? 'true' : undefined}>
	<Form.Control>
		{#snippet children({ props })}
			<div class="flex flex-col gap-2">
				<Form.Label>Datum</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						{...props}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							' justify-start pl-4 text-left font-normal',
							!value_state && 'text-muted-foreground'
						)}
					>
						{value_state
							? df.format(value_state.toDate(getLocalTimeZone()))
							: 'Selecteer een datum'}
						<CalendarIcon class="ml-auto size-4 opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							type="single"
							value={value_state}
							bind:placeholder
							minValue={today(getLocalTimeZone())}
							calendarLabel="Datum"
							onValueChange={(v) => {
								if (v) {
									$value = new Date(v.toString());
								} else {
									$value = '';
								}
							}}
						/>
					</Popover.Content>
				</Popover.Root>
			</div>
			<Form.FieldErrors />
			<input
				hidden
				bind:value={$value}
				name={field}
				aria-invalid={$errors ? 'true' : undefined}
				{...$constraints}
				{...restprops}
			/>
		{/snippet}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
{#if $errors}<span class="invalid">{$errors}</span>{/if}
