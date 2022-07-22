// NOTE: We are not using the $auth for any purpose
// Reason: https://auth.nuxtjs.org/schemes/local/#backend
export const state = () => ({
  branch: [],
})

export const getters = {
  getRole(state, getters, rootState) {
    return rootState.auth.role
  },

  isAuthenticated(state, getters, rootState) {
    return rootState.auth.isAuthenticated
  },

  loggedInUser(state, getters, rootState) {
    return rootState.auth.user
  },

  getBranch(state) {
    return state.branch
  },
}

export const mutations = {
  SET_USER_BRANCH(state, branch) {
    state.branch = branch
  },
}

export const actions = {
  setUserRole({ commit }, role) {
    this.$auth.$storage.setUniversal('role', role)

    // if (role === 'doctor') {
    // 	this.$axios.$get('/api/doctor/view/branch').then((response) => {
    // 		this.dispatch('doctor/setDoctorBranch', response.results)
    // 	})
    // }

    // if (role === 'staff') {
    // 	this.$axios.$get('/api/staff/view/branch/details').then((response) => {
    // 		this.dispatch('staff/setStaffBranchDetails', response.data)
    // 	})
    // }
  },

  setIsAuthenticated({ commit }, isAuthenticated) {
    this.$auth.$storage.setUniversal('isAuthenticated', isAuthenticated)
  },

  setUser({ commit }, user) {
    this.$auth.$storage.setUniversal('user', user)
    if (user && user.branch) {
      commit('SET_USER_BRANCH', user.branch.split(','))
    }
  },

  setToken({ commit }, token) {
    this.$auth.$storage.setUniversal('token', token)
  },

  syncLoginUser() {
    this.$auth.$storage.syncUniversal('role', '')
    this.$auth.$storage.syncUniversal('isAuthenticated', '')
    this.$auth.$storage.syncUniversal('user', '')
    this.$auth.$storage.syncUniversal('token', '')
  },

  clearUserData({ state }) {
    this.dispatch('user/setUser', {})
    this.dispatch('user/isAuthenticated', false)
    this.dispatch('user/setUserRole', '')
    this.dispatch('user/setToken', '')
    this.dispatch('user/syncLoginUser')
  },
}
