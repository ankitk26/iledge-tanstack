import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import WeeklyExpenseBreakdownData from "./weekly-expense-breakdown-data";
import { Skeleton } from "../ui/skeleton";

export default function WeeklyExpenseBreakdown() {
	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle>Weekly Expense Breakdown</CardTitle>
			</CardHeader>
			<CardContent>
				<Suspense
					fallback={
						<div className="mx-auto flex aspect-auto h-62.5 w-full items-end justify-evenly gap-8">
							<Skeleton className="h-1/2 w-12" />
							<Skeleton className="h-3/4 w-12" />
							<Skeleton className="h-1/4 w-12" />
							<Skeleton className="h-full w-12" />
						</div>
					}
				>
					<WeeklyExpenseBreakdownData />
				</Suspense>
			</CardContent>
		</Card>
	);
}
