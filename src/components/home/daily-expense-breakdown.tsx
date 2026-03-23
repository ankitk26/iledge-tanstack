import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import DailyExpenseBreakdownData from "./daily-expense-breakdown-data";

export default function DailyExpenseBreakdown() {
	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle>Daily Expense Breakdown this month</CardTitle>
			</CardHeader>
			<CardContent>
				<Suspense
					fallback={
						<div className="mx-auto flex aspect-auto h-62.5 w-full items-end justify-evenly gap-8">
							<Skeleton className="h-1/2 w-8" />
							<Skeleton className="h-3/4 w-8" />
							<Skeleton className="h-1/4 w-8" />
							<Skeleton className="h-full w-8" />
							<Skeleton className="h-2/3 w-8" />
							<Skeleton className="h-1/3 w-8" />
							<Skeleton className="h-3/4 w-8" />
							<Skeleton className="h-1/2 w-8" />
							<Skeleton className="h-1/4 w-8" />
							<Skeleton className="h-5/6 w-8" />
							<Skeleton className="h-1/3 w-8" />
							<Skeleton className="h-full w-8" />
						</div>
					}
				>
					<DailyExpenseBreakdownData />
				</Suspense>
			</CardContent>
		</Card>
	);
}
