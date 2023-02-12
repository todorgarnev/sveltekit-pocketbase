// See https://kit.svelte.dev/docs/types#app

import type { Admin, Record } from "pocketbase";

// for information about these interfaces
declare global {
	namespace App {
		type PocketBase = import("pocketbase").default;
		interface Locals {
			pb: PocketBase;
			user: Record | Admin | null | undefined;
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
