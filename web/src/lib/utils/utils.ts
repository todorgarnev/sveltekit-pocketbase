import type { Admin, Record } from "pocketbase";

export const serializeNonPOJOs = (obj: Record | Admin | null) => {
	return structuredClone(obj);
};
