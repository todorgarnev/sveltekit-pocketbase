import { error } from "@sveltejs/kit";
import { serializeNonPOJOs } from "$lib/utils/utils";
import type { PageServerLoad } from "./$types";
import type { ServerError } from "$lib/types/types";

export const load: PageServerLoad = ({ locals }) => {
	const gerProjects = async () => {
		try {
			const projects = serializeNonPOJOs(await locals.pb.collection("projects").getFullList(undefined));
			return projects;
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}
	};

	return { projects: gerProjects() };
};
