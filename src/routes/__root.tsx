import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

import appCss from "~/app.css?url";
import { Toaster } from "~/components/ui/sonner";
import { queries } from "~/queries";
import { getUser } from "~/server-fns/get-user";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	user: Awaited<ReturnType<typeof getUser>>;
}>()({
	beforeLoad: async ({ context }) => {
		const user = await context.queryClient.fetchQuery(queries.users.me);
		return { user };
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "iledge - Analyze expenses and save",
			},
			{
				name: "color-scheme",
				content: "light dark",
			},
		],
		links: [
			{ rel: "preload", href: appCss, as: "style" },
			{ rel: "stylesheet", href: appCss },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap",
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			<body>
				<NextThemesProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster style={{ fontFamily: "inherit" }} />
				</NextThemesProvider>
				<Scripts />
			</body>
		</html>
	);
}
