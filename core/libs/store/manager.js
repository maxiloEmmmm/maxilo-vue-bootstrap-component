const state = {
    manager: {
        dropMenu: {

        },
        menu: {
        }
    },
    relations: {}
};

const getters = {
    manager: state => state.manager,
};

const actions = {
    async getRelation({state}, type) {
        if (!state.relations[type]) {
            switch(type) {
                case 'editor': {
                    state.relations.editor = (await import('@ckeditor/ckeditor5-build-classic')).default;
                }break;
            }
        }
        return state.relations[type] ? state.relations[type] : null;
    }
};

const mutations = {
    addRelation(state, payload) {
        state.relations[payload.key] = payload.relation;
    },
    hideDropMenu(state, dropMenuInstance){
        state.manager.dropMenu[dropMenuInstance._uid] = dropMenuInstance;

        if(dropMenuInstance._dorp_menu_single !== undefined && !!dropMenuInstance._dorp_menu_single) {
            Object.keys(state.manager.dropMenu).forEach(v => {
                if(v != dropMenuInstance._uid) {
                    state.manager.dropMenu[v].hideDropMenu && state.manager.dropMenu[v].hideDropMenu();
                }
            });
        }
    },
    menuMerge(state, payload){
        if(state.manager.menu[payload.primaryKey] === undefined) {
            state.manager.menu[payload.primaryKey] = {
                class: {},
                mode: {},
                func: {}
            };
        }
        Object.assign(state.manager.menu[payload.primaryKey], payload.data);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};