import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import TodayExpensesData from "./today-expenses-data";

export default function TodayExpenses() {
	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle className="text-sm text-muted-foreground">
					Today's expenses
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<Skeleton className="h-6 w-full" />}>
					<TodayExpensesData />
				</Suspense>
			</CardContent>
		</Card>
	);
}
