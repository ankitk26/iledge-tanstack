import { useSuspenseQuery } from "@tanstack/react-query";

import { queries } from "~/queries";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function SheetUser() {
	const { data } = useSuspenseQuery(queries.users.me);

	return (
		<div className="flex items-center gap-2">
			<Avatar className="cursor-pointer">
				<AvatarImage src={data?.image ?? ""} alt={data?.name} />
				<AvatarFallback>**</AvatarFallback>
			</Avatar>
			<div className="flex flex-col items-start text-sm">
				<div>{data?.name}</div>
				<div className="text-muted-foreground">{data?.email}</div>
			</div>
		</div>
	);
}
