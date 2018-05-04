const state = {
    relations: {}
};

const getters = {
};

const actions = {
    async getRelation({state}, type) {
        if (!state.relations[type]) {
            switch (type) {
                case 'editor': {
                    state.relations.editor = await import('@ckeditor/ckeditor5-build-classic');
                } break;
            }
        }
        return state.relations[type] ? state.relations[type] : null;
    }
};

const mutations = {
    addRelation(state, key, relation) {
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