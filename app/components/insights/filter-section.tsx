import { useNavigate, useSearch } from "@tanstack/react-router";
import { useInsightsStore } from "~/store/use-insights";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function FilterSection({
  filteredData,
}: {
  filteredData: {
    id: number;
    name: string;
    upi_id: string;
    amount: number;
  }[];
}) {
  const { view, month, year } = useSearch({ from: "/_protected/insights" });
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useInsightsStore();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const months = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(2000, i))
  );

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <div className="flex flex-col w-full gap-3">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for payee by name or UPI ID..."
        />
        {searchQuery && filteredData.length > 0 && (
          <Button
            variant="default"
            size="sm"
            className="w-fit"
            title="View insights on search results payee"
            onClick={() =>
              navigate({ to: "/search", search: { query: searchQuery } })
            }
          >
            View search summary
          </Button>
        )}
      </div>
      {view === "monthly" && (
        <div className="flex items-center w-full justify-between gap-4">
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

          <Select
            value={month ? month.toString() : currentMonth.toString()}
            onValueChange={(val) =>
              navigate({
                to: "/insights",
                search: (prev) => ({ ...prev, month: parseInt(val) }),
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
