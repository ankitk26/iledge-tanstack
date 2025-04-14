import { createFileRoute } from "@tanstack/react-router";
import User from "~/components/home/user";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <User />
    </div>
  );
}
