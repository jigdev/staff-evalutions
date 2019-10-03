const getItems = (state) => {
  return state.items;
};

const getPagination = (state) => {
  return state.pagination;
};

const getLoading = (state) => {
  return state.loading;
};

const getMode = (state) => {
  return state.mode;
};

const getSnackbar = (state) => {
  return state.snackbar;
};
const getNotice = (state) => {
  return state.snackbar;
};

export default {
  getItems,
  getPagination,
  getLoading,
  getMode,
  getSnackbar,
  getNotice

};