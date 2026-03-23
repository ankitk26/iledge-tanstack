import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import CurrWeekExpensesData from "./curr-week-expenses-data";

export default function CurrWeekExpenses() {
	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle className="text-sm text-muted-foreground">
					This week's expenses
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<Skeleton className="h-6 w-full" />}>
					<CurrWeekExpensesData />
				</Suspense>
			</CardContent>
		</Card>
	);
}
