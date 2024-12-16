import * as zod from "zod";

export const authSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, "Your Password must be at least 6 characters"),
});
