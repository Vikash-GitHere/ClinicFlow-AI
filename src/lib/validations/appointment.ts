import { z } from "zod";

export const createPatientSchema = z.object({
  fullName: z.string().min(2, "Patient name is required"),
  dob: z.string().optional(),
  gender: z
    .enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"])
    .optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
});

export const createAppointmentSchema = z.object({
  patientId: z.string().min(1),
  doctorId: z.string().optional(),
  scheduledAt: z.string().min(1, "Appointment time is required"),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum([
    "SCHEDULED",
    "INTAKE_DONE",
    "WAITING",
    "IN_CONSULTATION",
    "COMPLETED",
    "CANCELLED",
  ]),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
