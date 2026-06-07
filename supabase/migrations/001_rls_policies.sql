-- ClinicFlow AI: Row Level Security policies
-- Run this in Supabase SQL Editor after Prisma migrations

-- Enable RLS on all tables
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_notes ENABLE ROW LEVEL SECURITY;

-- Helper: get clinic_id for authenticated staff member
CREATE OR REPLACE FUNCTION auth_clinic_id()
RETURNS TEXT AS $$
  SELECT "clinicId"::text
  FROM staff
  WHERE "authId" = auth.uid()::text
  LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Clinics: staff can read their own clinic
CREATE POLICY "staff_read_own_clinic" ON clinics
  FOR SELECT USING (id = auth_clinic_id());

CREATE POLICY "staff_update_own_clinic" ON clinics
  FOR UPDATE USING (id = auth_clinic_id());

-- Staff: members can read staff in their clinic
CREATE POLICY "staff_read_clinic_members" ON staff
  FOR SELECT USING ("clinicId" = auth_clinic_id());

-- Patients: clinic-scoped CRUD for authenticated staff
CREATE POLICY "staff_manage_patients" ON patients
  FOR ALL USING ("clinicId" = auth_clinic_id())
  WITH CHECK ("clinicId" = auth_clinic_id());

-- Appointments: clinic-scoped for staff
CREATE POLICY "staff_manage_appointments" ON appointments
  FOR ALL USING ("clinicId" = auth_clinic_id())
  WITH CHECK ("clinicId" = auth_clinic_id());

-- Intake forms: staff can read; public insert via service role API only
CREATE POLICY "staff_read_intake_forms" ON intake_forms
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM appointments a
      WHERE a.id = intake_forms."appointmentId"
        AND a."clinicId" = auth_clinic_id()
    )
  );

CREATE POLICY "staff_update_intake_forms" ON intake_forms
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM appointments a
      WHERE a.id = intake_forms."appointmentId"
        AND a."clinicId" = auth_clinic_id()
    )
  );

-- Visit notes: clinic-scoped for staff
CREATE POLICY "staff_manage_visit_notes" ON visit_notes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM appointments a
      WHERE a.id = visit_notes."appointmentId"
        AND a."clinicId" = auth_clinic_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM appointments a
      WHERE a.id = visit_notes."appointmentId"
        AND a."clinicId" = auth_clinic_id()
    )
  );

-- Realtime: enable for appointments table (queue board)
ALTER PUBLICATION supabase_realtime ADD TABLE appointments;

-- Storage bucket for visit summary PDFs (create via Supabase dashboard or API)
-- Bucket name: visit-summaries
-- Policy: staff can read/write files in their clinic folder
