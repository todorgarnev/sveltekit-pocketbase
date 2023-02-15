import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, "/");
	}
};

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
