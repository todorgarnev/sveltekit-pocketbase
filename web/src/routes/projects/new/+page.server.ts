import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, "/login");
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();
		const thumbnail = body.get("thumbnail");

		if ((thumbnail as Blob).size === 0) {
			body.delete("thumbnail");
		}

		body.append("user", locals?.user?.id ?? "");

		try {
			await locals.pb.collection("projects").create(body);
		} catch (err) {
			console.log("Error: ", err);
			throw error(500, "Something went wrong");
		}

		throw redirect(303, "/");
	}
};
