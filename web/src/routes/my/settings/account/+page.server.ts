import { error, fail, redirect } from "@sveltejs/kit";
import { updateEmailSchema, updateUsernameSchema } from "$lib/schemas/schemas";
import { validateData } from "$lib/utils/utils";
import type { PageServerLoad, Actions } from "./$types";
import type { ServerError } from "$lib/types/types";

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, "/login");
	}
};

export const actions: Actions = {
	updateEmail: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateEmailSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		try {
			await locals.pb.collection("users").requestEmailChange(formData.email);
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateUsernameSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		try {
			await locals.pb.collection("users").getFirstListItem(`username = "${formData.username}"`);
		} catch (err) {
			if ((err as ServerError).status === 404) {
				try {
					await locals.pb.collection("users").update(locals?.user?.id ?? "", { username: formData.username });

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
