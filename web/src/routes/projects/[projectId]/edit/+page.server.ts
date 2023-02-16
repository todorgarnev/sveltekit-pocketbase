import { error, redirect } from "@sveltejs/kit";
import { serializeNonPOJOs } from "$lib/utils/utils";
import type { Actions, PageServerLoad } from "./$types";

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
		const data = await request.formData();
		const thumbnail = data.get("thumbnail");

		if ((thumbnail as Blob).size === 0) {
			data.delete("thumbnail");
		}

		try {
			await locals.pb.collection("projects").update(params.projectId, data);
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
