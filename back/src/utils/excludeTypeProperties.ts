export function excludeTypeProperties<T, Key extends keyof T>(type: T, ...keys: Key[]): Omit<T, Key> {
	const typeData = { ...type };

	for (const key of keys) {
		delete typeData[key];
	}

	return typeData;
}
