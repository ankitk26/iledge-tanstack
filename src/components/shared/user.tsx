import { useSuspenseQuery } from "@tanstack/react-query";

import { queries } from "~/queries";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function User() {
	const { data } = useSuspenseQuery(queries.users.me);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="cursor-pointer">
					<AvatarImage src={data?.image ?? ""} alt={data?.name} />
					<AvatarFallback>**</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="leading-none font-medium">
					<div className="flex flex-col space-y-2">
						<p className="text-sm leading-none font-medium">
							{data?.name}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{data?.email}
						</p>
					</div>
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
