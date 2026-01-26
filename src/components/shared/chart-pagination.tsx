import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PaginationState, usePaginationControls } from "@/store/use-pagination";

export default function ChartPagination({
	paginationInstanceId,
	config,
}: {
	paginationInstanceId: string;
	config?: Partial<PaginationState>;
}) {
	const {
		navigateMostOld,
		navigatePrevious,
		navigateNext,
		navigateMostRecent,
		isAtMostOld,
		isAtMostRecent,
		canGoToOlder,
		canGoToNewer,
		startItem,
		endItem,
		totalItems,
	} = usePaginationControls(paginationInstanceId, config);

	return (
		<div className="mt-8 flex flex-col items-center gap-4">
			<div className="text-xs text-muted-foreground">
				Showing {startItem} to {endItem} of {totalItems} entries
			</div>
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					size="icon"
					onClick={navigateMostOld}
					disabled={isAtMostOld}
					title="Go to oldest data"
				>
					<ChevronsLeftIcon className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={navigatePrevious}
					disabled={!canGoToNewer}
					title="Previous (older data)"
				>
					<ChevronLeftIcon className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={navigateNext}
					disabled={!canGoToOlder}
					title="Next (newer data)"
				>
					<ChevronRightIcon className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={navigateMostRecent}
					disabled={isAtMostRecent}
					title="Go to newest data"
				>
					<ChevronsRightIcon className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
