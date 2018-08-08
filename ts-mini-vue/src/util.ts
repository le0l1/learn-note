export function isObject(val: any): Boolean {
    return typeof val === "object";
}

/**
 * 嵌套属性
 */
export function getDeepProperty(target: object, key: string): any {
    let keys = key.split(".");
    let val = target[keys[0]];
    if (!val) return false;
    if (keys.length > 1) {
        return getDeepProperty(val, keys.slice(1).join("."));
    } else {
        return val;
    }
}
