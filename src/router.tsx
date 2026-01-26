import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { Loader2Icon } from "lucide-react";
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
      <div className="flex items-center justify-center w-full h-full">
        <Loader2Icon className="animate-spin" />
      </div>
    ),
    defaultNotFoundComponent: NotFound,
  });

  return routerWithQueryClient(router, queryClient);
}
