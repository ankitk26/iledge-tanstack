import { useNavigate } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { authUserQuery } from "~/queries/get-user";

export default function User() {
  const { data, error, isPending } = useQuery(authUserQuery);
  const navigate = useNavigate();

  if (isPending) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <Button
        onClick={async () => {
          await authClient.signOut();
          navigate({ to: "/login" });
        }}
      >
        Log out
      </Button>
      <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
    </div>
  );
}
