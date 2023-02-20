import type { ServerError } from "$lib/types/types";
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
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
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
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}

		return {
			success: true
		};
	}
};
