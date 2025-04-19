import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

export default function ExpenseSummary() {
  return (
    <section>
      <h1 className="text-xl font-semibold">Expense Summary</h1>
      <div className="grid my-4 lg:grid-cols-3 gap-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-foreground/60 text-sm">
              Today's expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl">$120</h2>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-foreground/60 text-sm">
              This week's expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl">$300</h2>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-foreground/60 text-sm">
              This month's expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl">$1000</h2>
          </CardContent>
          <CardFooter className="flex flex-col items-start text-xs text-foreground/60">
            <p>Budget exceeded by $300</p>
            <p>Last month's expenses = $600</p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
