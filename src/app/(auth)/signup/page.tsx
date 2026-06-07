"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/client";
import { signupSchema, type SignupInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
  });

  async function onSubmit(data: SignupInput) {
    if (!isSupabaseConfigured()) {
      setError("root", {
        message: "Supabase is not configured. See /setup for instructions.",
      });
      return;
    }

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { name: data.name },
      },
    });

    if (authError || !authData.user) {
      setError("root", {
        message: authError?.message ?? "Could not create account",
      });
      return;
    }

    const response = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        clinicName: data.clinicName,
        clinicPhone: data.clinicPhone,
        timezone: data.timezone,
      }),
    });

    if (!response.ok) {
      setError("root", { message: "Account created but clinic setup failed" });
      return;
    }

    router.push("/queue");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set up your clinic</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label" htmlFor="clinicName">
              Clinic name
            </label>
            <Input id="clinicName" {...register("clinicName")} />
            {errors.clinicName && (
              <p className="mt-1 text-xs text-status-red">
                {errors.clinicName.message}
              </p>
            )}
          </div>

          <div>
            <label className="form-label" htmlFor="clinicPhone">
              Clinic phone (optional)
            </label>
            <Input id="clinicPhone" type="tel" {...register("clinicPhone")} />
          </div>

          <div>
            <label className="form-label" htmlFor="name">
              Your name
            </label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="mt-1 text-xs text-status-red">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <Input id="email" type="email" autoComplete="email" {...register("email")} />
            {errors.email && (
              <p className="mt-1 text-xs text-status-red">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-status-red">
                {errors.password.message}
              </p>
            )}
          </div>

          <input type="hidden" {...register("timezone")} />

          {errors.root && (
            <p className="text-sm text-status-red">{errors.root.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create clinic account"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand hover:underline">
            Sign in
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
