import type { User } from "../types/types";

export const serializeNonPOJOs = (obj: User) => {
	return structuredClone(obj);
};
