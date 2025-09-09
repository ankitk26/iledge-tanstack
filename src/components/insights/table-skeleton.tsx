import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <div
      key={index + "payee-item"}
      className="px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="flex flex-col">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32 mt-1" />
      </div>
      <Skeleton className="h-4 w-16 mt-4 lg:mt-0" />
    </div>
  ));
}
