<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import toast from "svelte-french-toast";
	import { Modal } from "$lib/components";
	import type { Project } from "$lib/types/types";
	import { getImageUrl } from "$lib/utils/utils";

	export let project: Project;

	let modalOpen: boolean = false;
	let loading: boolean = false;

	const submitDeleteProject: SubmitFunction = () => {
		loading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case "success":
					toast.success("Project deleted successfully!");
					await update();
					break;
				case "error":
					toast.error("Could not delete project. Try again later.");
					break;
				default:
					await update();
			}

			loading = false;
		};
	};
</script>

<div class="w-full h-28 flex items-center justify-between">
	<div class="avatar">
		<div class="w-20 rounded">
			<img
				src={project?.thumbnail
					? getImageUrl(project.collectionId, project.id, project.thumbnail, "80x80")
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${project?.name}`}
				alt="project thumbnail"
			/>
		</div>
	</div>

	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/projects/{project.id}" class="font-semibold text-lg">{project.name}</a>
		<p>{project.tagline}</p>
	</div>

	<div class="flex items-center justify-end w-full">
		<a href="/projects/{project.id}/edit" class="btn btn-outlin">Edit Project</a>
		<Modal label={project.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error ml-2">Delete</span>

			<div slot="heading">
				<h3 class="text-2xl">Delete {project.name}</h3>
				<p class="text-base font-normal mt2">Are you sure want to delete this project?</p>
			</div>

			<div slot="actions" class="flex w-full items-center justify-center space-x-2">
				<label for={project.id} class="btn btn-outline">Cancel</label>

				<form action="?/deleteProject" method="POST" use:enhance={submitDeleteProject}>
					<input type="hidden" name="id" value={project.id} />
					<button type="submit" class="btn btn-error" disabled={loading}>Delete</button>
				</form>
			</div>
		</Modal>
	</div>
</div>
