<template>
  <div>
    <h1 class="text-center primary--text">EDIT & CREATE DOCTORS</h1>
    <p>
      <v-btn color="primary" @click="dialog = !dialog">Add Doctor</v-btn>
    </p>
    <v-divider></v-divider>
    <div class="pt-4">
      <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 600px" />
    </div>

    <div>
      <v-dialog v-model="dialog" width="800">
        <v-form ref="form" @submit.prevent="addDoctor()">
          <v-card>
            <v-card-title>
              <p class="primary--text font-weight-bold">Add Doctor</p>
              <v-spacer></v-spacer>
              <v-icon @click="dialog = !dialog">mdi-close</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row no-gutters justify="center" class="py-1">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Name :</p>
                </v-col>
                <v-col cols="7">
                  <v-text-field v-model="form.username" :rules="fieldRules" label="Name" outlined dense></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-1">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Email :</p>
                </v-col>
                <v-col cols="7">
                  <v-text-field v-model="form.email" :rules="fieldRules" label="Email" outlined dense></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-1">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Phone No :</p>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="form.phone"
                    :rules="phoneNumberRules"
                    label="Phone No"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-1">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Emergency No :</p>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="form.emphone"
                    :rules="phoneNumberRules"
                    label="Emergency No"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Branch Accessibility:</p>
                </v-col>
                <v-col cols="7">
                  <v-btn-toggle
                    id="btnGroup"
                    v-model="form.branch"
                    group
                    multiple
                    dense
                    required
                    mandatory
                    borderless
                    color="brown"
                    class="align-center"
                  >
                    <div width="1000">
                      <v-row v-for="(rand, i) in branches" :key="i">
                        <v-col md="3" offset-md="3">
                          <v-btn active-class="btn" :elevation="3" :value="rand.code">{{ rand.centre_name }} </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Speciality:</p>
                </v-col>
                <v-col cols="7">
                  <v-select
                    v-model="form.speciality"
                    :items="specialityOptions"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Select Speciality"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-1">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Password :</p>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="form.password"
                    :append-icon="password1 ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Password"
                    outlined
                    label-for="input-2"
                    class="font-weight-bold"
                    :type="password1 ? 'text' : 'password'"
                    :rules="passwordRules"
                    @click:append="password1 = !password1"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Type of payment:</p>
                </v-col>
                <v-col cols="7">
                  <v-select
                    v-model="form.payment"
                    :items="paymentOptions"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Select payment type"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row v-if="form.payment != 'Per Dialysis'" no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-bold">Amount:</p>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="form.amount"
                    :rules="fieldRules"
                    label="Amount"
                    type="number"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <div v-else>
                <v-row no-gutters justify="center" class="py-2">
                  <v-col cols="3" class="pt-2">
                    <p class="font-weight-bold">New Patient Pay:</p>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="form.new_patient"
                      :rules="fieldRules"
                      type="number"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters justify="center" class="py-2">
                  <v-col cols="3" class="pt-2">
                    <p class="font-weight-bold">Emergency patient Pay:</p>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="form.emergency_pay"
                      :rules="fieldRules"
                      type="number"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters justify="center" class="py-2">
                  <v-col cols="3" class="pt-2">
                    <p class="font-weight-bold">Scheduled patient Pay:</p>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="form.scheduled_pay"
                      :rules="fieldRules"
                      type="number"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <v-row no-gutters justify="center" class="py-1">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Profile Pic :</p>
                </v-col>
                <v-col cols="7">
                  <v-file-input
                    v-model="form.profile_pic"
                    :value="[]"
                    show-size
                    label="Select Image"
                    accept="image/*"
                  ></v-file-input>
                </v-col>
              </v-row>
              <div class="d-flex align-center flex-column">
                <v-btn dark large width="350" class="primary" depressed color="primary" type="submit">
                  Add Doctor
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
export default {
  data() {
    return {
      fieldRules: [(v) => !!v || 'This field is required'],
      passwordRules: [
        (value) => !!value || 'Please enter a password',
        (value) => !!value || 'Please type password.',
        (value) =>
          (value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) ||
          'Minimum 6 characters, One capital latter, Special charater, Number',
      ],
      phoneNumberRules: [
        (value) => !!value || 'Please enter 10 digits.',
        (value) => (value && value.length >= 10) || 'minimum 10 digits',
      ],
      dialog: false,
      password1: false,
      form: {
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        username: '',
        email: '',
        phone: '',
        emphone: '',
        branch: [],
        speciality: '',
        password: '',
        perdmy: '',
        amount: '',
        new_patient: '',
        emergency_pay: '',
        scheduled_pay: '',
        profile_pic: '',
        log: '',
        time: '',
      },
      specialityOptions: ['Nephrologist', 'Cardiologist', 'Dietician', 'Diabetologist', 'General Physician', 'RMO'],
      paymentOptions: ['Monthly', 'Yearly', 'Per Dialysis'],
    }
  },
  head() {
    return {
      title: 'Add Doctor',
    }
  },
  computed: {
    ...mapState('doctor', {
      branches: (state) => state.branch,
    }),
  },
  mounted() {
    const columnDefs = [
      {
        headerName: 'Index',
        field: 'id',
        width: 150,
      },
      {
        headerName: 'Name',
        field: 'username',
        width: 150,
      },

      {
        headerName: 'Phone',
        field: 'phone',
        width: 100,
      },
      {
        headerName: 'Emergency No',
        field: 'emphone',
        width: 150,
      },
      {
        headerName: 'Branch',
        field: 'branch',
        width: 150,
      },

      {
        headerName: 'Edit',
        width: 150,
        cellRenderer: function (params) {
          return '<button type="button" style="background-color: #91215D;color: white;font-family: Comfortaa;width: 50%;" disabled>Edit</button>'
        },
      },
      {
        headerName: 'Delete',
        width: 150,
        cellRenderer: function (params) {
          return '<button type="button" style="background-color: #91215D;color: white;font-family: Comfortaa;width: 50%;" disabled>Delete</button>'
        },
      },
      {
        headerName: 'Ban',
        width: 150,
        cellRenderer: function (params) {
          return '<button type="button" style="background-color: #91215D;color: white;font-family: Comfortaa;width: 50%;" disabled>Ban</button>'
        },
      },
    ]
    const gridOptions = {
      columnDefs,
      defaultColDef: {
        sortable: true,
        filter: true,
      },
      enableBrowserTooltips: true,
      columnHoverHighlight: true,
      enableCellTextSelection: true,
      ensureDomOrder: true,
    }
    this.$axios('/api/admin/viewDoctor').then((res) => {
      gridOptions.api.setRowData(res.data.data)
    })
    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
  methods: {
    addDoctor() {
      if (this.$refs.form.validate()) {
        const today = new Date()
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        const formData = new FormData()
        formData.append('date', this.form.date)
        formData.append('username', this.form.username)
        formData.append('branch', this.form.branch)
        formData.append('speciality', this.form.speciality)
        formData.append('phone', this.form.phone)
        formData.append('emphone', this.form.emphone)
        formData.append('email', this.form.email)
        formData.append('new_patient', this.form.new_patient)
        formData.append('emergency_pay', this.form.emergency_pay)
        formData.append('scheduled_pay', this.form.scheduled_pay)
        formData.append('profile_pic', this.form.profile_pic)
        formData.append('amount', this.form.amount)
        formData.append('perdmy', this.form.perdmy)
        formData.append('password', this.form.password)
        formData.append('log', this.form.date + '' + time)
        formData.append('time', time)

        this.$axios
          .post('/api/admin/insertDoctor', formData)
          .then((res) => {
            this.$toast.success('Successfully Added', {
              theme: 'toasted-primary',
              position: 'bottom-right',
              duration: 3000,
            })
            this.dialog = false
          })
          .catch(() => {
            this.$toast.error('Error in  Add Admin', {
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

#btnGroup .btn {
  background-color: $hospital-primary-color !important;
  color: white !important;
}
</style>
