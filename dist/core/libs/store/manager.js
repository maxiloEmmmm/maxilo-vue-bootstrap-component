"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var state = {
    manager: {
        dropMenu: {}
    }
};

var getters = {
    manager: function manager(state) {
        return state.manager;
    }
};

var actions = {};

var mutations = {
    addDropMenu: function addDropMenu(state, payload) {
        state.manager.dropMenu[payload.uuid] = payload.instance;
    }
};

exports.default = {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};