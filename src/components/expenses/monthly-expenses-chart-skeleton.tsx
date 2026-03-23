import { Skeleton } from "../ui/skeleton";

export default function MonthlyExpensesChartSkeleton() {
	return (
		<div className="mx-auto flex aspect-auto h-62.5 w-full items-end justify-evenly gap-8">
			<Skeleton className="h-1/2 w-12" />
			<Skeleton className="h-3/4 w-12" />
			<Skeleton className="h-1/4 w-12" />
			<Skeleton className="h-full w-12" />
		</div>
	);
}
