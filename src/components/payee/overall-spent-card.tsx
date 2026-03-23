import { CalculatorIcon } from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatAmount } from "@/lib/format-amount";
import { queries } from "@/queries";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

export default function OverallSpentCard({ payees }: { payees: string }) {
	const { data } = useSuspenseQuery(queries.payees.totalAndAverage(payees));

	return (
		<Card className="lg:grid-cols-1">
			<CardHeader>
				<CardTitle className="text-muted-foreground">
					Total Amount spent
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-3xl">{formatAmount(data[0].total_amount)}</p>
			</CardContent>
			<CardFooter className="text-xs">
				<CalculatorIcon className="mr-2 size-4 text-foreground/70" />
				{formatAmount(data[0].average_amount)} spent on average
			</CardFooter>
		</Card>
	);
}
