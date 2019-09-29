import api from "@/utils/demo-api";
import { Department } from "@/models";
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
  department: new Department(),
  evalutions: [],
  departmentList: [],
};

const getters = {};

const actions = {

  getDepartmentById ({ commit }, id) {
    commit("setLoading", { loading: true });
    if (id) {
      api.getData("departments/" + id).then(
        res => {
          const department = res.data;
          console.log('Department By ID ' + res.data);
          commit("setDepartment", { department });
          commit("setLoading", { loading: false });
        },
        err => {
          console.log(err);
        }
      );
    } else {
      commit("setDepartment", { department: new Department() });
      commit("setLoading", { loading: false });
    }
  },
  getAllDepartments ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("departments?_embed=departments").then(res => {
      const departments = res.data;
      commitPagination(commit, departments);
      commit("setLoading", { loading: false });
    });
  },
  // Get single Evaltion to load questions into form
  getSignleDepartment ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("departments?_embed=departments").then(res => {
      const departments = res.data[0];
      commitPagination(commit, departments);
      commit("setLoading", { loading: false });
    });
  },
  searchDepartments ({ commit }, searchQuery, pagination) {
    api.getData("departments?_embed=departments&" + searchQuery).then(res => {
      const departments = res.data;
      commitPagination(commit, departments);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for production
    api.getData("departments?_embed=departments").then(res => {
      const departments = res.data.filter(r =>
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

      commitPagination(commit, departments);
    });
  },
  deleteDepartment({ commit, dispatch }, id, query, pagination) {
    api
      .deleteData("departments/" + id.toString())
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
  saveDepartment ({ commit, dispatch }, department) {
    if (!department.id) {
      api
        .postData("departments/", department)
        .then(res => {
          const departments = res.data;
          console.log("Check department >> " + departments);
          commit("setDepartments", { departments });
          sendSuccessNotice(commit, "New department has been added.");
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .putData("department/" + department.id.toString(), department)
        .then(res => {
          const department = res.data;
          commit("setDepartment", { department });
          sendSuccessNotice(commit, "Department has been updated.");
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
  setDepartmentList(state, department) {
    state.department = department;
  },
  setItems (state, departments) {
    state.items = departments;
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
  setDepartment (state, { department }) {
    state.department = department;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
