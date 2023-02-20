import { error } from "@sveltejs/kit";
import { serializeNonPOJOs } from "$lib/utils/utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
	const gerProjects = async () => {
		try {
			const projects = serializeNonPOJOs(await locals.pb.collection("projects").getFullList(undefined));
			return projects;
		} catch (err) {
			console.log("Error: ", error);
			throw error(500, "Something went wrong");
		}
	};

	return { projects: gerProjects() };
};
