import { z } from "zod";

export const SubmissionSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  companyName: z.string().optional(),
  industry: z.string().optional(),
  productIdea: z.string().optional(),

  monthlybudget: z.object({
    min: z.number(),
    max: z.number(),
  }),

  estimateTimeline: z.object({
    min: z.number(),
    max: z.number(),
  }),

  selectedTime: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),

  scheduling_url: z.string().optional(),
});

export type SubmissionInput = z.infer<typeof SubmissionSchema>;
