const actions = {
  fetchDoctorBranches({ commit }) {
    this.$axios.$get('/api/doctor/view/branch').then((response) => {
      commit('setDoctorBranch', response.results)
    })
  },
  fetchPatientsList({ commit }, item) {
    this.$axios.get('/api/doctor/view/patient/name_and_id/' + item.code).then((res) => {
      commit('setPatientsList', res.data.results)
    })
  },
  fetchHospitalsCount({ commit }) {
    this.$axios.get('/api/doctor/view/total/hospital/').then((res) => {
      commit('setHospitalsCount', res.data.results)
    })
  },
  fetchDialysisCount({ commit }) {
    this.$axios.get('/api/doctor/view/dialysis/count').then((res) => {
      commit('setDialysisCount', res.data.results)
    })
  },
}
export default actions
