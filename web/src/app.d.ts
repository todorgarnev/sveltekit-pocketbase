// See https://kit.svelte.dev/docs/types#app

import type { User } from "$lib/types/types";

// for information about these interfaces
declare global {
	namespace App {
		type PocketBase = import("pocketbase").default;
		interface Locals {
			pb: PocketBase;
			user: User;
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
