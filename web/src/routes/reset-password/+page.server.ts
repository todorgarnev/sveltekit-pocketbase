import { error } from "@sveltejs/kit";
import type { ServerError } from "$lib/types/types";
import type { Actions } from "./$types";

export const actions: Actions = {
	resetPassword: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection("users").requestPasswordReset(body.email as string);
			return {
				success: true
			};
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}
	}
};
