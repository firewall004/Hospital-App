const getters = {
  getBranch(state) {
    return state.branch
  },
  getPatientsList(state) {
    return state.patientsList
  },
  getHospitalsCount(state) {
    return state.countOfHospitals
  },
  getDialysisCount(state) {
    return state.countOfDialysis
  },
}
export default getters
