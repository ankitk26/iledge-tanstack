import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import CurrMonthExpensesData from "./curr-month-expenses-data";

export default function CurrMonthExpenses() {
	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle className="text-sm text-muted-foreground">
					This month's expenses
				</CardTitle>
			</CardHeader>
			<Suspense
				fallback={
					<>
						<CardContent>
							<Skeleton className="h-6 w-full" />
						</CardContent>
						<CardContent className="pt-0">
							<Skeleton className="h-3 w-32" />
							<Skeleton className="mt-1 h-3 w-48" />
						</CardContent>
					</>
				}
			>
				<CurrMonthExpensesData />
			</Suspense>
		</Card>
	);
}
