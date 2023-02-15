import { error } from "@sveltejs/kit";
import type { Actions } from "../$types";

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const data = await request.formData();
		const userAvatar = data.get("avatar");

		if ((userAvatar as Blob).size === 0) {
			data.delete("avatar");
		}
		try {
			await locals.pb.collection("users").update(locals?.user?.id ?? "", data);
		} catch (err) {
			console.log("Error: ", err);
			throw error(400, "Something went wrong updating your profile");
		}

		return {
			success: true
		};
	}
};
