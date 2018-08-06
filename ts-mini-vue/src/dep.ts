import { Watcher } from "./watcher";
export class Dep {
    static target: Watcher | null;
    subs: Array<Watcher>;
    constructor() {
        this.subs = [];
    }
    depend() {
        Dep.target.addDep(this);
    }
    addSub(wathcer: Watcher): void {
        this.subs.push(wathcer);
    }
    notify() {
        this.subs.forEach(w => w.updateFunc());
    }
}

export const pushTarget = (watcher: Watcher): void => {
    if (!Dep.target) Dep.target = watcher;
};

export const popTarget = (): void => {
    Dep.target = null;
};
