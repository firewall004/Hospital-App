<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <template #activator="{ on, attrs }">
        <v-btn class="primary ml-3 mb-4" v-bind="attrs" v-on="on"
          ><v-icon dense>mdi-plus-box</v-icon>&nbsp; Add Prescription</v-btn
        >
      </template>
      <v-card>
        <v-row justify="space-between" no-gutters>
          <v-card-title class="text-h5 primary--text">Add Prescription </v-card-title>
          <v-card-actions>
            <v-btn flat @click="dialog = false"><v-icon>mdi-window-close</v-icon></v-btn>
          </v-card-actions>
        </v-row>

        <v-form ref="form" @submit.prevent="addPrescription">
          <v-card-text>
            <v-autocomplete
              v-model="form.selectedPatient"
              :items="patients.name"
              label="Select Patient"
              :rules="fieldValidation"
              required
            >
            </v-autocomplete>
            <v-textarea
              v-model="form.prescription"
              :rules="fieldValidation"
              label="Prescription"
              :counter="250"
              :maxlength="250"
              required
              filled
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary pa-4 mb-5" type="submit" @click="dialog = false">
              <v-icon dense>mdi-plus-box</v-icon>&nbsp;<span class="mt-1 font-weight-bold"> Add</span></v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddPrescription',
  middleware: 'doctor',
  data() {
    return {
      form: { selectedPatient: null, prescription: '' },
      patients: {
        name: [],
        id: [],
      },
      dialog: false,
      fieldValidation: [(v) => !!v || 'Field is required'],
    }
  },
  computed: {
    ...mapState('doctor', {
      branches: (state) => state.branch,
    }),
  },
  mounted() {
    this.patientsInHospital('MMH')
  },
  methods: {
    patientsInHospital(code) {
      // FIX ME : FETCH ALL PATIENTS FROM ALL BRANCHES, RIGHT NOW ONLY FETCHING FROM ONE BRANCH (HARDCODED BRANCH) RH Brancg has no patients
      // this.branches.forEach((branch) => {
      // this.$axios.get('/api/doctor/view/patient/name_and_id/' + branch.code).then((res) => {
      // 	this.patients.concat(res.data.results.map((patient) => patient.name))
      // })
      // })
      this.$axios.get('/api/doctor/view/patient/name_and_id/' + code).then((res) => {
        this.patients.name = res.data.results.map((patient) => patient.name)
        this.patients.id = res.data.results.map((patient) => patient.patient_id)
      })
    },
    addPrescription() {
      if (this.$refs.form.validate()) {
        const pid = this.patients.id[this.patients.name.indexOf(this.form.selectedPatient)]
        this.$axios
          .post(`/api/doctor/add/prescription/${pid}`, {
            prescription: this.form.prescription,
          })
          .then((res) => {
            if (res.status === 200) {
              this.$toast.success('Successfully added', {
                theme: 'toasted-primary',
                position: 'bottom-right',
                duration: 3000,
              })
            } else {
              this.$toast.success('Please try again', {
                theme: 'toasted-red',
                position: 'bottom-right',
                duration: 3000,
              })
            }
          })
      }
    },
  },
}
</script>
