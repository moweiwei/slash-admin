type InputValue = string | number | null | undefined;

const numberFormatter = new Intl.NumberFormat("en-US");

export function fNumber(number: InputValue): string {
	if (number == null) return "";
	return numberFormatter.format(Number(number));
}

export function fCurrency(number: InputValue): string {
	if (!number) return "";
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(number));
}

export function fPercent(number: InputValue): string {
	if (!number) return "";
	return new Intl.NumberFormat("en-US", {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: 1,
	}).format(Number(number) / 100);
}

export function fShortenNumber(number: InputValue): string {
	if (!number) return "";
	return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(Number(number));
}

const BYTE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

export function fBytes(number: InputValue): string {
	if (!number) return "";
	let value = Number(number);
	let unitIndex = 0;
	while (value >= 1024 && unitIndex < BYTE_UNITS.length - 1) {
		value /= 1024;
		unitIndex++;
	}
	const formatted = Number.isInteger(value) ? value.toString() : value.toFixed(1);
	return `${formatted} ${BYTE_UNITS[unitIndex]}`;
}
