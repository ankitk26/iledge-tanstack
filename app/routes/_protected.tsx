import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "~/components/shared/header";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    const user = context.user;

    console.log(user);

    if (!user) {
      throw redirect({ to: "/login" });
    }

    return { user };
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <Header />
      <main className="w-5/6 mx-auto my-10">
        <Outlet />
      </main>
    </div>
  );
}
