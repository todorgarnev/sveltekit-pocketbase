<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { Modal, Input } from "$lib/components";
	import type { PageData } from "./$types";

	export let data: PageData;

	let emailModalOpen: boolean = false;
	let usernameModalOpen: boolean = false;
</script>

<div class="flex flex-col w-full-h-full space-y-12">
	<div class="w-full">
		<h3 class="text-wxl font-medium">Change Email</h3>

		<div class="divider" />

		<Modal label="change-email" checked={emailModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Email</span>

			<h3 slot="heading">Change Your email</h3>

			<form action="?/updateEmail" method="POST" use:enhance class="space-y-2">
				<Input id="email" type="email" required={true} label="Enter your new email address" />
				<button type="submit" class="btn btn-primary w-full">Change my email</button>
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

			<form action="?/updateUsername" method="POST" use:enhance class="space-y-2">
				<Input id="username" type="text" required={true} label="Enter your new username" />
				<button type="submit" class="btn btn-primary w-full">Change my username</button>
			</form>
		</Modal>
	</div>
</div>
