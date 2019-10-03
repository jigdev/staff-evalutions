import api from "@/utils/demo-api";
import types from './types';
import { Evalution } from "@/models";
import { get } from "lodash";
import {
  sendSuccessNotice,
  sendErrorNotice,
  closeNotice,
  getDefaultPagination,
  commitPagination,
} from "@/utils/store-util.js";

export default {

  getEvalutionById ({ commit }, id) {
    commit(types.SETLOADING, { loading: true });
    if (id) {
      api.getData("evalutions/" + id).then(
        res => {

          const evalution = res.data;
          console.log('Evalutions data ' + evalution);
          commit(types.SETEVALUTION, { evalution });
          commit(types.SETLOADING, { loading: false });
        },
        err => {
          console.log(err);
        }
      );
    } else {
      commit(types.SETEVALUTION, { evalution: new Evalution() });
      commit(types.SETLOADING, { loading: false });
    }
  },
  getAllEvalutions ({ commit }) {
    commit(types.SETLOADING, { loading: true });
    api.getData("evalutions?_embed=evalutions").then(res => {
      const evalutions = res.data;
      commitPagination(commit, evalutions);
      commit(types.SETLOADING, { loading: false });
    });
  },
  // Get single Evaltion to load questions into form
  getSignleEvalution ({ commit }) {
    commit(types.SETLOADING, { loading: true });
    api.getData("evalutions?_embed=evalutions").then(res => {
      const evalutions = res.data[0];
      commitPagination(commit, evalutions);
      commit(types.SETLOADING, { loading: false });
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
          commit(types.SETEVALUTION, { evalution });
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
          commit(types.SETEVALUTION, { evalution });
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

}