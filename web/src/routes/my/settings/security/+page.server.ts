import { error, fail, redirect } from "@sveltejs/kit";
import { updatePasswordSchema } from "$lib/schemas/schemas";
import { validateData } from "$lib/utils/utils";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, "/login");
	}
};

export const actions: Actions = {
	updatePassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updatePasswordSchema);

		if (errors) {
			return fail(400, {
				errors
			});
		}

		try {
			await locals.pb.collection("users").update(locals?.user?.id ?? "", formData);
			locals.pb.authStore.clear();
		} catch (err) {
			console.log("Error: ", err);
			throw error(400, "Something went wrong updating your password");
		}
	}
};
