import { isSupabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import type { StaffSession } from "@/types";

export async function getSession(): Promise<StaffSession | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const staff = await prisma.staff.findUnique({
    where: { authId: user.id },
    include: { clinic: true },
  });

  return staff;
}

export async function requireSession(): Promise<StaffSession> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
