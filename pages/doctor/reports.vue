<template>
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
</template>

<script>
import { mapGetters } from 'vuex'
import PatientUserReport from '~/components/Patient/PatientUserReport'
import PatientBloodReport from '~/components/Patient/PatientBloodReport'

export default {
  components: {
    PatientUserReport,
    PatientBloodReport,
  },
  middleware: 'doctor',
  data() {
    return {
      selectedBranch: null,
      selectedPatient: null,
    }
  },
  head() {
    return {
      title: 'Patient Reports',
    }
  },
  computed: {
    ...mapGetters({
      branches: 'doctor/getBranch',
      patientUsers: 'doctor/getPatientsList',
    }),
  },
  methods: {
    handleBranchChange(e) {
      const item = { code: this.selectedBranch }
      this.$store.dispatch('doctor/fetchPatientsList', item)
    },
  },
}
</script>
