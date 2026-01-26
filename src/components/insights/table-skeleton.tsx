import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
	return Array.from({ length: 5 }).map((_, index) => (
		<div
			key={index + "payee-item"}
			className="flex flex-col px-4 lg:flex-row lg:items-center lg:justify-between"
		>
			<div className="flex flex-col">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="mt-1 h-3 w-32" />
			</div>
			<Skeleton className="mt-4 h-4 w-16 lg:mt-0" />
		</div>
	));
}
