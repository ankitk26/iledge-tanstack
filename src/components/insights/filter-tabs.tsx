import { useNavigate, useSearch } from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function FilterTabs() {
  const { view } = useSearch({ from: "/_protected/insights" });
  const navigate = useNavigate();

  return (
    <Tabs
      value={view}
      onValueChange={(val) => {
        if (val === "all") {
          navigate({
            to: "/insights",
            search: (prev) => ({
              ...prev,
              view: "all",
              month: undefined,
              year: undefined,
            }),
          });
        } else {
          navigate({
            to: "/insights",
            search: (prev) => ({
              ...prev,
              view: "monthly",
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
            }),
          });
        }
      }}
      className="md:w-[200px] w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
