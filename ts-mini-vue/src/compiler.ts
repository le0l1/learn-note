import { Lie } from "./index";
/**
 *  compiler for textNode
 */
function textCompiler(template: DocumentFragment, html: string) {
    const lie: Lie = this;
    const regex = /{{(.*?)}}/gm;
    let m, v;

    while ((m = regex.exec(html)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (m[1] && (v = getDeepProperty(lie, m[1]))) {
            template.appendChild(document.createTextNode(v));
        }
    }
}

/**
 * 创建元素
 */
export function createElement(): DocumentFragment {
    const lie: Lie = this;
    let template = document.createDocumentFragment();
    textCompiler.call(lie, template, lie.$template);
    return template;
}

/**
 * 嵌套属性
 */
function getDeepProperty(target: object, key: string): any {
    let keys = key.split(".");
    let val = target[keys[0]];
    if (!val) return false;
    if (keys.length > 1) {
        return getDeepProperty(val, keys.slice(1).join("."));
    } else {
        return val;
    }
}
