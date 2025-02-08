<script lang="ts">


	interface Props {
		value?: string;
		placeholder?: string;
		id: string;
		label: string;
		type?: string;
		disabled?: boolean;
		required?: boolean;
		binding?: HTMLInputElement | null;
		errors: any;
	}

	let {
		value = '',
		placeholder = '',
		id,
		label,
		type = 'text',
		disabled = false,
		required = false,
		binding = $bindable(null),
		errors
	}: Props = $props();
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<input
		bind:this={binding}
		{type}
		{id}
		{value}
		{placeholder}
		{required}
		{disabled}
		name={id}
		class={`input input-bordered`}
	/>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">{error}</span>
			</label>
		{/each}
	{/if}
</div>
