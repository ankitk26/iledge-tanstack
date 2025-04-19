import { useQuery } from "@tanstack/react-query";
import { authUserQuery } from "~/queries/get-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

export default function User() {
  const { data, isPending } = useQuery(authUserQuery);

  if (isPending) {
    return <Skeleton className="size-4 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={data?.image ?? ""} alt={data?.name} />
          <AvatarFallback>**</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>{data?.name}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{data?.email}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
