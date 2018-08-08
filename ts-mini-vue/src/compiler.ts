import { Lie } from "./index";
/**
 *  compiler for textNode
 */
function textCompiler(template: DocumentFragment, html: string) {
    const lie: Lie = this;
    const regex = /{{(\w)}}/gm;
    let m;

    while ((m = regex.exec(html)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        if (m[1] && m[1] in lie.__data__) {
            template.appendChild(document.createTextNode(lie.__data__[m[1]]));
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
