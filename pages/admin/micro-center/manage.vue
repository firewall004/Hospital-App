<template>
  <v-sheet color="white" elevation="1" justify-center>
    <v-card justify-center color="primary" class="my-8">
      <v-card-title class="text-center">
        <v-row justify="center" class="py-2">
          <v-col cols="sm" :lg="6" :sm="12">
            <span class="font-weight-semibold white--text">Manage Microcenters</span>
          </v-col>
          <v-col cols="sm" :lg="6" :sm="12">
            <v-btn color="white" @click="router.push('/../add')"> Add </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>

    <v-container>
      <v-row justify="center" class="py-2">
        <v-col cols="sm" :lg="4" :sm="12">
          <v-card justify-center color="primary" class="my-8">
            <v-card-title class="text-center">
              <v-row justify="center" class="py-2">
                <v-col cols="sm" :lg="6" :sm="12">
                  <span class="font-weight-semibold white--text">Manage Microcenters</span>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
export default {
  middleware: 'admin',
  data() {
    return {
      hospitalList: [],
    }
  },
  head() {
    return {
      title: 'Manage Microcentres',
    }
  },
  watch: {
    selectedHospital(newVal, oldVal) {
      const newArr = this.hospitalList.find((hospital) => hospital.name === this.selectedHospital)
      this.$axios.get('/api/admin/stock/maintenance/show/stock/' + newArr.code).then((response) => {
        const stockList = response.data.consumable_stock_data.map((item, index) => ({ id: index + 1, ...item }))
        this.gridOptionsStock.api.setRowData(stockList)
        this.gridOptionsStock.api.sizeColumnsToFit()
      })
      this.$axios.get('/api/admin/view/staff/').then((response) => {
        this.gridOptionsStaff.api.setRowData(response.data.data)
        this.gridOptionsStaff.api.sizeColumnsToFit()
      })
      this.$axios.get('/api/admin/viewDoctor').then((response) => {
        this.gridOptionsDoctor.api.setRowData(response.data.data)
        this.gridOptionsDoctor.api.sizeColumnsToFit()
      })
      this.$axios.get('/api/admin/view/machine/').then((response) => {
        const machineList = response.data.results.data.filter((item) => item.code === newArr.code)
        this.gridOptionsMachines.api.setRowData(machineList)
        this.gridOptionsMachines.api.sizeColumnsToFit()
      })
    },
  },
  mounted() {
    this.agGridRefMachines = new Grid(this.$refs.myGrid1, this.gridOptionsMachines)
    this.agGridRefStaff = new Grid(this.$refs.myGrid2, this.gridOptionsStaff)
    this.agGridRefDoctor = new Grid(this.$refs.myGrid3, this.gridOptionsDoctor)
    this.agGridRefStock = new Grid(this.$refs.myGrid4, this.gridOptionsStock)
    this.getHospitalsNameAndCode()
  },
  methods: {
    getHospitalsNameAndCode() {
      this.$axios.get('/api/admin/view/microcentre/').then((response) => {
        this.hospitalList = response.data.results.map((hospital) => ({
          name: hospital.centre_name,
          code: hospital.code,
        }))
      })
    },
  },
}
</script>
