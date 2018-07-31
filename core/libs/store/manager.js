const state = {
    manager: {
        dropMenu: {

        }
    },
    relations: {}
};

const getters = {
    manager: state => state.manager
};

const actions = {
    async getRelation({state}, type) {
        if (!state.relations[type]) {
            switch(type) {
                case 'editor': {
                    state.relations.editor = await import('@ckeditor/ckeditor5-build-classic');
                }break;
            }
        }
        return state.relations[type] ? state.relations[type] : null;
    }
};

const mutations = {
    addDropMenu(state, payload){
        state.manager.dropMenu[payload.uuid] = payload.instance;
    },
    addRelation(state, key, relation){
        state.relations[key] = relation;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};