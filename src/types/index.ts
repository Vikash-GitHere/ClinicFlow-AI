import type {
  Appointment,
  AppointmentStatus,
  Clinic,
  IntakeForm,
  Patient,
  Staff,
  StaffRole,
  VisitNote,
} from "@prisma/client";

export type {
  Appointment,
  AppointmentStatus,
  Clinic,
  IntakeForm,
  Patient,
  Staff,
  StaffRole,
  VisitNote,
};

export type AppointmentWithRelations = Appointment & {
  patient: Patient;
  doctor: Staff | null;
  intakeForm: IntakeForm | null;
  visitNote: VisitNote | null;
};

export type StaffSession = Staff & {
  clinic: Clinic;
};

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  SCHEDULED: "Scheduled",
  INTAKE_DONE: "Intake Done",
  WAITING: "Waiting",
  IN_CONSULTATION: "In Consultation",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const QUEUE_COLUMNS: AppointmentStatus[] = [
  "SCHEDULED",
  "WAITING",
  "IN_CONSULTATION",
  "COMPLETED",
];

export const ROLE_LABELS: Record<StaffRole, string> = {
  ADMIN: "Admin",
  DOCTOR: "Doctor",
  RECEPTIONIST: "Receptionist",
};
