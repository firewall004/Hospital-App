<template>
  <v-container>
    <v-card color="primary">
      <v-card-title class="text-center white--text">
        <v-container>
          <span class="text-lg-h3">
            <v-icon color="white" x-large left>mdi-hospital-building </v-icon>
            {{ branch.centre_name }}
          </span>
        </v-container>
      </v-card-title>
    </v-card>

    <v-row class="text-center my-2">
      <v-col cols="sm" :lg="4" :sm="12" class="my-2">
        <v-card id="stats-card">
          <v-card-title class="text-center">
            <span class="text-lg-subtitle-2">Total Beds :</span>
            <span class="text-lg-h5 primary--text ml-2">{{ statisticsCardData.total_beds }}</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="sm" :lg="4" :sm="12" class="my-2">
        <v-card id="stats-card">
          <v-card-title class="text-center">
            <span class="text-lg-subtitle-2">Currently dialysing :</span>
            <span class="text-lg-h5 primary--text ml-2">{{ statisticsCardData.curresntly_dialysing }}</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="sm" :lg="4" :sm="12" class="my-2">
        <v-card id="stats-card">
          <v-card-title class="text-center">
            <span class="text-lg-subtitle-2">Beds available :</span>
            <span class="text-lg-h5 primary--text ml-2">{{ statisticsCardData.availbale_beds }}</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-container v-if="show" class="d-flex align-center flex-row">
      <v-card class="mx-auto my-12" width="700" outlined>
        <v-card-actions class="d-flex justify-end">
          <v-btn flat @click="show = !show"><v-icon>mdi-window-close</v-icon></v-btn>
        </v-card-actions>
        <patient-register @patients-register="patientsRegister" />
      </v-card>
    </v-container>

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
                <v-btn color="primary" class="white--text" @click="show = !show">Register new patient</v-btn>
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
                  <v-col v-for="(item, i) in patients" :key="i" class="rounded" fill-height cols="sm" :lg="4" :sm="12">
                    <nuxt-link
                      :to="{
                        path: '/staff/pre-dialysis',
                        query: { id: item.pid },
                      }"
                      class="text-decoration-none"
                    >
                      <v-card flat tile class="p-2 patient_cards">
                        <v-card-title class="primary--text">
                          <v-row>
                            <v-col cols="12">
                              <div class="info-box-content">
                                <span class="body-2 pt-0 font-weight-black" v-text="item.patient_name"></span>
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-title>
                      </v-card>
                    </nuxt-link>
                  </v-col>
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

    <patient-details v-if="showPatientDetails" :value="objectOfPatient" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import PatientRegister from '~/components/Patient/PatientRegister.vue'
import CurrentDialysing from '~/components/Patient/CurrentDialysing'
import PatientDetails from '~/components/Patient/PatientDetails.vue'

export default {
  components: {
    PatientRegister,
    CurrentDialysing,
    PatientDetails,
  },
  middleware: 'staff',
  data() {
    return {
      container: true,
      statisticsCardData: {
        total_beds: 3,
        curresntly_dialysing: 3,
        availbale_beds: 0,
      },
      search: '',
      fieldRules: [(v) => !!v || 'This field is required'],
      phoneNumberRules: [
        (value) => !!value || 'Please enter 10 digits.',
        (value) => Number.isInteger(Number(value)) || 'The value must be an integer',
        (value) => (value && value.length === 10) || 'must be 10 digits',
      ],
      show: false,
      patients: [],
      bp_systolic: '',
      objectOfPatient: {},
      showPatientDetails: false,
      availableBeds: null,
      totalBeds: null,
      currentDialysing: null,
    }
  },
  fetch() {
    this.getPatients()
    this.getBedsDetails()
  },
  head() {
    return {
      title: 'Dashboard',
    }
  },
  computed: {
    ...mapState('staff', {
      branch: (state) => state.branchDetails,
    }),
  },
  mounted() {
    this.getPatients()
    this.getStatisticsCardData()
  },
  methods: {
    getBedsDetails() {
      this.$axios.get('/api/staff/view/available/beds').then((res) => {
        this.availableBeds = res.data.data.availbale_beds
        this.currentDialysing = res.data.data.curresntly_dialysing
        this.totalBeds = res.data.data.total_beds
      })
    },
    patientsRegister(form) {
      this.$axios.post('/api/staff/register/patient/', form).then((res) => {
        this.$toast.success('Successfully Registered', {
          theme: 'toasted-primary',
          position: 'bottom-right',
          duration: 3000,
        })
      })
    },
    detailsOfPatient(item) {
      this.$axios.get('/api/staff/patient/details/' + item.pid).then((res) => {
        const object1 = res.data.results.data
        const object2 = {}
        object2.Name = object1.name
        object2['Patient Id'] = object1.patient_id
        object2.Age = object1.age
        object2.Gender = object1.gender
        object2.Mobile = object1.phone_number
        object2.Address = object1.address
        object2['Amount Due'] = object1.amount_due.original.results
        this.objectOfPatient = object2
        this.container = false
        this.showPatientDetails = !this.showPatientDetails
      })
    },
    getPatients() {
      this.$axios.get('/api/staff/getManagePatient').then((res) => {
        this.patients = res.data.data
      })
    },
    preDialysis() {
      alert('hi')
    },
    payDue() {
      alert('hi')
    },
    getStatisticsCardData() {
      this.$axios.get('/api/staff/view/available/beds').then((res) => {
        this.statisticsCardData = res.data.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/_vars.scss';

#stats-card {
  border-radius: 10px;
  background: #fff;
  box-shadow: 20px 20px 60px #cfcfcf, -20px -20px 60px #fff;
}
.patient_cards {
  background-color: $patient-card-bg-color;
}
</style>
