import { getSession } from "@/lib/auth";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

export default async function QueuePage() {
  const session = await getSession();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text">Queue Board</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {session?.clinic.name} — today&apos;s appointments
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming in Phase 2</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-text-secondary">
            The Kanban queue board with realtime updates, patient search, and
            appointment creation will be built in the next phase.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
