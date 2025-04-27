import { queryOptions } from "@tanstack/react-query";
import { getCurrentDayTotal } from "~/server-fns/get-current-day-total";
import { getCurrentWeekTotal } from "~/server-fns/get-current-week-total";
import { getDailyTotals } from "~/server-fns/get-daily-totals";
import { ExpensesQueryParams, getExpenses } from "~/server-fns/get-expenses";
import { getMonthComparison } from "~/server-fns/get-month-comparison";
import { getMonthlyTotals } from "~/server-fns/get-monthly-totals";
import { getPayeeById } from "~/server-fns/get-payee-by-id";
import { getPayeeDailyTotals } from "~/server-fns/get-payee-daily-totals";
import { getPayeeMonthStats } from "~/server-fns/get-payee-month-stats";
import { getPayeeMonthlyCounts } from "~/server-fns/get-payee-monthly-counts";
import { getPayeeMonthlyTotals } from "~/server-fns/get-payee-monthly-totals";
import { getPayeeOverallSummary } from "~/server-fns/get-payee-overall-summary";
import { getPayeeTotals } from "~/server-fns/get-payee-totals";
import { getSearchPayeeIds } from "~/server-fns/get-search-payee-ids";
import { getUser } from "~/server-fns/get-user";
import { getWeeklyTotals } from "~/server-fns/get-weekly-totals";

export const authUserQuery = queryOptions({
  queryKey: ["auth", "user"],
  queryFn: ({ signal }) => getUser({ signal }),
});

export const monthComparisonQuery = queryOptions({
  queryKey: ["expenses", "summary", "month"],
  queryFn: () => getMonthComparison(),
});

export const currentWeekTotalQuery = queryOptions({
  queryKey: ["expenses", "summary", "week"],
  queryFn: () => getCurrentWeekTotal(),
});

export const dailyTotalsQuery = queryOptions({
  queryKey: ["expenses", "breakdown", "day"],
  queryFn: () => getDailyTotals(),
});

export const currentDayTotalQuery = queryOptions({
  queryKey: ["expenses", "summary", "today"],
  queryFn: () => getCurrentDayTotal(),
});

export const weeklyTotalsQuery = queryOptions({
  queryKey: ["expenses", "breakdown", "week"],
  queryFn: () => getWeeklyTotals(),
});

export const payeesTotalsQuery = ({
  month,
  year,
}: {
  month: number | undefined;
  year: number | undefined;
}) =>
  queryOptions({
    queryKey: ["payees", "totals", { month, year }],
    queryFn: () => getPayeeTotals({ data: { month, year } }),
  });

export const monthlyTotalsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["monthly_totals"],
    queryFn: () => getMonthlyTotals({ data: { id: userId } }),
  });

export const expensesQuery = ({
  userId,
  payees,
  month,
  year,
}: ExpensesQueryParams) =>
  queryOptions({
    queryKey: ["expenses", { payees, month, year }],
    queryFn: () => getExpenses({ data: { userId, payees, month, year } }),
  });

export const payeeTitleQuery = (payeeId: string) =>
  queryOptions({
    queryKey: ["payee", "title", payeeId],
    queryFn: () => getPayeeById({ data: { payeeId } }),
  });

export const payeeOverallSummaryQuery = (payees: string) =>
  queryOptions({
    queryKey: ["payee", "total", payees],
    queryFn: () => getPayeeOverallSummary({ data: { payees } }),
  });

export const payeeMonthStatsQuery = (payees: string) =>
  queryOptions({
    queryKey: ["payee", "monthStats", payees],
    queryFn: () => getPayeeMonthStats({ data: { payees } }),
  });

export const payeeDailyTotalsQuery = (payees: string) =>
  queryOptions({
    queryKey: ["payee", "dailyTotals", payees],
    queryFn: () => getPayeeDailyTotals({ data: { payees } }),
  });

export const payeeMonthlyTotalsQuery = (payees: string) =>
  queryOptions({
    queryKey: ["payee", "monthlyTotals", payees],
    queryFn: () => getPayeeMonthlyTotals({ data: { payees } }),
  });

export const payeeMonthlyCountsQuery = (payees: string) =>
  queryOptions({
    queryKey: ["payee", "monthlyCounts", payees],
    queryFn: () => getPayeeMonthlyCounts({ data: { payees } }),
  });

export const searchPayeeIdsQuery = (query?: string) =>
  queryOptions({
    queryKey: ["search", query],
    queryFn: () => getSearchPayeeIds({ data: { query: query ?? "" } }),
    enabled: query ? query.length >= 2 : false,
  });
