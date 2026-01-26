export const formatAmount = (amount: number, canRound: boolean = true) =>
	new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: canRound ? 2 : 0,
	}).format(amount);
