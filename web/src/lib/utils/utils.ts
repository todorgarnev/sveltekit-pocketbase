import type { User } from "../types/types";

const { randomBytes } = await import("node:crypto");

export const serializeNonPOJOs = (obj: User): User => {
	return structuredClone(obj);
};

export const generateUsername = (name: string): string => {
	const id: string = randomBytes(2).toString("hex");
	return `${name.slice(0, 5)}${id}`;
};

export const getImageUrl = (collectionId: string, recordId: string, fileName: string, size = "0x0") => {
	return `http://localhost:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};
