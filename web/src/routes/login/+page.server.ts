import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection("users").authWithPassword(body.email as string, body.password as string);

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();

				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log(err);
			throw error(500, "Something went wrong");
		}

		throw redirect(303, "/");
	}
};
