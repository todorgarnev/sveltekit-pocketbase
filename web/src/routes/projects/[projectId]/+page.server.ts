import { serializeNonPOJOs } from "$lib/utils/utils";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
	const getProject = async (projectId: string) => {
		try {
			const project = serializeNonPOJOs(await locals.pb.collection("projects").getOne(projectId));
			return project;
		} catch (err) {
			console.log("Error: ", err);
			throw error(500, "Something went wrong");
		}
	};

	return {
		project: getProject(params.projectId)
	};
};
