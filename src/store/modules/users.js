import api from "@/utils/demo-api";
import { Users } from "@/models";
import {
  sendSuccessNotice,
  sendErrorNotice,
  closeNotice,
  getDefaultPagination,
  commitPagination,
} from "@/utils/store-util.js";

import { get } from "lodash";
const state = {
    items: [],
    pagination: {},
    loading: true,
    mode: "",
    snackbar: false,
    notice: "",
    user: new Users()
};

const getters = {};

const actions = {
    getAllUsers ({ commit }) {
      console.log("Hellooooo")
        commit("setLoading", { loading: true });
        api.getData("users?_embed=users").then(res => {
          const users = res.data;
          commitPagination(commit, users);
          commit("setLoading", { loading: false });
        });
      },
      quickSearch ({ commit }, { headers, qsFilter, pagination }) {
        // TODO: Following solution should be replaced by DB full-text search for production
        api.getData("users?_embed=users").then(res => {
          const users = res.data.filter(r =>
            headers.some(header => {
              const val = get(r, [header.value]);
              return (
                (val &&
                  val
                    .toString()
                    .toLowerCase()
                    .includes(qsFilter)) ||
                false
              );
            })
          );
          commitPagination(commit, users);
        });
      }
};

const mutations = {
    setItems (state, users) {
      state.items = users;
    },
    setPagination (state, pagination) {
      state.pagination = pagination;
    },
    setLoading (state, { loading }) {
        state.loading = loading;
    },
    setNotice (state, { notice }) {
      console.log(" notice .... ", notice);
      state.notice = notice;
    },
    setSnackbar (state, { snackbar }) {
      state.snackbar = snackbar;
    },
    setMode (state, { mode }) {
      state.mode = mode;
    },
    setUsers (state, { users }) {
      state.users = users;
    },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
