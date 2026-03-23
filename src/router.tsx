import { SpinnerIcon } from "@phosphor-icons/react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import NotFound from "./components/tanstack/not-found";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const queryClient = new QueryClient();

	const router = createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		context: { queryClient, user: null },
		defaultPreload: "intent",
		defaultPendingComponent: () => (
			<div className="flex h-full w-full items-center justify-center">
				<SpinnerIcon className="animate-spin" />
			</div>
		),
		defaultNotFoundComponent: NotFound,
	});

	return routerWithQueryClient(router, queryClient);
}
