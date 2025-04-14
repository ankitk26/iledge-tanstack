import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    const user = context.user;

    console.log(user);

    if (!user) {
      throw redirect({ to: "/login" });
    }

    return { user };
  },
});
