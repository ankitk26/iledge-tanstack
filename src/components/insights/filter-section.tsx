import { useSearch } from "@tanstack/react-router";
import InsightsSearchInput from "./insights-search-input";
import MonthFilter from "./month-filter";
import YearFilter from "./year-filter";

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
  const { view } = useSearch({ from: "/_protected/insights" });

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6">
      <InsightsSearchInput filteredData={filteredData} />

      {view === "monthly" && (
        <div className="flex items-center w-full justify-between gap-4">
          <YearFilter />
          <MonthFilter />
        </div>
      )}
    </div>
  );
}
