import { Lie } from "./index";
import { getDeepProperty } from "./util";

let template: DocumentFragment;
let lie: Lie | null;
/**
 *  compiler for textNode
 */
function textCompiler(dom: Node) {
    let html = dom.textContent;
    const regex = /{{(.*?)}}/gm;
    let m, v;

    while ((m = regex.exec(html)) !== null) {
        // 替换后必须重置lastIndex 不然会从上次匹配的索引开始
        regex.lastIndex = 0;

        if (m[1] && (v = getDeepProperty(lie, m[1]))) {
            html = html.replace(m[0], v);
        }
    }
    dom.textContent = html;
}

/**
 * 创建元素
 */
export function createElement(): DocumentFragment {
    lie = this;
    template = document.createDocumentFragment();
    invokeCompiler(lie.$template);
    lie = null;
    return template;
}

/**
 *  invokeCompiler
 */
function invokeCompiler(node: Node) {
    let len = node.childNodes ? node.childNodes.length : 0;
    if (len > 0) {
        let i = 0;
        while (i < len) {
            // clone node
            let currentNode = node.childNodes[i].cloneNode(true);
            template.appendChild(currentNode);
            invokeCompiler(currentNode);
            i++;
        }
    }
    if (node.nodeType === 3) {
        textCompiler(node);
    }
}
