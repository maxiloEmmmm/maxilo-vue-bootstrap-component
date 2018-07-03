import components from './core/components';
import maxiloVue from 'maxilo-vue';
import './core/asset/sass/core.scss';
maxiloVue.vue.warnHandler = function(a){
    if (!/reserved HTML elements as component/g.test(a)) {
        maxiloVue.utils.system.notice(a);
    }
}
let pre = 'mxl';

function depPre(target){
    if (!target.__file && !target._compiled && !target.functional) {
        if (Array.isArray(target)) {
            target.forEach((v, i) => {
                v = depPre(v);
                target[pre + maxiloVue.utils._.upperFirst(i)] = v;
                delete target[i];
            });
        }else {
            Object.keys(target).forEach((key) => {
                target[key] = depPre(target[key]);
                target[pre + maxiloVue.utils._.upperFirst(key)] = target[key];
                delete target[key];
            });
        }
    }
    
    return target;
}

import component from './core/libs/store/manager';
maxiloVue.store.once('maxilo-bootstrap-component', component);

import mxlBootstrapComponentAdapter from './core/libs/adapter';
maxiloVue.register(new mxlBootstrapComponentAdapter);
import mxlBootstrapComponentSystemAdapter from './core/libs/systemAdapter';
maxiloVue.mxl_bootstrap_component_adapter.add(new mxlBootstrapComponentSystemAdapter);

import mxlBootstrapComponentUtils from './core/libs/utils';
maxiloVue.utils.add('mxlvbc', mxlBootstrapComponentUtils);

import swal from 'sweetalert';
Object.defineProperty(maxiloVue.vueFactory.prototype, '$alert', {
    get: () => {
        return swal;
    }
});

export default depPre(components)