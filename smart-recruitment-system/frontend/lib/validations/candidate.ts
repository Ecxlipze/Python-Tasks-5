import { z } from "zod";

export const candidateSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  experience: z.coerce.number().min(0, "Experience must be 0 or greater"),
  education: z.string().trim().min(1, "Education is required"),
});

export type CandidateFormValues = z.infer<typeof candidateSchema>;
