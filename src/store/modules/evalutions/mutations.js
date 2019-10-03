import types from './types';
import { Evalution } from "@/models";

export const state = {
  items: [],
  pagination: {},
  loading: true,
  mode: "",
  snackbar: false,
  notice: "",
  evalution: new Evalution(),
  evalutions: [],
  evalutionList: [],
}


export const mutations = {
  [types.SETITEMS] (state, items) {
    state.items = items;
  },
  [types.SETPAGINATION] (state, pagination) {
    state.pagination = pagination;
  },
  [types.SETLOADING] (state, { loading }) {
    state.loading = loading;
  },
  [types.SETNOTICE](state, { notice }) {
    state.notice = notice;
  },
  [types.SETSNACKBAR](state, { snackbar }) {
    state.snackbar = snackbar;
  },
  [types.SETMODE](state, { mode }) {
    state.mode = mode;
  },
  [types.SETEVALUTION](state, { evalution }) {
    state.evalution = evalution;
  }
}