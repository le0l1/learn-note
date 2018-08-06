import { Dep, pushTarget, popTarget } from "./dep";
import { Lie } from "./index";
/**
 ** 负责触发compiler
 */
export class Watcher {
    subs: Array<Dep>;
    lie: Lie;
    updateFunc: Function;
    constructor(lie, func) {
        this.subs = [];
        this.lie = lie;
        this.updateFunc = func;
        this.get();
    }
    addDep(dep: Dep) {
        this.subs.push(dep);
        dep.addSub(this);
    }
    get() {
        const lie: Lie = this.lie;
        pushTarget(this);
        this.updateFunc.call(lie, lie);
        popTarget();
    }
}
