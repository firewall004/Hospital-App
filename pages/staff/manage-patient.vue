<template>
  <v-container>
    <v-card color="primary">
      <v-card-title class="text-center white--text">
        <v-container>
          <span class="text-lg-h3">Manage Patients</span>
        </v-container>
      </v-card-title>
    </v-card>

    <v-card height="400" class="scroll my-2">
      <v-row dense class="mx-3 pt-3">
        <v-col v-for="(item, i) in patients" :key="i" class="rounded" fill-height cols="3">
          <v-card flat class="p-2 patient_cards" @click="patientDetails(item)">
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
      </v-row>
    </v-card>
    <v-card v-if="card" class="mx-auto my-12" width="700" outlined>
      <v-form ref="form" @submit.prevent="upDatePatientDetails">
        <h3 class="text-center #752b59--text my-3">Update patient</h3>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Name :</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.name" :rules="fieldRules" label="Name" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">DOB/Age:</p>
          </v-col>
          <v-col cols="7">
            <v-row>
              <v-col cols="7">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="form.dob"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.dob"
                      label="Pick the date"
                      prepend-icon="mdi-calendar"
                      readonly
                      outlined
                      :rules="fieldRules"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form.dob" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(form.dob)"> OK </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="form.age" label="Enter Age" outlined dense></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Gender:</p>
          </v-col>
          <v-col cols="7">
            <v-select
              v-model="form.gender"
              :items="GenderOptions"
              outlined
              :rules="fieldRules"
              :menu-props="{ offsetY: true }"
              label="Select Gender"
            ></v-select>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Email :</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.email" label="Email" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Phone Number:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.phone_number" label="Phone Number" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Address:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.address" :rules="fieldRules" label="Address" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Doctor:</p>
          </v-col>
          <v-col cols="7">
            <v-select
              v-model="form.doctor"
              :items="doctorOptions"
              outlined
              :menu-props="{ offsetY: true }"
              label="Select Doctor"
            ></v-select>
          </v-col>
        </v-row>
        <v-divider class="mx-2" color="black"></v-divider>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">HHH:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.hhh"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'HIV'"> HIV </v-btn>
              <v-btn :elevation="3" rounded :value="'Hepatitis B'"> Hepatitis B </v-btn>
              <v-btn :elevation="3" :value="'Hepatitis C'"> Hepatitis C </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">COVID:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.covid"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'1'"> Positive </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> Negative </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-divider class="mx-2" color="black"></v-divider>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">No.of Dialysis per week:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.dpw"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'1'"> 1 </v-btn>
              <v-btn :elevation="3" rounded :value="'2'"> 2 </v-btn>
              <v-btn :elevation="3" :value="'3'"> 3 </v-btn>
              <v-btn :elevation="3" rounded :value="'4'"> 4 </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Awaiting transplantation:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.awaiting_transplantation"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'1'"> YES </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> NO </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Blood Group:</p>
          </v-col>
          <v-col cols="7">
            <v-select
              v-model="form.blood_group"
              :items="bloodGroupOptions"
              outlined
              :rules="fieldRules"
              :menu-props="{ offsetY: true }"
              label="Select Blood Group"
            ></v-select>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">CKD 5D,HTN:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.CKD_5D_HTN" :rules="fieldRules" label="" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Stable/Unstable:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.stability"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'0'"> Stable </v-btn>
              <v-btn :elevation="3" rounded :value="'1'"> Unstable </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Heart Function:</p>
          </v-col>
          <v-col cols="7">
            <v-select
              v-model="form.heart_function"
              :items="HeartFunctionOptions"
              outlined
              :rules="fieldRules"
              :menu-props="{ offsetY: true }"
              label="Select heart function"
            ></v-select>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Heart Diseases:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.injection"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'1'"> YES </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> NO </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Urea:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.urea" :rules="fieldRules" label="Urea" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Creatinine(mg/dL):</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.creatinine"
              :rules="fieldRules"
              label="Urea"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">BUN:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.bun" label="" :rules="fieldRules" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">ECG:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.ecg"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'1'"> YES </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> NO </v-btn>
              <v-btn :elevation="3" rounded :value="'2'"> Unknown </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">BP Stable:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.bp_stable"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'yes'"> YES </v-btn>
              <v-btn :elevation="3" rounded :value="'no'"> NO </v-btn>
              <v-btn :elevation="3" rounded :value="'Unknown'"> Unknown </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Habits:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.habits"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" small :value="'No Habits'"> No Habits </v-btn>
              <v-btn :elevation="3" small rounded :value="'Tobacco'"> Tobacco </v-btn>
              <v-btn :elevation="3" small rounded :value="'Alcohol'"> Alcohol </v-btn>
              <v-btn :elevation="3" small rounded :value="'Restricted Drugs'"> Restricted Drugs </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Diet:</p>
          </v-col>
          <v-col cols="7">
            <v-select
              v-model="form.diet"
              :items="DietOptions"
              outlined
              :rules="fieldRules"
              :menu-props="{ offsetY: true }"
              label="Select heart function"
            ></v-select>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Anorexia:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle v-model="form.a" group dense required mandatory borderless color="brown" class="align-center">
              <v-btn :elevation="3" :value="'1'"> YES </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> NO </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Vomiting:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle v-model="form.v" group dense required mandatory borderless color="brown" class="align-center">
              <v-btn :elevation="3" :value="'1'"> YES </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> NO </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Nausea:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle v-model="form.n" group dense required mandatory borderless color="brown" class="align-center">
              <v-btn :elevation="3" :value="'1'"> YES </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> NO </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Swelling:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle v-model="form.s" group dense required mandatory borderless color="brown" class="align-center">
              <v-btn :elevation="3" :value="'1'"> YES </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> NO </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Diarrhea:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle v-model="form.d" group dense required mandatory borderless color="brown" class="align-center">
              <v-btn :elevation="3" :value="'1'"> YES </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> NO </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Access:</p>
          </v-col>
          <v-col cols="7">
            <v-select
              v-model="form.access"
              :items="accessOptions"
              outlined
              :menu-props="{ offsetY: true }"
              label="Select heart function"
            ></v-select>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">How do you know about us?:</p>
          </v-col>
          <v-col cols="7">
            <v-select
              v-model="form.knowing_source"
              :items="hdykauOptions"
              outlined
              :menu-props="{ offsetY: true }"
              label="Select heart function"
            ></v-select>
          </v-col>
        </v-row>
        <div class="text-center py-3">
          <v-btn color="primary" class="white--text" type="submit">Update patient</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      card: false,
      show: false,
      branch: 'MMH',
      PatientData: {},
      patients: [],
      fieldRules: [(v) => !!v || 'This field is required'],
      phoneNumberRules: [
        (value) => !!value || 'Please enter 10 digits.',
        (value) => Number.isInteger(Number(value)) || 'The value must be an integer',
        (value) => (value && value.length === 10) || 'must be 10 digits',
      ],

      menu: false,
      patient_id: '',
      form: {
        name: '',
        dob: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        age: '',
        gender: '',
        email: '',
        phone_number: '',
        address: '',
        doctor: '',
        hhh: '',
        covid: '',
        dpw: '',
        awaiting_transplantation: '',
        blood_group: '',
        CKD_5D_HTN: '',
        stability: '',
        heart_function: '',
        injection: '',
        urea: '',
        creatinine: '',
        bun: '',
        ecg: '',
        bp_stable: '',
        habits: '',
        diet: '',
        a: '',
        v: '',
        n: '',
        s: '',
        d: '',
        access: '',
        knowing_source: '',
        branch_name: '',
        coin: '',
        profile_link: '',
      },
      GenderOptions: [
        { text: 'Male', value: 'M' },
        { text: 'Female', value: 'F' },
        { text: 'Prefer not to mention', value: 'O' },
      ],
      doctorOptions: [
        { text: 'Doctor1', value: 0 },
        { text: 'Doctor2', value: 2 },
      ],
      bloodGroupOptions: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'BBG'],
      HeartFunctionOptions: ['ESC', 'MES', 'Normal'],
      DietOptions: ['Veg', 'Non Veg', 'Egg'],
      accessOptions: ['Fistula', 'Cannula', 'Perma Cath'],
      hdykauOptions: ['Google Search', 'Friends & Family', 'Social Media', 'Others'],
    }
  },
  created() {
    this.getPatients()
  },
  methods: {
    getPatients() {
      this.$axios.get('/api/staff/get/patient/name_and_id').then((res) => {
        this.patients = res.data.data
      })
    },
    patientDetails(item) {
      this.$axios.get('/api/staff/view/patient/' + item.patient_id).then((res) => {
        this.form = res.data.data
        this.patient_id = res.data.data.patient_id
        this.card = true
      })
    },
    upDatePatientDetails() {
      if (this.$refs.form.validate()) {
        this.$axios.post('/api/staff/update/patient/' + this.patient_id, this.form).then((res) => {
          this.$toast.success('Successfully Updated', {
            theme: 'toasted-primary',
            position: 'bottom-right',
            duration: 3000,
          })
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/_vars.scss';

.patient_cards {
  background-color: $patient-card-bg-color;
}
.scroll {
  overflow-y: scroll;
}
</style>
