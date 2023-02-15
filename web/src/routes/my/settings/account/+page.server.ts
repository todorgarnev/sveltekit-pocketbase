import { error } from "@sveltejs/kit";
import type { Actions } from "../$types";

export const actions: Actions = {
	updateEmail: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection("users").requestEmailChange(data.email as string);
		} catch (err) {
			throw error(400, "Something went wrong updating your email");
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
			if ((err as { status: number; body: string }).status === 404) {
				try {
					await locals.pb.collection("users").update(locals?.user?.id ?? "", { username: data.username });

					return {
						success: true
					};
				} catch (err) {
					console.log("Error", err);
					throw error(400, "Something went wrong updating your username");
				}
			}

			console.log("Error", err);
			throw error(400, "Something went wrong updating your username");
		}
	}
};
