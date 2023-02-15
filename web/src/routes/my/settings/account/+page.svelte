<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import { Modal, Input } from "$lib/components";
	import type { PageData } from "./$types";

	export let data: PageData;

	let emailModalOpen: boolean = false;
	let usernameModalOpen: boolean = false;
	let loading: boolean = false;

	const submitUpdateEmail: SubmitFunction = () => {
		loading = true;
		emailModalOpen = true;

		return async ({ result }) => {
			switch (result.type) {
				case "success":
					await invalidateAll();
					emailModalOpen = false;
					break;
				case "error":
					break;
				default:
					await applyAction(result);
			}

			loading = false;
		};
	};

	const submitUpdateUsername: SubmitFunction = () => {
		loading = true;
		usernameModalOpen = true;

		return async ({ result }) => {
			switch (result.type) {
				case "success":
					await invalidateAll();
					usernameModalOpen = false;
					break;
				case "error":
					break;
				default:
					await applyAction(result);
			}

			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full-h-full space-y-12">
	<div class="w-full">
		<h3 class="text-wxl font-medium">Change Email</h3>

		<div class="divider" />

		<Modal label="change-email" checked={emailModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Email</span>

			<h3 slot="heading">Change Your email</h3>

			<form action="?/updateEmail" method="POST" use:enhance={submitUpdateEmail} class="space-y-2">
				<Input id="email" type="email" required label="Enter your new email address" disabled={loading} />
				<button type="submit" class="btn btn-primary w-full" disabled={loading}>Change my email</button>
			</form>
		</Modal>
	</div>

	<div class="w-full">
		<h3 class="text-wxl font-medium">Change Username</h3>

		<div class="divider mb-0.5" />

		<Input id="username" label="Username" value={data?.user?.username} disabled />

		<Modal label="change-username" checked={usernameModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Username</span>

			<h3 slot="heading">Change Your Username</h3>

			<form action="?/updateUsername" method="POST" use:enhance={submitUpdateUsername} class="space-y-2">
				<Input id="username" type="text" required label="Enter your new username" disabled={loading} />
				<button type="submit" class="btn btn-primary w-full" disabled={loading}>Change my username</button>
			</form>
		</Modal>
	</div>
</div>
