import type { ServerError } from "$lib/types/types";
import { error } from "@sveltejs/kit";
import type { Actions } from "../$types";

export const actions: Actions = {
	updateEmail: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection("users").requestEmailChange(data.email as string);
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection("users").getFirstListItem(`username = "${data.username}"`);
		} catch (err) {
			if ((err as ServerError).status === 404) {
				try {
					await locals.pb.collection("users").update(locals?.user?.id ?? "", { username: data.username });

					return {
						success: true
					};
				} catch (err) {
					throw error((err as ServerError).data.code, (err as ServerError).data.message);
				}
			}

			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}
	}
};
