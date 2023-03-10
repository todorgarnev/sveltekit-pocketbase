<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import { Icon, Pencil } from "svelte-hero-icons";
	import toast from "svelte-french-toast";
	import { Input } from "$lib/components";
	import { getImageUrl } from "$lib/utils/utils";
	import type { ActionData, PageData } from "./$types";

	export let data: PageData;
	export let form: ActionData;

	let preview: HTMLImageElement;
	let loading: boolean = false;

	const showPreview = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (files && files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			preview.src = src;
		}
	};

	const submitUpdateProfile: SubmitFunction = () => {
		loading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case "success":
					toast.success("Name updated successfully!");
					await invalidateAll();
					break;
				case "error":
					toast.error(result.error.message);
					break;
				default:
					await update();
			}

			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full">
	<form
		action="?/updateProfile"
		method="POST"
		class="flex flex-col space-y-2 w-full"
		enctype="multipart/form-data"
		use:enhance={submitUpdateProfile}
	>
		<h3 class="text-2xl font-medium">Update Profile</h3>

		<div class="form-control w-full max-w-lg">
			<label for="avatar" class="label font-medium pb-1">
				<span class="label-text">Profile Picture</span>
			</label>

			<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
				<label for="avatar" class="absolute -bottom-0 5 -right-0 5 hover:cursor-pointer">
					<span class="btn btn-circle btn-sm btn-secondary">
						<Icon src={Pencil} size="16" />
					</span>
				</label>

				<div class="w-32 rounded-full">
					<img
						src={data?.user?.avatar
							? getImageUrl(data.user.collectionId, data.user.id, data.user.avatar)
							: `https://ui-avatars.com/api/?name${data.user?.name}"} alt="user avatar`}
						alt="user avatar"
						bind:this={preview}
					/>
				</div>
			</label>

			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				disabled={loading}
				hidden
				on:change={showPreview}
			/>

			{#if form?.errors?.avatar}
				{#each form?.errors?.avatar as error}
					<label for="avatar" class="label py-0pt-1">
						<span class="label-text-alt text-error">
							{error}
						</span>
					</label>
				{/each}
			{/if}
		</div>

		<Input
			id="name"
			label="Name"
			value={form?.data?.name ?? data?.user?.name}
			disabled={loading}
			errors={form?.errors?.name}
		/>

		<div class="w-full max-w-lg-pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>Update Profile</button>
		</div>
	</form>
</div>
