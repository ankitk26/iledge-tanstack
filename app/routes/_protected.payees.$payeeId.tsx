import { createFileRoute } from "@tanstack/react-router";
import { Calculator, TrendingUp } from "lucide-react";
import PayeeMonthlyExpenses from "~/components/expenses/payee-monthly-expenses";
import PayeeMonthlyExpensesCount from "~/components/expenses/payee-monthly-expenses-count";
import PayeeDailyExpenses from "~/components/payee/payee-daily-expenses";
import ExpensesList from "~/components/shared/expenses-list";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const Route = createFileRoute("/_protected/payees/$payeeId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { payeeId } = Route.useParams();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-xl font-semibold">Zepto</h2>
          <h5 className="text-muted-foreground">zeptonow.bdpg@icici</h5>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="lg:grid-cols-1">
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Amount spent this month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl">$1900</h2>
          </CardContent>
          <CardFooter className="text-xs">
            <TrendingUp className="size-4 mr-2 text-foreground/70" /> 12% more
            than previous month ($1200)
          </CardFooter>
        </Card>

        <Card className="lg:grid-cols-1">
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Total Amount spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl">$5300</h2>
          </CardContent>
          <CardFooter className="text-xs">
            <Calculator className="size-4 mr-2 text-foreground/70" /> $700 spent
            on average
          </CardFooter>
        </Card>
      </div>

      <div>
        <PayeeDailyExpenses />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <PayeeMonthlyExpenses />
        <PayeeMonthlyExpensesCount />
      </div>

      <div>
        <h3>All transactions</h3>
        <div className="space-y-5 mt-4">
          <ExpensesList />
        </div>
      </div>
    </div>
  );
}
