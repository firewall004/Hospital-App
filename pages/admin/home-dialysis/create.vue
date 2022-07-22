<template>
  <v-container justify-center class="text-center px-16">
    <v-row justify="center" class="my-10">
      <v-col cols="12" justify-center>
        <h1 class="display-2">Home Dialysis</h1>
      </v-col>
    </v-row>
    <v-stepper v-model="stepCount">
      <v-stepper-header>
        <v-stepper-step :complete="stepCount > 1" step="1"> Select Patient </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepCount > 2" step="2"> Add Charges </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Patient Details </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Form-1-select patient or create a new patient entry -->

        <v-stepper-content step="1">
          <v-card elevation="4" class="py-5">
            <v-card-subtitle class="title">Select a patient for dialysis</v-card-subtitle>
            <v-card-text class="px-16">
              <v-form>
                <v-select
                  v-model="patient"
                  :items="patients"
                  :rules="patientValidation"
                  label="Select a patient"
                  class="mt-4"
                ></v-select>
              </v-form>
              <v-btn v-if="patient" :disabled="!patient" class="mt-4 pa-5" color="primary" @click="stepCount = 2"
                >Next</v-btn
              >
              <v-divider v-if="patient" class="my-8"></v-divider>
              <v-card-subtitle class="title">Want to create Home Dialysis for a new patient?</v-card-subtitle>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5" to="/statistics/patient-info"
                >Start registering new patient</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Form-2-For all the form for charges -->

        <v-stepper-content step="2">
          <v-card elevation="4" class="py-5">
            <v-card-text class="px-16">
              <v-form>
                <v-text-field
                  v-model="dialysisCharge"
                  prepend-icon="mdi-currency-inr"
                  :rules="fieldValidation"
                  type="number"
                  label="Dialysis charge"
                  hint="in ₹"
                ></v-text-field>
                <v-text-field
                  v-model="monthlyRentalCharge"
                  prepend-icon="mdi-currency-inr"
                  :rules="fieldValidation"
                  type="number"
                  label="Monthly rental charge"
                  hint="in ₹"
                ></v-text-field>
                <v-text-field
                  v-model="installationCharge"
                  prepend-icon="mdi-currency-inr"
                  :rules="fieldValidation"
                  type="number"
                  label="Installation charge"
                  hint="in ₹"
                ></v-text-field>
                <v-text-field
                  v-model="dialyzerCharge"
                  prepend-icon="mdi-currency-inr"
                  :rules="fieldValidation"
                  type="number"
                  label="Dialyzer charge"
                  hint="in ₹"
                ></v-text-field>
                <v-text-field
                  v-model="extraHourCharge"
                  prepend-icon="mdi-currency-inr"
                  :rules="fieldValidation"
                  type="number"
                  label="Extra hour charge"
                  hint="in ₹"
                ></v-text-field>
                <v-text-field
                  v-model="bloodTubingCharge"
                  prepend-icon="mdi-currency-inr"
                  :rules="fieldValidation"
                  type="number"
                  label="Blood tubing charge"
                  hint="in ₹"
                ></v-text-field>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field
                      v-model="additionalcharge"
                      prepend-icon="mdi-currency-inr"
                      type="number"
                      label="Addtional charge"
                      hint="in ₹"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="3">
                    <v-select v-model="additionalchargeType" :items="additionalchargeTypes"></v-select>
                  </v-col>
                </v-row>
                <v-text-field v-model="additionalChargeReason" label="Reason for additional charge"></v-text-field>
                <v-text-field
                  v-model="location"
                  type="location"
                  :rules="fieldValidation"
                  append-icon="mdi-map-marker"
                  label="Location"
                ></v-text-field>
                <v-text-field
                  v-model="expectedStartDate"
                  type="date"
                  :rules="fieldValidation"
                  label="Expected starting date"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary mb-5" class="pa-5 ml-10" @click="stepCount = 1">Prev</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5 mr-10" @click="stepCount = 3">Next</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Form-3-Select region, location, machine, doctor and staff -->

        <v-stepper-content step="3">
          <v-card elevation="4" class="py-5">
            <v-card-text class="px-16">
              <v-form>
                <v-autocomplete
                  v-model="region"
                  type="location"
                  prepend-icon="mdi-map-marker"
                  label="Select a region"
                  :items="regions"
                  :rules="fieldValidation"
                />
                <v-row class="my-0">
                  <v-col>
                    <v-autocomplete
                      v-model="staff"
                      prepend-icon="mdi-account-hard-hat"
                      label="Choose staff"
                      :items="staffs"
                      :rules="fieldValidation"
                    />
                  </v-col>
                  <v-col cols="2" class="mr-10"
                    ><v-btn class="mt-4" color="primary" to="/new-member/add-staff">Add Staff</v-btn></v-col
                  >
                </v-row>
                <v-row class="my-0">
                  <v-col>
                    <v-autocomplete
                      v-model="machine"
                      prepend-icon="mdi-slot-machine"
                      label="Choose machine"
                      :items="machines"
                      :rules="fieldValidation"
                    />
                  </v-col>
                  <v-col cols="2" class="mr-16"
                    ><v-btn class="mt-4" color="primary" to="/new-member/add-machine">Add Machine</v-btn></v-col
                  >
                </v-row>
                <v-row class="my-0">
                  <v-col>
                    <v-autocomplete
                      v-model="doctor"
                      prepend-icon="mdi-doctor"
                      label="Choose doctor"
                      :items="doctors"
                      :rules="fieldValidation"
                    />
                  </v-col>
                  <v-col cols="2" class="mr-15"
                    ><v-btn class="mt-4" color="primary" to="/new-member/add-doctor">Add Doctor</v-btn></v-col
                  >
                </v-row>
                <v-text-field
                  v-model="roSerialNumber"
                  outlined
                  :rules="fieldValidation"
                  label="RO Serial Number"
                  class="mt-10"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary mb-5" class="pa-5 ml-10" @click="stepCount = 2">Prev</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5 mr-10" @click="submitHandler">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      patient: null,
      patients: ['p1', 'p2', 'p3'],
      bloodTubingCharge: null,
      extraHourCharge: null,
      additionalcharge: 0,
      additionalchargeType: 'per month',
      additionalchargeTypes: ['per month', 'per dialysis', 'per year'],
      additionalChargeReason: '',
      location: '',
      expectedStartDate: '',
      regions: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'],
      region: null,
      staffs: ['s1', 's2', 's3'],
      staff: null,
      machines: ['m1', 'm2', 'm3'],
      machine: null,
      doctors: ['d1', 'd2', 'd3'],
      doctor: null,
      dialysisCharge: null,
      monthlyRentalCharge: null,
      installationCharge: null,
      dialyzerCharge: null,
      roSerialNumber: '',

      stepCount: 1,

      patientValidation: [(v) => !!v || 'Patient is required'],
      fieldValidation: [(v) => !!v || 'Field is required'],
    }
  },
  head() {
    return {
      title: 'Create Home Dialysis',
    }
  },
  methods: {
    submitHandler() {
      alert('Submitted')
    },
  },
}
</script>
