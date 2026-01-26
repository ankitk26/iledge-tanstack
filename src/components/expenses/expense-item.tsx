import { Link } from "@tanstack/react-router";

import { formatAmount } from "~/lib/format-amount";
import { getDateParts } from "~/lib/month-year-formatter";

import CategoryIcon from "../shared/category-icon";
import { Card } from "../ui/card";

interface Props {
	expense: {
		id: number;
		payee_id: number;
		payee_name: string;
		payee_upi_id: string;
		transaction_date: string;
		amount: number;
		category_icon: string;
	};
}

export default function ExpenseItem({ expense }: Props) {
	const formattedAmount = formatAmount(expense.amount);
	const { formattedDate } = getDateParts(expense.transaction_date);

	return (
		<Card className="flex flex-col items-start justify-between gap-4 border-border/50 p-4 lg:flex-row lg:items-center">
			<div className="flex w-full items-start gap-4 lg:w-auto lg:items-center">
				<div className="shrink-0 rounded-xl bg-muted p-2">
					<CategoryIcon
						iconName={expense.category_icon}
						className="size-6 text-muted-foreground"
					/>
				</div>
				<div className="flex flex-col">
					<span className="font-medium">{expense.payee_name}</span>
					<Link
						to="/payees/$payeeId"
						params={{ payeeId: expense.payee_id.toString() }}
					>
						<span className="text-sm break-all text-muted-foreground">
							{expense.payee_upi_id}
						</span>
					</Link>
				</div>
			</div>

			<div className="flex w-full flex-col items-start lg:w-auto">
				<span className="text-sm font-semibold text-foreground">
					{formattedAmount}
				</span>
				<span className="text-xs text-muted-foreground">
					{formattedDate}
				</span>
			</div>
		</Card>
	);
}
