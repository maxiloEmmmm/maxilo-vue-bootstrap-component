export default {
    getStyle: function (el, styleName) {
        if (el.currentStyle) {
            // for IE
            return el.currentStyle[styleName];
        } else {
            // for peace
            return getComputedStyle(el, false)[styleName];
        }
    },
    loading: async function(el, func) {
        await this.app.instance.$nextTick();
        return await el.mxlLoadingInstance.wait(func);
    },
    setDrag(instance){
        this.app.store.instance.commit('maxilo-bootstrap-component/addRelation', {
            key: 'dropVueInstance',
            relation: instance
        });
    },
    getDrag(){
        return this.app.store.instance.state['maxilo-bootstrap-component'].relations.dropVueInstance;
    }
}