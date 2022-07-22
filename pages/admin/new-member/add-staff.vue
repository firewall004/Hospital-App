<template>
  <div>
    <h1 class="text-center primary--text">VIEW & ADD ALL STAFFS</h1>
    <p>
      <v-btn color="primary" @click="dialog = !dialog">Add Staff</v-btn>
    </p>
    <v-divider></v-divider>
    <div class="pt-4">
      <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 600px" />
    </div>
    <div>
      <v-dialog v-model="dialog" width="800">
        <v-form ref="form" @submit.prevent="addStaff()">
          <v-card>
            <v-card-title>
              <p class="primary--text font-weight-bold">ADD Staff</p>
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

              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Designation:</p>
                </v-col>
                <v-col cols="7">
                  <v-select
                    v-model="form.designation"
                    :items="DesignationOptions"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Select Designation"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Category:</p>
                </v-col>
                <v-col cols="7">
                  <v-select
                    v-model="form.category"
                    :items="CategoryOptions"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Select Category"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Branch:</p>
                </v-col>
                <v-col cols="7">
                  <v-select
                    v-model="form.branch"
                    :items="branches"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Select Branch"
                  ></v-select>
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
              <v-row no-gutters justify="center" class="py-1">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Salary :</p>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.salary"
                    :rules="fieldRules"
                    label="Salary"
                    type="number"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="form.dmy"
                    :items="SalaryOptions"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Salary type"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">HD patients:</p>
                </v-col>
                <v-col cols="7">
                  <v-btn-toggle
                    id="btnGroup"
                    v-model="form.HD_patients"
                    group
                    dense
                    required
                    mandatory
                    borderless
                    color="primary"
                    class="align-center"
                  >
                    <v-row>
                      <v-col cols="sm" :lg="6" :sm="12">
                        <v-btn active-class="btn" :elevation="3" :value="'Yes'"> Yes </v-btn>
                      </v-col>
                      <v-col cols="sm" :lg="6" :sm="12">
                        <v-btn active-class="btn" :elevation="3" :value="'No'"> No </v-btn>
                      </v-col>
                    </v-row>
                  </v-btn-toggle>
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
                  Add Staff
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
    <!-- Edit -->
    <div>
      <v-dialog v-model="dialogEdit" width="800">
        <v-form ref="form" @submit.prevent="updateStaff()">
          <v-card>
            <v-card-title>
              <p class="primary--text font-weight-bold">Update Staff</p>
              <v-spacer></v-spacer>
              <v-icon @click="dialogEdit = !dialogEdit">mdi-close</v-icon>
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

              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Designation:</p>
                </v-col>
                <v-col cols="7">
                  <v-select
                    v-model="form.designation"
                    :items="DesignationOptions"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Select Designation"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Category:</p>
                </v-col>
                <v-col cols="7">
                  <v-select
                    v-model="form.category"
                    :items="CategoryOptions"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Select Category"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Branch:</p>
                </v-col>
                <v-col cols="7">
                  <v-select
                    v-model="form.branch"
                    :items="branches"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Select Branch"
                  ></v-select>
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
              <v-row no-gutters justify="center" class="py-1">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">Salary :</p>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.salary"
                    :rules="fieldRules"
                    label="Salary"
                    type="number"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="form.dmy"
                    :items="SalaryOptions"
                    outlined
                    :menu-props="{ offsetY: true }"
                    label="Salary type"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row no-gutters justify="center" class="py-2">
                <v-col cols="3" class="pt-2">
                  <p class="font-weight-black">HD patients:</p>
                </v-col>
                <v-col cols="7">
                  <v-btn-toggle
                    id="btnGroup"
                    v-model="form.HD_patients"
                    group
                    dense
                    required
                    mandatory
                    borderless
                    color="primary"
                    class="align-center"
                  >
                    <v-row>
                      <v-col cols="sm" :lg="6" :sm="12">
                        <v-btn active-class="btn" :elevation="3" :value="'Yes'"> Yes </v-btn>
                      </v-col>
                      <v-col cols="sm" :lg="6" :sm="12">
                        <v-btn active-class="btn" :elevation="3" :value="'No'"> No </v-btn>
                      </v-col>
                    </v-row>
                  </v-btn-toggle>
                </v-col>
              </v-row>

              <div class="d-flex align-center flex-column">
                <v-btn dark large width="350" class="primary" depressed color="primary" type="submit">
                  Update Staff
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
      dialogEdit: false,
      password1: false,
      form: {
        username: '',
        email: '',
        designation: '',
        category: '',
        branch: '',
        phone: '',
        emphone: '',
        salary: '',
        dmy: '',
        HD_patients: 'No',
        password: '',
        profile_pic: '',
      },
      DesignationOptions: [
        'Junior Staff',
        'Intern',
        'Junior Technician',
        'Senior Technicianrly',
        'On Call Technician',
        'Support Staff',
        'Manager',
      ],
      CategoryOptions: ['Full Time', 'Part Time', 'On Call'],
      SalaryOptions: ['per dialysis', 'per month', 'per year'],
    }
  },
  head() {
    return {
      title: 'Add Staff`',
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
        field: 'index',
        width: 150,
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 150,
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 150,
      },
      {
        headerName: 'Designation',
        field: 'designation',
        width: 150,
      },
      {
        headerName: 'Category',
        field: 'category',
        width: 150,
      },
      {
        headerName: 'Phone',
        field: 'phone',
        width: 100,
      },
      {
        headerName: 'Salary',
        field: 'salary',
        width: 150,
      },
      {
        headerName: 'Edit',
        width: 100,
        cellRenderer: function (params) {
          return '<button type="button" @click="dialogEdit = !dialogEdit" style="background-color: #91215D;color: white;font-family: Comfortaa;width: 50%;" disabled>Edit</button>'
        },
      },
      {
        headerName: 'Delete',
        width: 100,
        cellRenderer: function (params) {
          return '<button type="button" style="background-color: #91215D;color: white;font-family: Comfortaa;width: 50%;" disabled>Delete</button>'
        },
      },
      {
        headerName: 'Ban',
        width: 100,
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
    this.$axios('/api/staff/view/dialysing/patient').then((response) => {
      gridOptions.api.setRowData([
        {
          index: '1',
          name: 'Hospital',
          email: 'abc@gmail.com',
          designation: 'designation',
          category: 'category',
          phone: '123',
          salary: '123',
        },
      ])
    })
    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
  methods: {
    addStaff() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        formData.append('username', this.form.username)
        formData.append('email', this.form.email)
        formData.append('category', this.form.category)
        formData.append('phone', this.form.phone)
        formData.append('emphone', this.form.emphone)
        formData.append('branch', this.form.branch)
        formData.append('salary', this.form.salary)
        formData.append('password', this.form.password)
        formData.append('dmy', this.form.dmy)
        formData.append('designation', this.form.designation)
        formData.append('profile_pic', this.form.profile_pic)
        this.$axios
          .post('/api/admin/store/staff', formData)
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
    updateStaff() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        formData.append('username', this.form.username)
        formData.append('phone', this.form.phone)
        formData.append('email', this.form.email)
        formData.append('password', this.form.password)
        formData.append('category', this.form.category)
        formData.append('emphone', this.form.emphone)
        formData.append('branch', this.form.branch)
        formData.append('salary', this.form.salary)
        formData.append('dmy', this.form.dmy)
        formData.append('designation', this.form.designation)
        this.$axios
          .post('/api/admin/update/staff/{staff_id}', formData)
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
