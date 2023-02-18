import type { ZodError, Schema } from "zod";

const { randomBytes } = await import("node:crypto");

export const serializeNonPOJOs = (obj: any) => {
	return structuredClone(obj);
};

export const generateUsername = (name: string): string => {
	const id: string = randomBytes(2).toString("hex");
	return `${name.slice(0, 5)}${id}`;
};

export const getImageUrl = (collectionId: string, recordId: string, fileName: string, size = "0x0") => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const validateData = async (formData: FormData, schema: Schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);

		return {
			formData: data as Record<string, string>,
			errors: null
		};
	} catch (err) {
		const errors = (err as ZodError).flatten();

		return {
			formData: body as Record<string, string>,
			errors: errors.fieldErrors
		};
	}
};
