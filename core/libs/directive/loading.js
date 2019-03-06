var random = function random() {
    var pre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }

    function guid() {
        return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    }

    return pre + guid();
};

export default {
    install(vue) {
        vue.directive('mxlLoading', {
            async bind(el, bind, vNode) {
                /* 将吸附区设置相对定位 */
                el.style.position = 'relative'
                /* loading版式 */
                let flag = bind.arg ? bind.arg : 'build';
                /* 等待el插入dom */
                /* 生成loading标识 */
                let tag = random('mxl-loading-');
                /* 由吸附区保存loading标识 */
                el.setAttribute('mxl-loading-id', tag);
                /* 创建loading容器 */
                let node = document.createElement('div');
                /* 设置loading标识 */
                node.setAttribute('id', tag);
                el.appendChild(node);
                await vNode.context.$nextTick();
                /* 获取存储loading vNode的容器 */
                let instance = vNode.componentInstance ? vNode.componentInstance : vNode.elm;
                /* 获取自定义提示 */
                let title = el.getAttribute('mxl-loading-title');
                title = title ? title : '请等待';
                /* 获取块模式 */
                let block = el.getAttribute('mxl-loading-block', 'block')
                /* 生成loading vNode */
                instance.mxlLoadingInstance = new vue({
                    el: '#' + tag,
                    template: `
                    <mxl-loading-${flag} 
                        style="background: #fff;border: 1px solid #cecece;border-radius: 4px;z-index: 20000;width: 100%;height: 100%;position: absolute;
                        top: 0;left: 0;"
                        id="${tag}" 
                        title="${title}"
                        :value="${!!bind.value}"
                        :block="'${block}' == 'block'"></mxl-loading-${flag}>`
                })._vnode.componentInstance;
            },
            async componentUpdated(el, bind, vNode) {
                await vue.nextTick();
                let instance = vNode.componentInstance ? vNode.componentInstance : vNode.elm;
                instance.mxlLoadingInstance.$data.running = bind.value;

                let title = el.getAttribute('mxl-loading-title');
                title = title ? title : '请等待';
                instance.mxlLoadingInstance.$props.title = title
                instance.mxlLoadingInstance.$props.block = el.getAttribute('mxl-loading-block', 'block') == 'block';
            }
        });
    }
}