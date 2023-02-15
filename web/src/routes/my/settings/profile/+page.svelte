<script lang="ts">
	import { enhance } from "$app/forms";
	import { Icon, Pencil } from "svelte-hero-icons";
	import { Input } from "$lib/components";
	import type { PageData } from "./$types";

	export let data: PageData;

	let preview: HTMLImageElement;

	const showPreview = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (files && files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			preview.src = src;
		}
	};
</script>

<div class="flex flex-col w-full h-full">
	<form action="?/updateProfile" method="POST" class="flex flex-col space-y-2 w-full" use:enhance>
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
					<img src="https://i.pravatar.cc/128" alt="user avatar" bind:this={preview} />
				</div>
			</label>

			<input type="file" name="avatar" id="avatar" value="" accept="image/*" hidden on:change={showPreview} />
		</div>

		<Input id="name" label="Name" value={data?.user?.name} />

		<div class="w-full max-w-lg-pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit">Update Profile</button>
		</div>
	</form>
</div>
