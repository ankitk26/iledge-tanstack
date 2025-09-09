import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function YearFilter() {
  const currentYear = new Date().getFullYear();

  const { year } = useSearch({ from: "/_protected/insights" });
  const navigate = useNavigate();

  return (
    <Select
      value={year ? year.toString() : currentYear.toString()}
      onValueChange={(val) =>
        navigate({
          to: "/insights",
          search: (prev) => ({ ...prev, year: parseInt(val) }),
        })
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        {[...Array(currentYear - 2023 + 1)].map((_, i) => (
          <SelectItem key={2023 + i} value={(2023 + i).toString()}>
            {2023 + i}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
