export const monthYearFormatter = new Intl.DateTimeFormat("en-IN", {
	month: "short",
	year: "numeric",
});

export const getDateParts = (stringDate: string) => {
	const isoDate = new Date(stringDate.replace(" ", "T"));
	const month = isoDate.getMonth() + 1;
	const year = isoDate.getFullYear();
	const shortMonth = new Intl.DateTimeFormat("en-IN", {
		month: "short",
	}).format(isoDate);
	const formattedDate = new Intl.DateTimeFormat("en-IN", {
		dateStyle: "medium",
	}).format(isoDate);

	return {
		monthYear: monthYearFormatter.format(isoDate),
		month,
		year,
		shortMonth,
		formattedDate,
	};
};
