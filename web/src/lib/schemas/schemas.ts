import { z } from "zod";

export const loginUserSchema = z.object({
	email: z.string().email({ message: "Email must be a valid email." }),
	password: z.string().min(1, { message: "Password is required" })
});
