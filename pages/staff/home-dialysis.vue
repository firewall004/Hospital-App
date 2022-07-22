// TODO: This has almost same as staff/index.vue // Use mixins

<template>
  <v-container color="white" elevation="1">
    <v-card color="primary">
      <v-card-title class="text-center white--text">
        <v-container>
          <span class="text-lg-h3"> Home dialysis </span>
        </v-container>
      </v-card-title>
    </v-card>

    <v-divider class="my-2"></v-divider>

    <div v-if="show" class="d-flex align-center flex-column">
      <v-card class="mx-auto" outlined>
        <patient-register @patients-register="patientsRegister" />
      </v-card>
    </div>

    <v-card class="mx-auto">
      <v-container fluid>
        <v-row class="mt-2">
          <v-col cols="sm" :lg="6" :sm="12">
            <v-card outlined>
              <v-card-title class="text-center">
                <span class="font-weight-semibold">Patients</span>
              </v-card-title>

              <v-divider class="mx-2"></v-divider>

              <div v-if="!show" class="text-center py-3">
                <v-btn color="primary" @click="show = !show">Register new patient</v-btn>
              </div>

              <v-divider class="mx-2"></v-divider>

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="mx-4 pt-4"
              ></v-text-field>
              <div class="my-3 mx-3">
                <v-row dense>
                  <v-col v-for="(item, i) in patients" :key="i" class="rounded" fill-height cols="sm" :lg="3" :sm="12">
                    <v-card flat class="p-2 patient_cards" :search="search" @click="patientDetails(item)">
                      <v-card-title>
                        <v-row>
                          <v-col cols="12">
                            <div class="info-box-content">
                              <span class="body-2 primary--text pt-0 font-weight-black" v-text="item.name"></span>
                              <br />
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-title>
                    </v-card>
                  </v-col>
                  <!-- </v-hover> -->
                </v-row>
              </div>
            </v-card>
          </v-col>

          <v-col cols="sm" :lg="6" :sm="12">
            <v-card>
              <v-card-title class="text-center">
                <span class="font-weight-semibold">Currently Dialysing</span>
              </v-card-title>

              <v-divider class="mx-2"></v-divider>

              <current-dialysing />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import PatientRegister from '~/components/Patient/PatientRegister.vue'
import CurrentDialysing from '~/components/Patient/CurrentDialysing'

export default {
  components: {
    CurrentDialysing,
    PatientRegister,
  },
  middleware: 'staff',
  data() {
    return {
      search: '',
      fieldRules: [(v) => !!v || 'This field is required'],
      phoneNumberRules: [
        (value) => !!value || 'Please enter 10 digits.',
        (value) => Number.isInteger(Number(value)) || 'The value must be an integer',
        (value) => (value && value.length === 10) || 'must be 10 digits',
      ],
      show: false,
      patients: [],
    }
  },
  fetch() {
    this.getPatients()
  },
  head() {
    return {
      title: 'Home Dialysis',
    }
  },
  methods: {
    patientsRegister(form) {
      if (this.$refs.form.validate()) {
        this.$axios.post('/api/staff/register/patient/', form).then((res) => {
          this.$toast.success('Successfully Registered', {
            theme: 'toasted-primary',
            position: 'bottom-right',
            duration: 3000,
          })
        })
      }
    },
    patientDetails() {
      this.$router.push('/predialysis-and-patient-details')
    },
    getPatients() {
      this.$axios.get('/api/staff/get/patient/name_and_id/').then((res) => {
        this.patients = res.data.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/_vars.scss';

.patient_cards {
  background-color: $patient-card-bg-color;
}
</style>
