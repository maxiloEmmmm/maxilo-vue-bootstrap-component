import components from './core/components';
import directive from './core/libs/directive';
import './core/asset/sass/core.scss';


import component from './core/libs/store/manager';
import mxlBootstrapComponentAdapter from './core/libs/adapter';
import mxlBootstrapComponentSystemAdapter from './core/libs/systemAdapter';
import mxlBootstrapComponentUtils from './core/libs/utils';

export default function (core, option = {}) {
    directive.forEach(v => core.vue.use(v));
    core.store.once('maxilo-bootstrap-component', component);

    let module = new mxlBootstrapComponentAdapter;
    module.useAlert = !!option.useAlert
    core.register(module);
    core.mxl_bootstrap_component_adapter.add(new mxlBootstrapComponentSystemAdapter);
    
    Object.keys(mxlBootstrapComponentUtils).forEach(k => {
        core.utils.add(`mxlvbc.${k}`, mxlBootstrapComponentUtils[k], true);
    });

    let pre = 'mxl';

    function depPre(target) {
        if (!target.__file && !target._compiled && !target.functional && !target._scopeId) {
            if (Array.isArray(target)) {
                target.forEach((v, i) => {
                    v = depPre(v);
                    target[pre + core.utils._.upperFirst(i)] = v;
                    delete target[i];
                });
            } else {
                Object.keys(target).forEach((key) => {
                    target[key] = depPre(target[key]);
                    target[pre + core.utils._.upperFirst(key)] = target[key];
                    delete target[key];
                });
            }
        }

        return target;
    }
    core.vue.depComponent(depPre(components));
};