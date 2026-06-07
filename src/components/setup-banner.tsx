import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/env";

export function SetupBanner() {
  if (isSupabaseConfigured()) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-900">
      <strong>Setup required:</strong> Add your Supabase URL and anon key to{" "}
      <code className="rounded bg-amber-100 px-1">.env</code>, then restart the
      dev server.{" "}
      <Link href="/setup" className="font-medium underline">
        View setup guide
      </Link>
    </div>
  );
}
