import { observe } from "./observe";
import { Watcher } from "./watcher";
import { createElementAccess } from "../node_modules/typescript";

export interface Data {
    (): {
        [key: string]: any;
    };
}
// 初始化data
function initData(data: Object): void {
    observe(data);
}

function updateComponent(): void {
    const lie: Lie = this;
    let html = createElement.call(lie);
    lie.$el.innerHTML = "";
    lie.$el.appendChild(html);
}

function createElement(): DocumentFragment {
    const lie: Lie = this;
    let template = document.createDocumentFragment();
    textCompiler.call(lie, template, lie.$template);
    return template;
}

function textCompiler(template: DocumentFragment, html: string) {
    const lie: Lie = this;
    const regex = /{{(\w)}}/gm;
    let m;

    while ((m = regex.exec(html)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        if (m[1] && m[1] in lie.$data) {
            template.appendChild(document.createTextNode(lie.$data[m[1]]));
        }
    }
}

export class Lie {
    $data: Object;
    $el: HTMLElement;
    $template: string;
    constructor(options: { data: Data; el?: string }) {
        this.$data = options.data();
        // 初始化Data
        initData(this.$data);
        if (options.el) {
            this.$mount(options.el);
        }
    }
    $mount(el: string): void {
        const lie: Lie = this;
        const $el: HTMLElement = document.querySelector(el);
        lie.$el = $el;
        lie.$template = $el.outerHTML;
        new Watcher(lie, () => updateComponent.call(lie));
    }
}
