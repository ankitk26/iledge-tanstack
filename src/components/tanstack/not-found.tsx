import { AlertTriangleIcon } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center">
			<AlertTriangleIcon className="size-32" />
			<h1 className="text-center text-xl font-semibold">
				Page not found
			</h1>
		</div>
	);
}
