import { Dep } from "./dep";
export const observe = (data: object): void => {
    for (let k in data) {
        defineReactive(data, k);
    }
};

function defineReactive(data: object, key: string): void {
    const property = Object.getOwnPropertyDescriptor(data, key);
    const getter = property && property.get;
    let dep = new Dep();
    // 运用闭包特性 暂存值
    let val = data[key];
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
