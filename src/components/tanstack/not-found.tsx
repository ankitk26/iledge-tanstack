import { WarningIcon } from "@phosphor-icons/react";

export default function NotFound() {
	return (
		<div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center">
			<WarningIcon className="size-32" />
			<h1 className="text-center text-xl font-semibold">Page not found</h1>
		</div>
	);
}
