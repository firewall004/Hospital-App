export const state = () => ({
  branchDetails: {},
})

export const getters = {
  getBranchDetails(state) {
    return state.branchDetails
  },
}

export const mutations = {
  SET_STAFF_BRANCH_DETAILS(state, branchDetails) {
    state.branchDetails = branchDetails
  },
}

export const actions = {
  setStaffBranchDetails({ commit }, branchDetails) {
    commit('SET_STAFF_BRANCH_DETAILS', branchDetails)
  },
}
