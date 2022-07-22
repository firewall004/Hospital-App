<template>
  <v-container justify-center class="text-center px-lg-16 px-sm-6 py-8" fluid>
    <v-row class="justify-center">
      <h1 class="primary--text font-weight-black text-uppercase">{{ selectedPatient }}'s&nbsp; Reports</h1>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="selectedPatient"
          :items="patients"
          item-text="name"
          item-value="patient_id"
          label="Patient"
          class="my-5"
          :rules="fieldValidation"
          @change="patientChangeHandler"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row justify="center" class="py-2">
      <blood-report-table :patient_id="patient_id" />
    </v-row>
    <v-toolbar color="primary" dark>
      <v-row justify="center">
        <v-toolbar-title class="font-weight-black">Reports</v-toolbar-title>
      </v-row>
      <template #extension>
        <v-tabs v-model="tab" centered center-active show-arrows>
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab> Hospital Report </v-tab>
          <v-tab> Complete Blood Report </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item class="px-1">
        <renal-report :patient-id="patientId" />
      </v-tab-item>
      <v-tab-item class="px-1">
        <complete-blood-report :patient-id="patientId" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import CompleteBloodReport from '~/components/Staff/CompleteBloodReport.vue'
import RenalReport from '~/components/Staff/RenalReport.vue'
import BloodReportTable from '~/components/Staff/BloodReportTable.vue'
export default {
  components: {
    CompleteBloodReport,
    RenalReport,
    BloodReportTable,
  },
  middleware: 'staff',
  data() {
    return {
      selectedPatient: 'P1',
      patientId: null,
      patients: [
        {
          patient_id: 'P1',
          name: 'P1',
        },
        {
          patient_id: 'P2',
          name: 'P2',
        },
        {
          patient_id: 'P3',
          name: 'P3',
        },
      ],

      stepCount: 1,
      tab: null,
      fieldValidation: [(v) => !!v || 'Field is required'],
    }
  },
  head() {
    return {
      title: 'Blood Report',
    }
  },
  created() {
    this.$axios.get('/v3/api/staff/get/patient/name_and_id').then((response) => {
      this.patients = response.data.data
      alert(this.patients)
    })
    // .catch((error) => {
    // 	alert(error)
    // })
  },
  methods: {
    patientChangeHandler(patient) {
      this.patientId = patient.patient_id
    },
  },
}
</script>
