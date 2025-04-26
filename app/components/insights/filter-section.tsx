import { useNavigate, useSearch } from "@tanstack/react-router";
import { useInsightsStore } from "~/store/insights-filter-store";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function FilterSection() {
  const { view, month, year } = useSearch({ from: "/_protected/insights" });
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery } = useInsightsStore();

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for payee by name or UPI ID..."
      />
      {view === "monthly" && (
        <div className="flex items-center w-full justify-between gap-4">
          <Select
            value={year ? year.toString() : new Date().getFullYear().toString()}
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
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={
              month ? month.toString() : (new Date().getMonth() + 1).toString()
            }
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
              <SelectItem value="1">Jan</SelectItem>
              <SelectItem value="2">Feb</SelectItem>
              <SelectItem value="3">Mar</SelectItem>
              <SelectItem value="4">Apr</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">Jun</SelectItem>
              <SelectItem value="7">Jul</SelectItem>
              <SelectItem value="8">Aug</SelectItem>
              <SelectItem value="9">Sep</SelectItem>
              <SelectItem value="10">Oct</SelectItem>
              <SelectItem value="11">Nov</SelectItem>
              <SelectItem value="12">Dec</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
