<template>
  <v-container>
    <v-row class="my-10 text-center">
      <v-col justify-center>
        <h1 class="display-2">Home Dialysis Patients</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="patient in patients" :key="patient.id" cols="12" md="6" lg="4">
        <v-card hover class="py-5 px-5" height="300">
          <v-row>
            <v-col cols="6">
              <v-card-title>{{ patient.name }}</v-card-title>
              <v-card-subtitle>{{ patient.location }}</v-card-subtitle>
            </v-col>

            <v-col>
              <v-row class="mt-5">
                <v-btn elevation="1" class="mr-5 ml-15 ml-md-10 ml-lg-16" @click="editAccount">
                  <v-icon> mdi-account-edit </v-icon>
                </v-btn>

                <v-btn elevation="1" @click="deleteAccount">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-divider />
          <v-card-subtitle class="subtitle-1"> Dialysis Charge: {{ patient.dialysisCharge }} </v-card-subtitle>
          <v-card-subtitle class="subtitle-1"> Monthly Rental: {{ patient.monthlyRental }} </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      patients: [
        {
          id: 1,
          name: 'Alex Ramey Malik',
          location: 'Lagos',
          dialysisCharge: '$2500',
          monthlyRental: '$150',
        },
        {
          id: 2,
          name: 'Alex',
          location: 'Lagos',
          dialysisCharge: '$200',
          monthlyRental: '$300',
        },
        {
          id: 3,
          name: 'Alex',
          location: 'Lagos',
          dialysisCharge: '$500',
          monthlyRental: '$100',
        },
        {
          id: 4,
          name: 'Alex',
          location: 'Lagos',
          dialysisCharge: '$400',
          monthlyRental: '$100',
        },
        {
          id: 5,
          name: 'Alex',
          location: 'Lagos',
          dialysisCharge: '$800',
          monthlyRental: '$100',
        },
        {
          id: 6,
          name: 'Alex',
          location: 'Lagos',
          dialysisCharge: '$600',
          monthlyRental: '$100',
        },
        {
          id: 7,
          name: 'Alex',
          location: 'Lagos',
          dialysisCharge: '$200',
          monthlyRental: '$100',
        },
        {
          id: 8,
          name: 'Alex',
          location: 'Lagos',
          dialysisCharge: '$100',
          monthlyRental: '$100',
        },
        {
          id: 9,
          name: 'Alex',
          location: 'Lagos',
          dialysisCharge: '$100',
          monthlyRental: '$100',
        },
        {
          id: 10,
          name: 'Alex',
          location: 'Lagos',
          dialysisCharge: '$100',
          monthlyRental: '$100',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Manage Home Dialysis',
    }
  },
  methods: {
    editAccount() {
      this.$router.push('/home-dialysis/create')
    },
    deleteAccount() {
      alert('Delete Account')
    },
  },
}
</script>
