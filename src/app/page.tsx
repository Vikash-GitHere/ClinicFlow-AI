import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const features = [
  {
    title: "Patient Intake",
    description:
      "Mobile-first intake forms sent via link. Patients complete paperwork before they arrive.",
  },
  {
    title: "Live Queue Board",
    description:
      "Kanban-style queue for receptionists. Real-time updates as patients check in and move through.",
  },
  {
    title: "AI SOAP Notes",
    description:
      "Turn consultation notes into structured SOAP documentation in seconds. Edit before saving.",
  },
  {
    title: "Visit Summaries",
    description:
      "Generate professional PDF summaries for patients with one click.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Logo />
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary hover:text-text"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-5xl px-5 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-light px-3 py-1 text-xs font-semibold text-brand-dark">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Built for small clinics
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Finish consultation docs in{" "}
            <span className="text-brand">under 60 seconds</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-text-secondary">
            ClinicFlow AI digitizes patient intake, appointment queues, and SOAP
            notes — so doctors spend less time on paperwork and more time with
            patients.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              Start free setup
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-muted px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-border"
            >
              Sign in
            </Link>
          </div>
        </section>

        <section className="border-t border-border bg-surface">
          <div className="mx-auto grid max-w-5xl gap-6 px-5 py-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border p-6 shadow-card"
              >
                <h3 className="text-base font-semibold text-text">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-text-muted">
        ClinicFlow AI — Workflow tool for small clinics. Not an EMR.
      </footer>
    </div>
  );
}
