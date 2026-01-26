import { useQuery } from "@tanstack/react-query";
import { CalculatorIcon } from "lucide-react";

import { formatAmount } from "@/lib/format-amount";
import { queries } from "@/queries";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function OverallSpentCard({ payees }: { payees: string }) {
	const { data, isPending, isError } = useQuery(
		queries.payees.totalAndAverage(payees),
	);

	if (isError) {
		return (
			<Card className="p-4 lg:grid-cols-1">
				<p className="text-center text-sm text-muted-foreground">
					Something went wrong
				</p>
			</Card>
		);
	}

	return (
		<Card className="lg:grid-cols-1">
			<CardHeader>
				<CardTitle className="text-muted-foreground">
					Total Amount spent
				</CardTitle>
			</CardHeader>
			<CardContent>
				<h2 className="text-3xl">
					{isPending ? (
						<Skeleton className="h-6 w-1/2" />
					) : (
						formatAmount(data[0].total_amount)
					)}
				</h2>
			</CardContent>
			<CardFooter className="text-xs">
				{!isPending && (
					<CalculatorIcon className="mr-2 size-4 text-foreground/70" />
				)}{" "}
				{isPending ? (
					<Skeleton className="h-6 w-1/4" />
				) : (
					`${formatAmount(data[0].average_amount)} spent on average`
				)}
			</CardFooter>
		</Card>
	);
}
