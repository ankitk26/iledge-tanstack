import { Link } from "@tanstack/react-router";
import { EditIcon } from "lucide-react";

import { useAdminStore } from "@/store/use-admin-store";
import { useDialogStore } from "@/store/use-dialog-store";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface Props {
	payee: {
		payeeId: number;
		payeeName: string;
		payeeUpiId: string;
		categoryId: number;
		categoryDescription: string;
		categoryIcon: string;
	};
}

export default function PayeeItem({ payee }: Props) {
	const openDialog = useDialogStore((store) => store.openDialog);
	const setSelectedPayeeId = useAdminStore(
		(store) => store.setSelectedPayeeId,
	);
	const setSelectedCategoryId = useAdminStore(
		(store) => store.setSelectedCategoryId,
	);
	const setDefaultCategoryId = useAdminStore(
		(store) => store.setDefaultCategoryId,
	);

	const avatarFallbackValue = payee.payeeName
		.split(" ")
		.map((word, index) => (index < 2 ? word.charAt(0).toUpperCase() : ""))
		.join("");

	return (
		<Card>
			<CardContent className="flex items-center justify-between gap-8 px-4">
				<div className="flex flex-1 items-center gap-4">
					<Avatar className="hidden size-12 lg:inline">
						<AvatarFallback>{avatarFallbackValue}</AvatarFallback>
					</Avatar>

					<div className="flex min-w-0 flex-col items-start gap-1">
						<h3 className="text-sm">{payee.payeeName}</h3>
						<Link
							to="/payees/$payeeId"
							params={{ payeeId: payee.payeeId.toString() }}
							className="text-xs text-muted-foreground"
						>
							{payee.payeeUpiId}
						</Link>
						<Badge
							variant="outline"
							className="inline-flex lg:hidden lg:py-1.5"
						>
							{payee.categoryDescription}
						</Badge>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<Badge
						variant="outline"
						className="hidden lg:inline-flex lg:py-1.5"
					>
						{payee.categoryDescription}
					</Badge>
					<Button
						size="icon"
						onClick={() => {
							setSelectedPayeeId(payee.payeeId);
							setSelectedCategoryId(payee.categoryId);
							setDefaultCategoryId(payee.categoryId);
							openDialog();
						}}
					>
						<EditIcon />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
