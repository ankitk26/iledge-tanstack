import { useQuery } from "@tanstack/react-query";
import { authUserQuery } from "~/queries";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

export default function SheetUser() {
  const { data, isPending } = useQuery(authUserQuery);

  if (isPending) {
    return <Skeleton className="size-4 rounded-full" />;
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar className="cursor-pointer">
        <AvatarImage src={data?.image ?? ""} alt={data?.name} />
        <AvatarFallback>**</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-sm items-start">
        <div>{data?.name}</div>
        <div className="text-muted-foreground">{data?.email}</div>
      </div>
    </div>
  );
}
