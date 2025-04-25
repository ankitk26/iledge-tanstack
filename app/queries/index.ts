import { queryOptions } from "@tanstack/react-query";
import { getCurrentDayTotal } from "~/server-fns/get-current-day-total";
import { getCurrentWeekTotal } from "~/server-fns/get-current-week-total";
import { getDailyTotals } from "~/server-fns/get-daily-totals";
import { getMonthComparison } from "~/server-fns/get-month-comparison";
import { getPayeeTotals } from "~/server-fns/get-payee-totals";
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

export const payeesTotalsQuery = queryOptions({
  queryKey: ["payees", "totals"],
  queryFn: () => getPayeeTotals(),
});
