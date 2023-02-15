import { error } from "@sveltejs/kit";
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
			console.log("Error: ", err);
			throw error(500, "Something went wrong");
		}
	}
};
