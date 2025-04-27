import { useNavigate } from "@tanstack/react-router";
import { useInsightsStore } from "~/store/use-insights";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function InsightsSearchInput({
  filteredData,
}: {
  filteredData: {
    id: number;
    name: string;
    upi_id: string;
    amount: number;
  }[];
}) {
  const { searchQuery, setSearchQuery } = useInsightsStore();
  const navigate = useNavigate();

  return (
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
  );
}
