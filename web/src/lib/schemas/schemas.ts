import { z, ZodIssueCode, type RefinementCtx } from "zod";

export const loginUserSchema = z.object({
	email: z.string().email({ message: "Email must be a valid email" }),
	password: z.string().min(1, { message: "Password is required" })
});

export const registerUserSchema = z
	.object({
		name: z
			.string()
			.regex(/^[a-zA-Z\s]*$/, { message: "Name can only contain letters and spaces" })
			.min(2, { message: "Name must be at least 2 characters" })
			.max(64, { message: "Name must be less than 64 characters" })
			.trim(),
		email: z.string().email({ message: "Email must be a valid email" }),
		password: z
			.string()
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					"Password must be a minimum of 8 characters and contain at least one letter, one number and one special character"
			})
			.trim(),
		passwordConfirm: z
			.string()
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					"Confirm Password must be a minimum of 8 characters and contain at least one letter, one number and one special character"
			})
			.trim()
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: ZodIssueCode.custom,
				message: "Password and Confirm password must match",
				path: ["password"]
			});
			ctx.addIssue({
				code: ZodIssueCode.custom,
				message: "Password and Confirm password must match",
				path: ["passwordConfirm"]
			});
		}
	});

const imageTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];

export const createProjectSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Name is required" })
		.max(64, { message: "Name must be 64 characters or less" })
		.trim(),
	tagline: z
		.string()
		.min(1, { message: "Tagline is required" })
		.max(64, { message: "Tagline must be 64 characters or less" })
		.trim(),
	url: z.string().url({ message: "URL must be a valid URL" }),
	description: z
		.string()
		.min(1, { message: "Description is required" })
		.max(512, { message: "Description must be 512 characters or less" })
		.trim(),
	thumbnail: z
		.instanceof(Blob)
		.optional()
		.superRefine((val: Blob | undefined, ctx: RefinementCtx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: ZodIssueCode.custom,
						message: "Thumbnail must be less  than 5MB"
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: ZodIssueCode.custom,
						message: "Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif"
					});
				}
			}
		}),
	user: z.string({ required_error: "User is required" })
});

export const editProjectSchema = createProjectSchema.omit({ user: true });

export const updateEmailSchema = z.object({
	email: z.string().email({ message: "Email must be a valid email" })
});

export const updateUsernameSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" })
		.max(24, { message: "Username must be 24 characters or less" })
		.regex(/^[a-zA-Z0-9]*$/, { message: "Username can only contain letters or numbers" })
});
