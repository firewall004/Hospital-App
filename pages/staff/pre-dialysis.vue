<template>
  <v-container justify-center class="text-center px-lg-16 px-sm-8" fluid>
    <v-card elevation="2" class="my-8" color="primary">
      <v-card-subtitle class="title white--text">Patient Details</v-card-subtitle>
    </v-card>
    <v-card elevation="2" class="py-5">
      <v-card-text class="px-16">
        <v-simple-table>
          <template #default>
            <thead>
              <tr class="text-lg-h3">
                <th class="text-center">Name</th>
                <th class="text-center">Age</th>
                <th class="text-center">Gender</th>
                <th class="text-center">Mobile</th>
                <th class="text-center">Address</th>
                <th class="text-center">Due</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in patients" :key="patient.name">
                <td>{{ patient.name }}</td>
                <td>{{ patient.age }}</td>
                <td>{{ patient.gender }}</td>
                <td>{{ patient.phone_number }}</td>
                <td>{{ patient.address }}</td>
                <td>{{ patient.amount_due.original.results }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-row justify="space-between" class="my-5">
          <v-text-field
            v-model="amount"
            type="number"
            prepend-icon="mdi-currency-inr"
            placeholder="Enter Amount"
          ></v-text-field>
          <v-btn color="primary" class="mt-3 ml-8" :disabled="amount == ''" @click="onSubmitPayDue">Pay Due</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card elevation="2" class="my-8" color="primary">
      <v-card-subtitle class="title white--text">Pre dialysis form</v-card-subtitle>
    </v-card>
    <predialysis :patient-id="$route.query.id" />
    <v-row>
      <post-dialysis-bills />
    </v-row>
  </v-container>
</template>

<script>
import Predialysis from '~/components/Patient/Predialysis.vue'
import PostDialysisBills from '~/components/Patient/PostDialysisBills.vue'
export default {
  components: {
    Predialysis,
    PostDialysisBills,
  },
  middleware: 'staff',

  data() {
    return {
      fieldValidation: [(v) => !!v || 'Field is required'],
      patients: [],
      amount: null,
    }
  },
  head() {
    return {
      title: 'Pre Dialysis',
    }
  },
  mounted() {
    this.getPatientBillDetails()
  },
  methods: {
    onSubmitPayDue() {
      this.$axios
        .get(`/patient/bill/payment/${this.patient_id}`)
        .then((res) => {
          this.$router.push('/')
        })
        .catch((err) => {
          this.$toast.error(err.message, {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 3000,
          })
        })
    },
    getPatientBillDetails() {
      this.patient_id = this.$route.query.id
      this.$axios
        .get(`/api/staff/patient/details/${this.patient_id}`)
        .then((res) => {
          this.patients.push(res.data.results.data)
        })
        .catch((err) => {
          this.$toast.error(err.message, {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 3000,
          })
        })
    },
  },
}
</script>
