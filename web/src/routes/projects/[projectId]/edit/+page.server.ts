import { error, fail, redirect } from "@sveltejs/kit";
import { serialize } from "object-to-formdata";
import { serializeNonPOJOs, validateData } from "$lib/utils/utils";
import type { Actions, PageServerLoad } from "./$types";
import { editProjectSchema } from "$lib/schemas/schemas";

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
		console.log("Error: ", err);
		throw error(500, "Something went wrong");
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
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection("projects").update(params.projectId, serialize(formData));
		} catch (err) {
			console.log("Error: ", err);
			throw error(400, "Something went wrong");
		}

		throw redirect(303, "/my/projects");
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection("projects").update(params.projectId, { thumbnail: null });
		} catch (err) {
			console.log("Error: ", err);
			throw error(400, "Something went wrong");
		}

		return {
			success: true
		};
	}
};
