import { observe } from "../observe";
import { Lie } from "../index";
/**
 * 初始化data
 */
export function initData(lie: Lie, data: Object): void {
    let keys = Object.keys(data);
    for (let i = 0, l = keys.length; i < l; i++) {
        let key = keys[i];
        Object.defineProperty(lie, key, {
            enumerable: true,
            configurable: true,
            set(val) {
                this.__data__[key] = val;
            },
            get() {
                return this.__data__[key];
            }
        });
    }
    observe(data);
}
