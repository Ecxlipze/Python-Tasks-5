import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  company: z.string().trim().min(1, "Company is required"),
  location: z.string().trim().min(1, "Location is required"),
  description: z.string().trim().min(1, "Description is required"),
});

export type JobFormValues = z.infer<typeof jobSchema>;
