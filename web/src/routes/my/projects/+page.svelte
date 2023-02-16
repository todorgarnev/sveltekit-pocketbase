<script lang="ts">
	import { MyProjectItem } from "$lib/components";
	import type { PageData } from "./$types";

	export let data: PageData;

	$: ({ projects } = data);
</script>

<h2 class="text-3xl font-bold">My Projects</h2>

<div class="w-full mt-4 flex flex-col items-center">
	{#if projects?.length === 0}
		<p class="text-center text-3xl">☹️</p>
		<p class="text-center text-3xl mt-2">Looks like you don't have any projects</p>
		<a href="/projects/new" class="btn btn-primary w-full max-w-md mt-8">Add One</a>
	{:else}
		{#each projects as project}
			<MyProjectItem {project} />
			<div class="divider mt-0 mb-2" />
		{/each}
	{/if}
</div>
