import { useNavigate, useSearch } from "@tanstack/react-router";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export default function MonthFilter() {
	const { month } = useSearch({ from: "/_protected/insights" });
	const currentMonth = new Date().getMonth() + 1;
	const navigate = useNavigate();

	const months = Array.from({ length: 12 }, (_, i) =>
		new Intl.DateTimeFormat("en", { month: "short" }).format(
			new Date(2000, i),
		),
	);

	return (
		<Select
			value={month ? month.toString() : currentMonth.toString()}
			onValueChange={(val) =>
				navigate({
					to: "/insights",
					search: (prev) => ({ ...prev, month: parseInt(val) }),
				})
			}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select month" />
			</SelectTrigger>
			<SelectContent>
				{months.map((month, index) => (
					<SelectItem key={index + 1} value={(index + 1).toString()}>
						{month}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
