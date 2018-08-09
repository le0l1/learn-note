import { observe } from "./observe";
import { Watcher } from "./watcher";
import { initData } from "./init/init";
import { createElement } from "./compiler";

export interface Data {
    (): {
        [key: string]: any;
    };
}
/**
 * 更新组件
 */
function updateComponent(): void {
    const lie: Lie = this;
    let html = createElement.call(lie);
    lie.$el.innerHTML = "";
    lie.$el.appendChild(html);
}

export class Lie {
    __data__: Object;
    $el: HTMLElement;
    $template: DocumentFragment;
    constructor(options: { data: Data; el?: string }) {
        let data = options.data() || {};
        this.__data__ = data;
        // 初始化Data
        initData(this, data);

        if (options.el) {
            this.$mount(options.el);
        }
    }
    $mount(el: string): void {
        const lie: Lie = this;
        const $el: HTMLElement = document.querySelector(el);
        lie.$el = $el;
        lie.trasnfromTemplate();
        new Watcher(lie, () => updateComponent.call(lie));
    }
    /**
     * 模板缓存
     */
    private trasnfromTemplate() {
        const lie = this;
        const $template = document.createDocumentFragment();
        for (let i = 0, l = lie.$el.childNodes.length; i < l; i++) {
            $template.appendChild(lie.$el.childNodes[i]);
        }
        lie.$template = $template;
    }
}
