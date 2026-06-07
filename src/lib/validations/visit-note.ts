import { z } from "zod";

export const visitNoteSchema = z.object({
  transcript: z.string().optional(),
  subjective: z.string().optional(),
  objective: z.string().optional(),
  assessment: z.string().optional(),
  plan: z.string().optional(),
});

export const generateSoapSchema = z.object({
  transcript: z
    .string()
    .min(10, "Enter consultation notes or transcript (min 10 characters)"),
});

export const soapResponseSchema = z.object({
  subjective: z.string(),
  objective: z.string(),
  assessment: z.string(),
  plan: z.string(),
});

export type VisitNoteInput = z.infer<typeof visitNoteSchema>;
export type SoapResponse = z.infer<typeof soapResponseSchema>;
