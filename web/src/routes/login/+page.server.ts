import { error, fail, redirect } from "@sveltejs/kit";
import { validateData } from "$lib/utils/utils";
import { loginUserSchema } from "$lib/schemas/schemas";
import type { ServerError } from "$lib/types/types";
import type { Actions } from "./$types";

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		try {
			await locals.pb.collection("users").authWithPassword(formData.email, formData.password);

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();

				return {
					notVerified: true
				};
			}
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}

		throw redirect(303, "/");
	}
};
