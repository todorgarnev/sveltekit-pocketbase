export type Project = {
	collectionId: string;
	collectionName: string;
	created: string;
	description: string;
	id: string;
	name: string;
	tagline: string;
	thumbnail: string;
	updated: string;
	url: string;
	user: string;
};

export type ServerError = {
	url: string;
	status: number;
	data: {
		code: number;
		message: string;
	};
	isAbort: boolean;
	originalError: Error | null;
};
