import { PencilIcon } from "lucide-react";

import { useAdminStore } from "~/store/use-admin-store";
import { useDialogStore } from "~/store/use-dialog-store";

import { Button } from "../ui/button";

type Props = {
	payee: {
		id: number;
		name: string;
		payee_upi_id: string;
		category_id: number;
	};
};

export default function UpdateCategoryButton({ payee }: Props) {
	const { openDialog } = useDialogStore();
	const setSelectedPayeeId = useAdminStore(
		(store) => store.setSelectedPayeeId,
	);
	const setSelectedCategoryId = useAdminStore(
		(store) => store.setSelectedCategoryId,
	);
	const setDefaultCategoryId = useAdminStore(
		(store) => store.setDefaultCategoryId,
	);

	return (
		<div>
			<Button
				size="icon"
				variant="outline"
				onClick={() => {
					setSelectedPayeeId(payee.id);
					setSelectedCategoryId(payee.category_id);
					setDefaultCategoryId(payee.category_id);
					openDialog();
				}}
			>
				<PencilIcon />
			</Button>
		</div>
	);
}
