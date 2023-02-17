import { z } from "zod";

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
				code: z.ZodIssueCode.custom,
				message: "Password and Confirm password must match",
				path: ["password"]
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Password and Confirm password must match",
				path: ["passwordConfirm"]
			});
		}
	});
