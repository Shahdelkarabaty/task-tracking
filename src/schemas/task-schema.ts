import * as zod from "zod";

export const taskSchema = zod.object({
  title: zod.string().min(1, { message: "Title is required" }),
  deadline: zod
    .string()
    .min(1, { message: "Deadline is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format. Use YYYY-MM-DD.",
    }),
  status: zod.enum(["todo", "in_progress", "done"], {
    message: "Invalid status",
  }),
});
