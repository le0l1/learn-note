import { observe } from "../observe";
import { Lie } from "../index";
/**
 * 初始化data
 */
export function initData(lie: Lie, data: Object): void {
    proxy(lie, "__data__");
    observe(data);
}
/**
 *  属性代理
 */
function proxy(target: Object, sourceKey: string): void {
    let data = target[sourceKey];
    let keys = Object.keys(data);
    for (let i = 0, l = keys.length; i < l; i++) {
        let key = keys[i];
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            set(val) {
                this[sourceKey][key] = val;
            },
            get() {
                return this[sourceKey][key];
            }
        });
    }
}
