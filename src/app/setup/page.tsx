import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Create a Supabase project",
    body: (
      <>
        Go to{" "}
        <a
          href="https://supabase.com/dashboard"
          className="text-brand underline"
          target="_blank"
          rel="noreferrer"
        >
          supabase.com/dashboard
        </a>{" "}
        and create a free project.
      </>
    ),
  },
  {
    title: "Copy API keys",
    body: (
      <>
        In your project: <strong>Settings → API</strong>. Copy the Project URL
        and the <code className="text-xs">anon</code> public key.
      </>
    ),
  },
  {
    title: "Update .env",
    body: (
      <pre className="mt-2 overflow-x-auto rounded-lg bg-surface-muted p-3 text-xs">
{`NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
DATABASE_URL="postgresql://postgres.xxxx:..."
DIRECT_URL="postgresql://postgres.xxxx:..."`}
      </pre>
    ),
  },
  {
    title: "Push schema & restart",
    body: (
      <>
        Run <code className="text-xs">npm run db:push</code>, then restart with{" "}
        <code className="text-xs">npm run dev</code>.
      </>
    ),
  },
];

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <header className="border-b border-border bg-surface px-5 py-4">
        <Logo />
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10">
        <h1 className="text-2xl font-bold text-text">Local setup</h1>
        <p className="mt-2 text-sm text-text-secondary">
          ClinicFlow AI needs Supabase for auth and the database. This takes
          about 5 minutes.
        </p>

        <div className="mt-8 space-y-4">
          {steps.map((step, index) => (
            <Card key={step.title}>
              <CardHeader>
                <CardTitle>
                  {index + 1}. {step.title}
                </CardTitle>
              </CardHeader>
              <CardBody className="text-sm text-text-secondary">
                {step.body}
              </CardBody>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-text-muted">
          <Link href="/" className="text-brand hover:underline">
            ← Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
