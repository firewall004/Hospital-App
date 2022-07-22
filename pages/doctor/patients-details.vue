<template>
  <div>
    <div v-if="show" class="pt-3 mt-3">
      <div>
        <h1 class="text-center primary--text">Patient details</h1>
      </div>
      <v-divider color="black"></v-divider>
      <div class="pt-3 pb-3 table-wrapper-scroll-y my-custom-scrollbar">
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row>
                <v-col v-for="(data, key) in patientDetailsForHead" :key="key" cols="6">
                  <v-row justify="space-around">
                    <v-col class="px-6">
                      <span class="text-capitalize font-weight-bold">{{ key }} : </span>
                      <span class="text-capitalize">{{ data }}</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col v-for="(data, key, index) in patientDetailsContent" :key="key" cols="6">
                  <v-row justify="space-around">
                    <v-col v-if="index % 2 != 0" class="">
                      <span class="text-capitalize font-weight-bold">{{ key }} : </span>
                      <span class="text-capitalize">{{ data }}</span>
                    </v-col>

                    <v-col v-else>
                      <span class="text-capitalize font-weight-bold pl-3">{{ key }} : </span>
                      <span class="text-capitalize">{{ data }}</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>

    <div>
      <v-card height="500">
        <v-sheet color="white" elevation="1" justify-center>
          <v-card justify-center color="primary" class="my-8">
            <v-card-title class="text-center">
              <v-row justify="center" class="py-2">
                <span class="font-weight-semibold white--text">Prescriptions</span>
              </v-row>
            </v-card-title>
          </v-card>
          <add-prescription />
          <v-divider class="my-2" />

          <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 600px" />
        </v-sheet>
      </v-card>

      <p></p>
      <v-card height="900">
        <v-sheet color="white" elevation="1">
          <v-card justify-center color="primary" class="my-8">
            <v-card-title class="text-center">
              <v-row justify="center" class="py-2">
                <span class="font-weight-semibold white--text">Patient Reports</span>
              </v-row>
            </v-card-title>
          </v-card>

          <v-divider class="my-2" />

          <v-container>
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="selectedBranch"
                  :items="branches"
                  item-text="centre_name"
                  item-value="code"
                  solo
                  label="Select Branch"
                  @change="handleBranchChange"
                />
              </v-col>

              <v-col cols="6">
                <v-autocomplete
                  v-model="selectedPatient"
                  :items="patientUsers"
                  item-text="name"
                  item-value="patient_id"
                  solo
                  label="Select Patient"
                />
              </v-col>
            </v-row>
          </v-container>

          <v-row>
            <v-col>
              <v-card-title class="justify-center no-padding">
                <span class="font-weight-semibold">User Report</span>
              </v-card-title>

              <patient-user-report :patient-id="selectedPatient" />
            </v-col>

            <v-col>
              <v-card-title class="justify-center no-padding">
                <span class="font-weight-semibold">Blood Report</span>
              </v-card-title>

              <patient-blood-report :patient-id="selectedPatient" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-card>
      <v-card>
        <v-toolbar color="primary" class="mx-3" dark>
          <v-row justify="center">
            <v-toolbar-title class="font-weight-black">Graphs &amp; Statistics</v-toolbar-title>
          </v-row>
          <template #extension>
            <v-tabs v-model="tab" centered center-active show-arrows>
              <v-tabs-slider color="white"></v-tabs-slider>

              <v-tab> Dialysis Parameters </v-tab>
              <v-tab> Conditions </v-tab>
              <v-tab>Cons &amp; Pharma</v-tab>
              <v-tab>Blood Report</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="tab" class="mt-1">
          <v-tab-item class="px-1">
            <v-row justify="center" class="mx-auto my-2">
              <v-card>
                <weight-chart />
              </v-card>
            </v-row>
            <v-row justify="center" class="mx-auto my-2">
              <v-card>
                <bp-stolic-graph />
              </v-card>
            </v-row>
            <v-row justify="center" class="mx-auto my-2">
              <v-card>
                <bp-diastolic-graph />
              </v-card>
            </v-row>
          </v-tab-item>
          <v-tab-item class="px-1">
            <v-row justify="center" class="mx-auto">
              <v-row justify="center" class="mx-auto my-2">
                <v-card class="mb-2 ml-1">
                  <pre-post-dial-conditions-chart />
                </v-card>
              </v-row>
            </v-row>
          </v-tab-item>
          <v-tab-item class="px-1">
            <v-row justify="center" class="mx-auto my-2">
              <v-card class="mb-2 ml-1">
                <consumables-chart />
              </v-card>
            </v-row>
          </v-tab-item>
          <v-tab-item class="px-1">
            <v-row justify="center" class="mx-auto my-2">
              <v-card>
                <hb-vs-pharma-graph />
              </v-card>
              <v-card class="my-2">
                <creatinine-value-chart />
              </v-card>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { mapGetters } from 'vuex'
import AddPrescription from '~/components/Doctor/AddPrescription.vue'
import WeightChart from '~/components/Graphs/patient-graphs/WeightChart'
import BpDiastolicGraph from '~/components/Graphs/patient-graphs/BpDiastolicGraph'
import BpStolicGraph from '~/components/Graphs/patient-graphs/BpStolicGraph'
import CreatinineValueChart from '~/components/Graphs/patient-graphs/CreatinineValueChart'
import ConsumablesChart from '~/components/Graphs/patient-graphs/ConsumablesChart'
import HbVsPharmaGraph from '~/components/Graphs/patient-graphs/HbVsPharmaGraph'
import PrePostDialConditionsChart from '~/components/Graphs/patient-graphs/PrePostDialConditionsChart'
import PatientUserReport from '~/components/Patient/PatientUserReport'
import PatientBloodReport from '~/components/Patient/PatientBloodReport'

export default {
  components: {
    AddPrescription,
    WeightChart,
    BpDiastolicGraph,
    BpStolicGraph,
    PrePostDialConditionsChart,
    CreatinineValueChart,
    ConsumablesChart,
    HbVsPharmaGraph,
    PatientUserReport,
    PatientBloodReport,
  },
  data() {
    return {
      patients: [],
      value: [],
      show: false,
      patientDetails: {},
      patientDetailsForHead: {},
      patientDetailsContent: {},
      selectedBranch: null,
      selectedPatient: null,
      tab: null,
    }
  },
  fetch() {
    this.patientsDetails()
  },
  head() {
    return {
      title: 'Patients Details',
    }
  },
  computed: {
    ...mapGetters({
      branches: 'doctor/getBranch',
      patientUsers: 'doctor/getPatientsList',
    }),
  },
  mounted() {
    const columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        width: 110,
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 180,
      },
      {
        headerName: 'Prescription',
        field: 'prescription',
        tooltipField: 'prescription',
        width: 400,
      },
    ]
    const gridOptions = {
      columnDefs,
      defaultColDef: {
        sortable: true,
        filter: true,
      },
      enableBrowserTooltips: true,
      columnHoverHighlight: true,
      enableCellTextSelection: true,
      ensureDomOrder: true,
    }

    this.$axios('/api/doctor/show/prescription').then((response) => {
      gridOptions.api.setRowData(response.data.data)
    })

    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
  methods: {
    patientsDetails() {
      const id = this.$route.query.id
      this.$axios.get('/api/doctor/view/patient/details/' + id).then((res) => {
        this.patientDetails = Object.assign(this.patientDetails, res.data.results)
        this.patientDetailsForHead.patient_id = this.patientDetails.patient_id
        this.patientDetailsForHead.name = this.patientDetails.name
        this.patientDetailsForHead.email = this.patientDetails.email
        this.patientDetailsForHead.dob = this.patientDetails.dob
        this.patientDetailsForHead.age = this.patientDetails.age
        this.patientDetailsForHead.gender = this.patientDetails.gender
        this.patientDetailsForHead.phone_number = this.patientDetails.phone_number
        this.patientDetailsForHead.address = this.patientDetails.address
        this.patientDetailsContent.dpw = this.patientDetails.dpw
        this.patientDetailsContent.awaiting_transplantation = this.patientDetails.awaiting_transplantation
        this.patientDetailsContent.blood_group = this.patientDetails.blood_group
        this.patientDetailsContent.CKD_5D_HTN = this.patientDetails.CKD_5D_HTN
        this.patientDetailsContent.stability = this.patientDetails.stability
        this.patientDetailsContent.heart_function = this.patientDetails.heart_function
        this.patientDetailsContent.injection = this.patientDetails.injection
        this.patientDetailsContent.urea = this.patientDetails.urea
        this.patientDetailsContent.creatinine = this.patientDetails.creatinine
        this.patientDetailsContent.bun = this.patientDetails.branch_name
        this.patientDetailsContent.branch_name = this.patientDetails.bun
        this.patientDetailsContent.ecg = this.patientDetails.ecg
        this.patientDetailsContent.hhh = this.patientDetails.hhh
        this.patientDetailsContent.bp_stable = this.patientDetails.bp_stable
        this.patientDetailsContent.habits = this.patientDetails.habits
        this.patientDetailsContent.diet = this.patientDetails.diet
        this.patientDetailsContent.a = this.patientDetails.a
        this.patientDetailsContent.v = this.patientDetails.v
        this.patientDetailsContent.n = this.patientDetails.n
        this.patientDetailsContent.s = this.patientDetails.s
        this.patientDetailsContent.d = this.patientDetails.d
        this.patientDetailsContent.access = this.patientDetails.access
        this.patientDetailsContent.covid = this.patientDetails.covid
        this.patientDetailsContent.doctor = this.patientDetails.doctor
        this.patientDetailsContent.coin = this.patientDetails.coin
        this.patientDetailsContent.knowing_source = this.patientDetails.knowing_source
        this.patientDetailsContent.profile_link = this.patientDetails.profile_link
        this.patientDetailsContent.blocked = this.patientDetails.blocked

        this.show = true
      })
    },
    handleBranchChange(e) {
      const item = { code: this.selectedBranch }
      this.$store.dispatch('doctor/fetchPatientsList', item)
    },
  },
}
</script>
<style>
.scroll {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
