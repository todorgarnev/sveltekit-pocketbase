import { error } from "@sveltejs/kit";
import type { ServerError } from "$lib/types/types";
import { serializeNonPOJOs } from "$lib/utils/utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
	const getProject = async (projectId: string) => {
		try {
			const project = serializeNonPOJOs(await locals.pb.collection("projects").getOne(projectId));
			return project;
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}
	};

	return {
		project: getProject(params.projectId)
	};
};
