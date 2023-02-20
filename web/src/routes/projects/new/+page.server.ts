import { error, fail, redirect } from "@sveltejs/kit";
import { serialize } from "object-to-formdata";
import { createProjectSchema } from "$lib/schemas/schemas";
import { validateData } from "$lib/utils/utils";
import type { Actions, PageServerLoad } from "./$types";
import type { ServerError } from "$lib/types/types";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, "/login");
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();
		const thumb = body.get("thumbnail");

		if ((thumb as Blob).size === 0) {
			body.delete("thumbnail");
		}

		body.append("user", locals?.user?.id ?? "");

		const { formData, errors } = await validateData(body, createProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection("projects").create(serialize(formData));
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}

		throw redirect(303, "/my/projects");
	}
};
