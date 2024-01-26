export const UpdateURL = (path) => {
  history.pushState({}, '', path);
};
