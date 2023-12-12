<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let id: string;
	export let label: string;
	export let type = 'text';
	export let disabled = false;
	export let required = false;

	export let binding: HTMLInputElement | null = null;

	export let errors: any;
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
