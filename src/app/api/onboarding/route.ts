import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { signupSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = signupSchema
    .pick({
      name: true,
      email: true,
      clinicName: true,
      clinicPhone: true,
      timezone: true,
    })
    .safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existing = await prisma.staff.findUnique({
    where: { authId: user.id },
  });

  if (existing) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, clinicName, clinicPhone, timezone } = parsed.data;

  await prisma.$transaction(async (tx) => {
    const clinic = await tx.clinic.create({
      data: {
        name: clinicName,
        phone: clinicPhone,
        timezone,
      },
    });

    await tx.staff.create({
      data: {
        clinicId: clinic.id,
        authId: user.id,
        name,
        email,
        role: "ADMIN",
      },
    });
  });

  return NextResponse.json({ ok: true });
}
