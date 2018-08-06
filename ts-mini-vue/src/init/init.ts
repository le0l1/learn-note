import { observe } from "../observe";
/**
 * 初始化data
 */
export function initData(data: Object): void {
    observe(data);
}
