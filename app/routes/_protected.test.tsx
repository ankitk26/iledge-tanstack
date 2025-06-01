import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { getMailIds } from "~/server-fns/get-mails";

export const Route = createFileRoute("/_protected/test")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["mails"],
    queryFn: () => getMailIds(),
  });

  if (isPending) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>{JSON.stringify(error, null, 4)}</p>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <Button onClick={() => refetch()}>Refetch</Button>
    </div>
  );
}
