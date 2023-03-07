import { error, fail } from "@sveltejs/kit";
import { serialize } from "object-to-formdata";
import { serializeNonPOJOs, validateData } from "$lib/utils/utils";
import type { Actions, PageServerLoad } from "./$types";
import { editProjectSchema } from "$lib/schemas/schemas";
import type { ServerError } from "$lib/types/types";

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, "Unauthorized");
	}

	try {
		const project = serializeNonPOJOs(await locals.pb.collection("projects").getOne(params.projectId));

		if (project && locals.user.id === project.user) {
			return { project };
		} else {
			throw error(403, "Forbidden");
		}
	} catch (err) {
		throw error((err as ServerError).data.code, (err as ServerError).data.message);
	}
};

export const actions: Actions = {
	updateProject: async ({ request, locals, params }) => {
		const body = await request.formData();
		const thumb = body.get("thumbnail");

		if ((thumb as Blob).size === 0) {
			body.delete("thumbnail");
		}

		const { formData, errors } = await validateData(body, editProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors
			});
		}

		try {
			await locals.pb.collection("projects").update(params.projectId, serialize(formData));
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection("projects").update(params.projectId, { thumbnail: null });
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}

		return {
			success: true
		};
	}
};
