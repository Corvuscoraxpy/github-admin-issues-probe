export const loadRepoListAction = (repoList) => ({
  type: 'LOAD_REPO_LIST',
  repoList,
});

export const selectRepoAction = (selectedRepo) => ({
  type: 'SELECT_REPO',
  selectedRepo
})
