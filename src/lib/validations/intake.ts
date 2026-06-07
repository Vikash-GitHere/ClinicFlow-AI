import { z } from "zod";

export const intakePersonalSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
});

export const intakeMedicalSchema = z.object({
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalHistory: z.string().optional(),
});

export const intakeVisitSchema = z.object({
  chiefComplaint: z.string().min(3, "Describe your main concern"),
  painLevel: z.number().min(0).max(10),
  symptomDuration: z.string().min(1, "How long have you had symptoms?"),
});

export const intakeConsentSchema = z.object({
  consentSigned: z
    .boolean()
    .refine((value) => value === true, "You must agree to continue"),
  signatureData: z.string().min(1, "Signature is required"),
});

export const intakeFormSchema = intakePersonalSchema
  .merge(intakeMedicalSchema)
  .merge(intakeVisitSchema)
  .merge(intakeConsentSchema);

export type IntakeFormInput = z.infer<typeof intakeFormSchema>;
