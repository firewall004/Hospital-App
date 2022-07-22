<template>
  <div>
    <!-- Statistics cards section -->
    <v-container class="my-4 mx-1" elevation="5">
      <v-row>
        <v-col class="rounded" fill-height cols="sm" :lg="3" :md="6" :sm="6" :xs="12">
          <v-card id="stats-card" hover :ripple="true" style="height: 100%" class="p-2">
            <v-card-title>
              <v-row>
                <v-col cols="3">
                  <v-card color="yellow" flat class="justify-center mt-2 pb-2 mr-2" width="350">
                    <v-icon color="white" class="pt-3 ml-4" x-large right>mdi-hospital-building </v-icon>
                  </v-card>
                </v-col>
                <v-col cols="9" class="mt-1">
                  <div>
                    <p class="body-2 black--text pt-1 font-weight-black">Microcenters</p>

                    <p class="body-2 black--text pt-0 font-weight-black">Total = {{ countOfHospitals }}</p>
                  </div>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col class="rounded" fill-height cols="sm" :lg="3" :md="6" :sm="6" :xs="12">
          <v-card id="stats-card" hover :ripple="true" style="height: 100%" class="p-2">
            <v-card-title>
              <v-row>
                <v-col cols="3">
                  <v-card color="red darken-4" flat class="justify-center mt-2 pb-2 mr-2" width="350">
                    <v-icon color="white" class="pt-3 ml-4" x-large right>mdi-card-account-details-outline </v-icon>
                  </v-card>
                </v-col>
                <v-col cols="9">
                  <div>
                    <p class="body-2 black--text pt-2 font-weight-black">My patients</p>

                    <p class="body-2 black--text font-weight-black">Total = {{ countOfPatients }}</p>
                  </div>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col class="rounded" fill-height cols="sm" :lg="3" :md="6" :sm="6" :xs="12">
          <v-card id="stats-card" hover :ripple="true" style="height: 100%" class="p-2">
            <v-card-title>
              <v-row>
                <v-col cols="3">
                  <v-card color="green" flat class="justify-center mt-2 pb-2 mr-2" width="350">
                    <v-icon color="white" class="pt-3 ml-4" x-large right>mdi-needle </v-icon>
                  </v-card>
                </v-col>
                <v-col cols="9">
                  <div>
                    <p class="body-2 black--text pt-2 font-weight-black">Total no of dialysis</p>

                    <p class="body-2 black--text pt-0 font-weight-black">Total = {{ countOfDialysis }}</p>
                  </div>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col class="rounded" fill-height cols="sm" :lg="3" :md="6" :sm="6" :xs="12">
          <v-card id="stats-card" hover :ripple="true" style="height: 100%" class="p-2">
            <v-card-title>
              <v-row justify="space-between">
                <v-col cols="3">
                  <v-card color="blue darken-1" flat class="justify-center mt-2 pb-2 mr-2" width="350">
                    <v-icon color="white" class="pt-3 ml-4" x-large right>mdi-currency-inr</v-icon>
                  </v-card>
                </v-col>
                <v-col cols="9">
                  <div>
                    <p class="body-2 black--text pt-2 font-weight-black">Amount</p>

                    <p class="body-2 black--text pt-0 font-weight-black">Total = {{ countOfAmount }}</p>
                  </div>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Statistics cards section -->

    <!-- Tabs Section -->
    <v-container fluid>
      <v-card class="pb-5 overflow-y-auto" max-height="500">
        <v-toolbar light class="mb-2">
          <v-row justify="center">
            <v-card-title class="text-center">Patients list</v-card-title>
          </v-row>
          <template #extension>
            <v-tabs
              v-model="tabs"
              background-color="primary"
              dark
              next-icon="mdi-arrow-right-bold-box-outline"
              prev-icon="mdi-arrow-left-bold-box-outline"
              show-arrows
              style="border-top: groove; border-width: 1px"
            >
              <v-tabs-slider color="white"></v-tabs-slider>
              <v-tab v-for="(item, i) in branches" :key="i" @change="patientsInHospital(item)">
                {{ item.centre_name }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>

      <v-card class="pb-5 overflow-y-auto" max-height="500">
        <v-tabs-items v-model="tabs">
          <v-tab-item v-for="(rand, i) in branches" :key="i" :transition="false" class="ma-2">
            <v-row>
              <v-col
                v-for="(data, index) in patients"
                :key="index"
                :transition="false"
                class="d-flex flex-column"
                cols="sm"
                :lg="3"
                :sm="6"
              >
                <nuxt-link
                  :to="{
                    path: 'doctor/patients-details',
                    query: { id: data.patient_id },
                  }"
                  class="text-decoration-none"
                >
                  <v-card id="patient-card" tile flat hover :ripple="true" class="text-center my-n1 rounded-lg">
                    <v-card-text class="font-weight-black primary--text" v-text="data.name"></v-card-text>
                  </v-card>
                </nuxt-link>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
    <!-- Tabs Section -->

    <!-- Realtime logs Section -->
    <v-container class="my-4" elevation="5">
      <v-card>
        <v-card color="primary" class="white--text">
          <v-row justify="center">
            <v-card-title class="text-center"> Real time logs (Dummy) </v-card-title>
          </v-row>
        </v-card>
        <v-divider></v-divider>
        <v-card-text class="pa-4 font-weight-semi-bold">
          03/22 08:51:01 INFO :.main: *************** RSVP Agent started *************** 02 <br />
          03/22 08:51:01 INFO :...locate_configFile: Specified configuration file: /u/user10/rsvpd1.conf
          <br />
          03/22 08:51:01 INFO :.main: Using log level 511 03/22 08:51:01 INFO :..settcpimage: Get TCP images rc -
          EDC8112I Operation not supported on socket. 03 <br />
          03/22 08:51:01 INFO :..settcpimage: Associate with TCP/IP image name = TCPCS <br />
          03/22 08:51:02 INFO :..reg_process: registering process with the system<br />
          03/22 08:51:02 INFO :..reg_process: attempt OS/390 registration <br />
          03/22 08:51:02 INFO :..reg_process: return<br />
          from registration rc=0 04 <br />
          03/22 08:51:06 TRACE :...read_physical_netif: Home list entries returned = 7 <br />
          03/22 08:51:06 INFO :...read_physical_netif: index #0, interface VLINK1 has address 129.1.1.1, ifidx 0 <br />
          03/22 cated for rsvp-udp <br />
          03/22 08:51:06 TRACE :..entity_initialize: interface 129.1.1.1, <br />
          entity for rsvp allocated and initialized <br />
          03/22 08:51:06 INFO :.....mailslot_create: creating <br />
          mailslot for RSVP <br />
          03/22 08:51:06 INFO :....mailbox_register: mailbox allocated for rsvp <br />
          03/22 08:51:06 INFO :.....mailslot_create: creating mailslot for RSVP via UDP 03/22 08:51:06<br />
          WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available. 03/22
          <br />
          08:51:06 INF initialized
        </v-card-text>
      </v-card>
    </v-container>
    <!-- Realtime logs Section -->

    <!-- Patient details page -->
    <v-card v-if="show" class="pt-3 mt-3">
      <div>
        <h1 class="text-center">Patient details</h1>
      </div>
      <v-divider color="black"></v-divider>
      <div class="pt-3 pb-3 table-wrapper-scroll-y my-custom-scrollbar">
        <v-row>
          <v-col v-for="(data, key) in patientDetails" :key="key" cols="6">
            <v-row justify="space-around">
              <v-col md="6">
                <p class="text-capitalize font-weight-bold">{{ key }} :</p>
                <p class="text-capitalize">{{ data }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="text-center pt-3">
          <v-btn color="primary">Graph & Statistics</v-btn>
          <v-btn color="primary" class="p-3">Prescription</v-btn>
          <v-btn color="primary" class="p-3">Blood Report</v-btn>
        </div>
      </div>
    </v-card>
    <!-- Patient details page -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'doctor',
  data() {
    return {
      countOfPatients: 0,
      countOfAmount: 0,
      show: false,
      patientDetails: {},
      tabs: null,
    }
  },
  head() {
    return {
      title: 'Doctor Home',
    }
  },
  computed: {
    ...mapGetters({
      branches: 'doctor/getBranch',
      patients: 'doctor/getPatientsList',
      countOfHospitals: 'doctor/getHospitalsCount',
      countOfDialysis: 'doctor/getDialysisCount',
    }),
  },
  watch: {
    branches(val) {
      this.patientsInHospital(val[0])
    },
  },
  created() {
    this.$store.dispatch('doctor/fetchDoctorBranches')
    this.$store.dispatch('doctor/fetchHospitalsCount')
    this.$store.dispatch('doctor/fetchDialysisCount')
  },
  methods: {
    patientsInHospital(item) {
      this.$store.dispatch('doctor/fetchPatientsList', item)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/_vars.scss';
.scroll {
  overflow-y: scroll;
  overflow-x: hidden;
}

#patient-card {
  background-color: $patient-card-bg-color;
}

#stats-card {
  border-radius: 32px;
  background: #fff;
  box-shadow: 20px 20px 60px #cfcfcf, -20px -20px 60px #fff;
}
</style>
