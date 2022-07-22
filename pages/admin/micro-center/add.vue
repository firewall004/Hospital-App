<template>
  <v-container justify-center class="text-center px-16">
    <v-row justify="center" class="my-10">
      <v-col cols="12" justify-center>
        <h1 class="display-2">Microcenter resources</h1>
      </v-col>
    </v-row>

    <v-card elevation="4">
      <v-card class="pt-3" elevation="2">
        <v-row cols="2" class="pt-4">
          <v-col cols="12" class="pa-4">
            <v-btn elevation="2" class="primary title" @click="schemeMJPJAY">MJPJAY Scheme</v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-4">
          <v-col v-if="MJPJAYFormIsVisible" cols="8" class="pa-4">
            <v-text-field v-model="m_emergency" type="number" label="Emergency fees"></v-text-field>
            <v-text-field v-model="m_scheduled" type="number" label="Scheduled fees"></v-text-field>
            <v-text-field v-model="m_eh" type="number" label="Extra per hour fees"></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-card-subtitle class="text-h5 primary white--text">PRIVATE PATIENT COST</v-card-subtitle>
      <v-divider></v-divider>

      <v-card-text class="px-16">
        <v-form>
          <p class="title text-left font-weight-black">Patient charges</p>
          <v-row class="pa-4">
            <v-col cols="8">
              <v-text-field
                v-model="normal"
                prepend-icon="mdi-currency-inr"
                :rules="fieldValidation"
                type="number"
                label="Normal"
                hint="in ₹"
              ></v-text-field>
              <v-text-field
                v-model="emergency"
                prepend-icon="mdi-currency-inr"
                :rules="fieldValidation"
                type="number"
                label="Emergency"
                hint="in ₹"
              ></v-text-field>
              <v-text-field
                v-model="additionalChargePerHour"
                prepend-icon="mdi-currency-inr"
                :rules="fieldValidation"
                type="number"
                label="Extra Hour Charge (per hour)"
                hint="in ₹"
              ></v-text-field>
              <v-text-field
                v-model="registrationFee"
                prepend-icon="mdi-currency-inr"
                :rules="fieldValidation"
                type="number"
                label="Registration Fee"
                hint="in ₹"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters class="pa-4">
            <v-col cols="6" class="pa-4">
              <v-select v-model="region" :items="regions" label="Region" outlined> </v-select>
            </v-col>
            <v-col v-if="addRegionIsVisible" cols="4" class="pa-4">
              <v-text-field
                v-model="addRegionValue"
                :rules="fieldValidation"
                type="text"
                label="Enter region"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pa-4">
              <v-btn class="primary text-button" elevation="2" fab @click="addRegion">Add</v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters class="pl-4">
            <v-col cols="8">
              <v-text-field
                v-model="hospitalName"
                :rules="fieldValidation"
                type="text"
                label="Hospital Name"
                hint="Enter Hospital Name"
              ></v-text-field>
              <v-text-field
                v-model="hospitalCode"
                type="text"
                label="Hospital Code (EX : ABC)"
                :rules="fieldValidation"
              ></v-text-field>
              <v-text-field
                v-model="numberOfBeds"
                type="number"
                label="Number of Beds"
                :rules="fieldValidation"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="pa-4">
            <v-col cols="2"><p class="title text-left font-weight-black">Hospital share:</p></v-col>
            <v-col cols="3" class="pr-2">
              <v-select v-model="hospitalShareType" :items="hospitalShareTypes"></v-select>
            </v-col>
            <v-col cols="3" class="px-2">
              <v-text-field v-model="hospitalShare" type="number" label="Value" :rules="fieldValidation"></v-text-field>
            </v-col>
            <v-col cols="3" class="px-2">
              <v-select v-model="additionalchargeType" :items="additionalchargeTypes"></v-select>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters class="pa-4">
            <v-col cols="3" class="px-2">
              <p class="title text-left font-weight-black">Additional Expenses:</p>
            </v-col>
            <v-col cols="3" class="px-2">
              <v-btn class="text-button text-left font-weight-black primary" elevation="2" @click="addRow"
                >Add row</v-btn
              >
            </v-col>
          </v-row>
          <v-row v-for="(expsList, index) in additionalExpensesList" :key="index" no-gutters class="pa-2">
            <v-col cols="4" class="pa-2">
              <v-text-field
                v-model="additionalExpensesList[index].name"
                type="text"
                label="Expense for"
                :rules="fieldValidation"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pa-2">
              <v-text-field
                v-model="additionalExpensesList[index].value"
                type="number"
                label="Amount"
                :rules="fieldValidation"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pa-2">
              <v-select v-model="additionalExpensesList[index].type" :items="additionalchargeTypes"></v-select>
            </v-col>
          </v-row>
          <v-row no-gutters class="pa-4">
            <v-col cols="12" class="pa-2">
              <v-btn class="title text-left font-weight-black primary" elevation="2" @click="onSubmit"
                >Submit</v-btn
              ></v-col
            >
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      MJPJAYFormIsVisible: false,
      m_scheduled: 0,
      m_emergency: 0,
      m_eh: 0,
      normal: null,
      emergency: null,
      registrationFee: null,
      additionalChargePerHour: null,
      addRegionIsVisible: false,
      addRegionValue: null,
      hospitalName: null,
      hospitalCode: null,
      numberOfBeds: null,
      hospitalShare: null,
      extraHourCharge: null,
      additionalchargeType: 'per month',
      additionalchargeTypes: ['per month', 'per dialysis', 'per year'],
      hospitalShareType: 'as percentage',
      hospitalShareTypes: ['as percentage', 'as amount'],
      additionalExpensesList: [
        { name: 'Watchman', value: 0, type: 'per month' },
        { name: 'Nurse', value: 0, type: 'per month' },
        { name: 'House-keeping', value: 0, type: 'per month' },
        { name: 'Water', value: 0, type: 'per month' },
      ],
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
      title: 'Add Microcenter',
    }
  },
  methods: {
    submitHandler() {
      alert('Submitted')
    },
    onSubmit(e) {
      e.preventDefault()
      const date = new Date()
      const additionalExpensesArray = this.additionalExpensesList.map((exp) => ({
        centre_name: this.hospitalName,
        ...exp,
      }))
      const payload = {
        data: [
          {
            date: date,
            centre_name: this.hospitalName,
            code: this.hospitalCode,
            region: this.regions,
            beds_count: this.numberOfBeds,
            registration_fee: this.registrationFee,
            normal_fee: this.normal,
            emergency_fee: this.emergency,
            per_hour_fee: this.additionalChargePerHour,
            ap: 1,
            amount: this.hospitalShareType === 'as amount' ? this.hospitalShare : 0,
            percentage: this.hospitalShareType === 'as percentage' ? this.hospitalShare : 0,
            perdmy: this.additionalchargeType,
            scheme: 'yes',
            m_scheduled: 1100,
            m_emergency: 1100,
            m_eh: 1,
          },
          [
            ({
              consumables: [
                '16g Needle',
                '17g Needle',
                'Bed Sheet',
                'Gloves',
                'Blood Tubing',
                'Chemical m/C',
                'Chemical D&T',
                'Dialyzer',
                'Heparin',
                'IV Set',
                'NS1000 ML',
                'NS500 ML',
                'Syringe 10 ML',
                'Syringe 5 ML',
                'A/b part',
                'Transducer protector',
              ],
            },
            {
              pharmaceuticals: [
                'Inj dextrose 25% 100ml',
                'Inj multi Vit',
                'EPO 4K',
                'EPO 10K',
                'Inj Iron',
                'Inj Antibiotics',
                'Inj amino Acid',
              ],
            }),
          ],
        ],
      }
      payload.data.splice(1, 0, [...additionalExpensesArray])
      this.$axios.post('/api/admin/add/microcentre', payload).then((res) => {
        this.$toast.success('Successfully added microcenter', {
          theme: 'toasted-primary',
          position: 'bottom-right',
          duration: 3000,
        })
      })
    },
    addRegion() {
      if (this.addRegionIsVisible) {
        this.regions.push(this.addRegionValue)
        this.addRegionIsVisible = false
      } else {
        this.addRegionIsVisible = true
      }
    },
    schemeMJPJAY() {
      if (this.MJPJAYFormIsVisible) {
        this.regions.push(this.addRegionValue)
        this.MJPJAYFormIsVisible = false
      } else {
        this.MJPJAYFormIsVisible = true
      }
    },
    addRow() {
      this.additionalExpensesList.push({ name: '', value: 0 })
    },
  },
}
</script>
