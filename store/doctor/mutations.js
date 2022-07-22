const mutations = {
  setDoctorBranch(state, branchList) {
    state.branch = branchList
  },
  setPatientsList(state, patientsList) {
    state.patientsList = patientsList
  },
  setHospitalsCount(state, count) {
    state.countOfHospitals = count
  },
  setDialysisCount(state, count) {
    state.countOfDialysis = count
  },
}
export default mutations
