import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ExpensesListSkeleton() {
	return Array.from({ length: 5 }).map((_, i) => (
		<Card key={i} className="flex flex-row items-center justify-between p-4">
			<div className="flex items-center gap-4">
				<Skeleton className="h-10 w-10 rounded-none" />
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-3 w-24" />
				</div>
			</div>
			<div className="flex flex-col items-end gap-2">
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-3 w-12" />
			</div>
		</Card>
	));
}
