/**
 * Deep merge two objects. Properties from `source` override `target`.
 * Arrays are replaced, not concatenated.
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
	const result = { ...target } as Record<string, any>;

	for (const key of Object.keys(source)) {
		const targetVal = result[key];
		const sourceVal = source[key];

		if (isPlainObject(targetVal) && isPlainObject(sourceVal)) {
			result[key] = deepMerge(targetVal, sourceVal);
		} else {
			result[key] = sourceVal;
		}
	}

	return result as T;
}

function isPlainObject(value: unknown): value is Record<string, any> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
