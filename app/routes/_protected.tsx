import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "~/components/shared/header";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    const user = context.user;

    if (!user) {
      throw redirect({ to: "/login" });
    }

    return { user };
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="w-11/12 lg:w-5/6 mx-auto my-10 grow flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
