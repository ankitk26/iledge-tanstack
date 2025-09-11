import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import PayeeList from "~/components/admin/payee-list";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { queries } from "~/queries";

export const Route = createFileRoute("/_protected/admin")({
  loader: ({ context }) => {
    const user = context.user;
    if (user.role !== "admin") {
      throw redirect({ to: "/" });
    }
    context.queryClient.prefetchQuery(queries.payees.all);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Manage payees</h1>
      <Suspense
        fallback={Array.from({ length: 5 }).map((_, index) => (
          <Card className="p-4" key={index + "_category_skeleton"}>
            <div className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-full" />

              <div className="flex flex-col w-full items-start gap-2">
                <Skeleton className="w-1/2 h-5" />
                <Skeleton className="w-1/4 h-5" />
              </div>
            </div>
          </Card>
        ))}
      >
        <PayeeList />
      </Suspense>
    </div>
  );
}
