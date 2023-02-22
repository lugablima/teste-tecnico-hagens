export function clearBlankAttributes<T>(obj: T) {
    for(const prop in obj) {
        if(typeof(obj[prop]) === "string" && !obj[prop]) {
            delete obj[prop];
        }
    }

    return obj;
}