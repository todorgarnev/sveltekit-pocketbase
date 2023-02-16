import { serializeNonPOJOs } from "$lib/utils/utils";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, "/login");
	}

	const getUserProjects = async (userId: number) => {
		try {
			const projects = serializeNonPOJOs(
				await locals.pb.collection("projects").getFullList(undefined, {
					filter: `user = "${userId}"`
				})
			);

			return projects;
		} catch (err) {
			console.log("Error: ", err);
			throw error(400, "Something went wrong");
		}
	};

	return {
		projects: getUserProjects(locals.user.id)
	};
};

export const actions: Actions = {
	deleteProject: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection("projects").delete(id as string);
		} catch (err) {
			console.log("Error: ", err);
			throw error(400, "Something went wrong");
		}

		return {
			success: true
		};
	}
};
