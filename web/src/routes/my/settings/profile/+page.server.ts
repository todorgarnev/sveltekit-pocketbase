import { error, fail, redirect } from "@sveltejs/kit";
import { serialize } from "object-to-formdata";
import { updateProfileSchema } from "$lib/schemas/schemas";
import { validateData } from "$lib/utils/utils";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, "/login");
	}
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const body = await request.formData();
		const userAvatar = body.get("avatar");

		if ((userAvatar as Blob).size === 0) {
			body.delete("avatar");
		}

		const { formData, errors } = await validateData(body, updateProfileSchema);
		const { avatar, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors
			});
		}

		console.log("formData >>", formData);

		try {
			await locals.pb.collection("users").update(locals?.user?.id ?? "", serialize(formData));
		} catch (err) {
			console.log("Error: ", err);
			throw error(400, "Something went wrong updating your profile");
		}

		return {
			success: true
		};
	}
};
