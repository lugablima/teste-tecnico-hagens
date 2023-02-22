export function clearUndefinedProperties<T>(obj: T) {
	for (const prop in obj) {
		if (!obj[prop]) {
			delete obj[prop];
		}
	}

	return obj;
}
