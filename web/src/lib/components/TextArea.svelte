<script lang="ts">
	export let value: string = "";
	export let placeholder: string = "";
	export let id: string = "";
	export let label: string = "";
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let errors: string[] = [];
</script>

<div class="form-control w-full max-w-lg">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>

	<textarea
		{value}
		{id}
		{required}
		{disabled}
		{placeholder}
		name={id}
		class="textarea textarea-bordered h-24 resize-none {errors && errors.length > 0 ? 'border-red-400' : ''}"
	/>

	{#if errors}
		{#each errors as error}
			<label for="" class="label py-0pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
