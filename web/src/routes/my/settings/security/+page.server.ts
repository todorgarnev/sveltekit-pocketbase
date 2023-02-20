import type { ServerError } from "$lib/types/types";
import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	updatePassword: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection("users").update(locals?.user?.id ?? "", data);
			locals.pb.authStore.clear();
		} catch (err) {
			throw error((err as ServerError).data.code, (err as ServerError).data.message);
		}
	}
};
