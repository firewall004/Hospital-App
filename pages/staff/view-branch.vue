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

    <v-card :elevation="4" class="mx-auto my-2">
      <v-card-text>
        <v-row v-for="(value, propertyName) in tableData" :key="propertyName">
          <v-row class="d-flex ma-4">
            <v-col class="d-flex align-start">
              <span class="font-weight-bold align-start">{{ propertyName }}</span>
            </v-col>
            <v-col class="d-flex align-end">
              <span class="font-weight-semibold align-end">{{ value }}</span>
            </v-col>
          </v-row>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'staff',
  data() {
    return {
      tableData: {},
    }
  },
  head() {
    return {
      title: 'View Branch',
    }
  },
  computed: {
    ...mapState('staff', {
      branch: (state) => state.branchDetails,
    }),
  },
  mounted() {
    this.tableData = {
      'Hospital Name': this.branch.centre_name,
      'Registration Fee': this.branch.registration_fee,
      'Normal Dialysis Charge (OPD)': this.branch.normal_fee,
      'Emergency Dialysis Charge (IPD)': this.branch.emergency_fee,
      'Extra hours Dialysis Charge(per hour)': this.branch.per_hour_fee,
    }
  },
}
</script>
