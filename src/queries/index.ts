import { queryOptions } from "@tanstack/react-query";

import { getCategories } from "@/server-fns/get-categories";
import { getCurrentDayTotal } from "@/server-fns/get-current-day-total";
import { getCurrentWeekTotal } from "@/server-fns/get-current-week-total";
import { getDailyTotals } from "@/server-fns/get-daily-totals";
import { ExpensesQueryParams, getExpenses } from "@/server-fns/get-expenses";
import { getMonthComparison } from "@/server-fns/get-month-comparison";
import { getMonthlyTotals } from "@/server-fns/get-monthly-totals";
import { getPayeeById } from "@/server-fns/get-payee-by-id";
import { getPayeeDailyTotals } from "@/server-fns/get-payee-daily-totals";
import { getPayeeMonthStats } from "@/server-fns/get-payee-month-stats";
import { getPayeeMonthlyCounts } from "@/server-fns/get-payee-monthly-counts";
import { getPayeeMonthlyTotals } from "@/server-fns/get-payee-monthly-totals";
import { getPayeeOverallSummary } from "@/server-fns/get-payee-overall-summary";
import { getPayeeTotals } from "@/server-fns/get-payee-totals";
import { getPayees } from "@/server-fns/get-payees";
import { getSearchPayeeIds } from "@/server-fns/get-search-payee-ids";
import { getUser } from "@/server-fns/get-user";
import { getWeeklyTotals } from "@/server-fns/get-weekly-totals";

const expenseQueries = {
	today: queryOptions({
		queryKey: ["expenses", "today"],
		queryFn: () => getCurrentDayTotal(),
	}),
	currentWeek: queryOptions({
		queryKey: ["expenses", "currentWeek"],
		queryFn: () => getCurrentWeekTotal(),
	}),
	currentAndPreviousMonth: queryOptions({
		queryKey: ["expenses", "currentAndPreviousMonth"],
		queryFn: () => getMonthComparison(),
	}),
	byWeek: queryOptions({
		queryKey: ["expenses", "byWeek"],
		queryFn: () => getWeeklyTotals(),
	}),
	byDay: queryOptions({
		queryKey: ["expenses", "byDay"],
		queryFn: () => getDailyTotals(),
	}),
	monthlyTotals: (userId: string) =>
		queryOptions({
			queryKey: ["monthly_totals"],
			queryFn: () => getMonthlyTotals({ data: { id: userId } }),
		}),
	filteredExpenses: ({ userId, payees, month, year }: ExpensesQueryParams) =>
		queryOptions({
			queryKey: ["expenses", { payees, month, year }],
			queryFn: () =>
				getExpenses({ data: { userId, payees, month, year } }),
		}),
};

const payeeQueries = {
	all: queryOptions({
		queryKey: ["payees"],
		queryFn: () => getPayees(),
	}),
	totalsByMonthYear: ({
		month,
		year,
	}: {
		month: number | undefined;
		year: number | undefined;
	}) =>
		queryOptions({
			queryKey: ["payees", "totals", { month, year }],
			queryFn: () => getPayeeTotals({ data: { month, year } }),
		}),
	info: (payeeId: string) =>
		queryOptions({
			queryKey: ["payee", "title", payeeId],
			queryFn: () => getPayeeById({ data: { payeeId } }),
		}),
	currentAndPreviousMonthTotals: (payees: string) =>
		queryOptions({
			queryKey: ["payee", "monthStats", payees],
			queryFn: () => getPayeeMonthStats({ data: { payees } }),
		}),
	totalAndAverage: (payees: string) =>
		queryOptions({
			queryKey: ["payee", "total", payees],
			queryFn: () => getPayeeOverallSummary({ data: { payees } }),
		}),
	totalsByDay: (payees: string) =>
		queryOptions({
			queryKey: ["payee", "dailyTotals", payees],
			queryFn: () => getPayeeDailyTotals({ data: { payees } }),
		}),
	totalsByMonth: (payees: string) =>
		queryOptions({
			queryKey: ["payee", "monthlyTotals", payees],
			queryFn: () => getPayeeMonthlyTotals({ data: { payees } }),
		}),
	expenseCountByMonth: (payees: string) =>
		queryOptions({
			queryKey: ["payee", "monthlyCounts", payees],
			queryFn: () => getPayeeMonthlyCounts({ data: { payees } }),
		}),
	bySearchQuery: (query?: string) =>
		queryOptions({
			queryKey: ["search", query],
			queryFn: () => getSearchPayeeIds({ data: { query: query ?? "" } }),
			enabled: query ? query.length >= 2 : false,
		}),
};

const categoryQueries = {
	all: queryOptions({
		queryKey: ["categories"],
		queryFn: () => getCategories(),
	}),
};

const userQueries = {
	me: queryOptions({
		queryKey: ["auth", "user"],
		queryFn: ({ signal }) => getUser({ signal }),
	}),
};

export const queries = {
	expenses: expenseQueries,
	payees: payeeQueries,
	categories: categoryQueries,
	users: userQueries,
};
