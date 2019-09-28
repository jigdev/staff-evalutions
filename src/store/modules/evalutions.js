import api from "@/utils/demo-api";
import { Evalution } from "@/models";
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
  evalution: new Evalution(),
  evalutions: [],
  evalutionList: [],
};

const getters = {};

const actions = {

  getEvalutionById ({ commit }, id) {
    commit("setLoading", { loading: true });
    if (id) {
      api.getData("evalutions/" + id).then(
        res => {
          const evalution = res.data;
          commit("setEvalution", { evalution });
          commit("setLoading", { loading: false });
        },
        err => {
          console.log(err);
        }
      );
    } else {
      commit("setEvalution", { evalution: new Evalution() });
      commit("setLoading", { loading: false });
    }
  },
  getAllEvalutions ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("evalutions?_embed=evalutions").then(res => {
      const evalutions = res.data;
      commitPagination(commit, evalutions);
      commit("setLoading", { loading: false });
    });
  },
  // Get single Evaltion to load questions into form
  getSignleEvalution ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("evalutions?_embed=evalutions").then(res => {
      const evalutions = res.data[0];
      commitPagination(commit, evalutions);
      commit("setLoading", { loading: false });
    });
  },
  searchEvalutions ({ commit }, searchQuery, pagination) {
    api.getData("evalutions?_embed=evalutions&" + searchQuery).then(res => {
      const evalutions = res.data;
      commitPagination(commit, evalutions);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for production
    api.getData("evalutions?_embed=evalutions").then(res => {
      const evalutions = res.data.filter(r =>
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
      evalutions.forEach(item => {
        item.orderAmount = item.orders.length;
      });
      commitPagination(commit, evalutions);
    });
  },
  deleteEvalution ({ commit, dispatch }, id, query, pagination) {
    api
      .deleteData("evalutions/" + id.toString())
      .then(res => {
        return new Promise((resolve, reject) => {
          sendSuccessNotice(commit, "Operation is done.");
          resolve();
        });
      })
      .catch(err => {
        console.log(err);
        sendErrorNotice(commit, "Operation failed! Please try again later. ");
        closeNotice(commit, 1500);
      });
  },
  saveEvalution ({ commit, dispatch }, evalution) {
    if (!evalution.id) {
      api
        .postData("evalutions/", evalution)
        .then(res => {
          const evalution = res.data;
          commit("setEvalution", { evalution });
          sendSuccessNotice(commit, "New evalution has been added.");
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .putData("evalution/" + evalution.id.toString(), evalution)
        .then(res => {
          const evalution = res.data;
          commit("setEvalution", { evalution });
          sendSuccessNotice(commit, "Customer has been updated.");
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    }
  },
  closeSnackBar ({ commit }, timeout ) {
    closeNotice(commit, timeout);
  }
};

const mutations = {
  setEvalutionList (state, evalution) {
    state.evalution = evalution;
  },
  setItems (state, evalutions) {
    state.items = evalutions;
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
  setEvalution (state, { evalution }) {
    state.evalution = evalution;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
