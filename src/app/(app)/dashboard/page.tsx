import { getSession } from "@/lib/auth";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text">Doctor Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Welcome, Dr. {session?.name.split(" ")[0]}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming in Phase 3</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-text-secondary">
            The patient workspace with intake review, SOAP notes, and AI
            generation will be built in Phase 3.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
