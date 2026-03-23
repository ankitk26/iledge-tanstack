import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "@/queries";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function User() {
	const { data } = useSuspenseQuery(queries.users.me);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<button className="rounded-full">
						<Avatar>
							<AvatarImage src={data?.image ?? ""} alt={data?.name} />
							<AvatarFallback>**</AvatarFallback>
						</Avatar>
					</button>
				}
			/>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>{data?.name}</DropdownMenuLabel>
					<DropdownMenuLabel>{data?.email}</DropdownMenuLabel>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
