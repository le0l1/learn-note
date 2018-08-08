import { Dep } from "./dep";
import { isObject } from "./util";
export const observe = (data: object): void => {
    for (let k in data) {
        defineReactive(data, k);
    }
};

function defineReactive(data: object, key: string): void {
    let dep = new Dep();
    let val = data[key];

    // 嵌套属性对象
    if (isObject(val)) {
        observe(val);
    }

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            let value = val;
            if (Dep.target) {
                dep.depend();
            }
            return value;
        },
        set(newVal) {
            if (newVal === val) {
                return;
            }

            val = newVal;
            dep.notify();
        }
    });
}
