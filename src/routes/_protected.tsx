import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Header from "@/components/shared/header";

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
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="mx-auto my-10 flex w-11/12 grow flex-col lg:w-5/6">
				<Outlet />
			</main>
		</div>
	);
}
