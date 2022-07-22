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
                <th class="text-center">Amount Due</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in patients" :key="patient.name">
                <td>{{ patient.name }}</td>
                <td>{{ patient.age }}</td>
                <td>{{ patient.gender }}</td>
                <td>{{ patient.mobile }}</td>
                <td>{{ patient.address }}</td>
                <td>{{ patient.amtDue }}</td>
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
          <v-btn color="primary" class="mt-3 ml-8" :disabled="amount == ''" @click="paymentHandler">Pay Due</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <post-dialysis-form />
    <v-row>
      <post-dialysis-bills />
    </v-row>
  </v-container>
</template>

<script>
import PostDialysisForm from '~/components/Patient/PostDialysisForm.vue'
import PostDialysisBills from '~/components/Patient/PostDialysisBills.vue'
export default {
  components: {
    PostDialysisForm,
    PostDialysisBills,
  },
  middleware: 'staff',

  data() {
    return {
      fieldValidation: [(v) => !!v || 'Field is required'],
      patients: [
        {
          name: 'John Doe',
          age: '20',
          gender: 'M',
          mobile: '9334719198',
          address: 'Lorrem Ipsum Doramis, Dori',
          amtDue: '200',
        },
      ],
      amount: null,
    }
  },
  head() {
    return {
      title: 'Post Dialysis',
    }
  },
  mounted() {
    const pid = this.getQueryParams()
    this.$axios(`/api/staff/view/patient/${pid}`).then((response) => {
      this.patients = [
        {
          name: response.data.data.name,
          age: response.data.data.age,
          gender: response.data.data.gender,
          mobile: response.data.data.phone_number,
          address: response.data.data.address,
          amtDue: '200',
        },
      ]
    })
  },
  methods: {
    paymentHandler() {
      alert('Payment Successful')
    },
    getQueryParams() {
      return this.$route.query.pid
    },
  },
}
</script>
