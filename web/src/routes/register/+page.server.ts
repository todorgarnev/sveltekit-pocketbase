import { error, redirect } from "@sveltejs/kit";
import { generateUsername } from "$lib/utils/utils";
import type { Actions } from "./$types";

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		const username: string = generateUsername((body.name as string).split(" ").join("")).toLowerCase();

		try {
			await locals.pb.collection("users").create({ username, ...body });
			await locals.pb.collection("users").requestVerification(body.email as string);
		} catch (err) {
			console.log(err);
			throw error(500, "Something went wrong");
		}

		throw redirect(303, "/login");
	}
};
