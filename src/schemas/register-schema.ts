import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const registerSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email("Must be a valid email")
      .min(6, "Password must be at least 6 characters."),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "This is required"),
  })
);
