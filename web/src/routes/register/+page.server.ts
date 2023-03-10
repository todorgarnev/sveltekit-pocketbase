import { error, fail, redirect } from "@sveltejs/kit";
import { generateUsername, validateData } from "$lib/utils/utils";
import { registerUserSchema } from "$lib/schemas/schemas";
import type { Actions } from "./$types";
import type { ServerError } from "$lib/types/types";

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		const username: string = generateUsername((formData.name as string).split(" ").join("")).toLowerCase();

		try {
			await locals.pb.collection("users").create({ username, ...formData });
			await locals.pb.collection("users").requestVerification(formData.email);
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}

		throw redirect(303, "/login");
	}
};
