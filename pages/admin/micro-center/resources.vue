<template>
  <v-sheet color="white" elevation="1" justify-center>
    <v-card justify-center color="primary" class="my-8">
      <v-card-title class="text-center">
        <v-row justify="center" class="py-2">
          <span class="font-weight-semibold white--text">{{ `${selectedHospital}'s` }} Resources</span>
        </v-row>
      </v-card-title>
    </v-card>

    <v-container>
      <v-row>
        <v-select
          v-model="selectedHospital"
          :items="hospitalList.map((hospital) => hospital.name)"
          label="Select hospital"
        />
      </v-row>
    </v-container>
    <v-container class="pa-4">
      <v-row justify="center" class="pa-4">
        <span class="font-weight-black text-h4">Machines</span>
      </v-row>
      <div ref="myGrid1" class="ag-theme-alpine" style="width: 100%; height: 600px" />
    </v-container>
    <v-container class="pa-4">
      <v-row justify="center" class="pa-4">
        <span class="font-weight-black text-h4">Staff</span>
      </v-row>
      <div ref="myGrid2" class="ag-theme-alpine" style="width: 100%; height: 600px" />
    </v-container>
    <v-container class="pa-4">
      <v-row justify="center" class="pa-4">
        <span class="font-weight-black text-h4">Doctor</span>
      </v-row>
      <div ref="myGrid3" class="ag-theme-alpine" style="width: 100%; height: 600px" />
    </v-container>
    <v-container class="pa-4">
      <v-row justify="center" class="pa-4">
        <span class="font-weight-black text-h4">Stock</span>
      </v-row>
      <div ref="myGrid4" class="ag-theme-alpine" style="width: 100%; height: 600px" />
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
      selectedHospital: 'Default',
      gridOptionsStock: {
        columnDefs: [
          {
            headerName: 'ID',
            field: 'id',
          },
          {
            headerName: 'Products',
            field: 'product',
          },
          {
            headerName: 'Available',
            cellRenderer: function (params) {
              return params.data.brand[0].total
            },
          },
        ],
        defaultColDef: {
          sortable: true,
          filter: true,
        },
        enableBrowserTooltips: true,
        columnHoverHighlight: true,
        enableCellTextSelection: true,
        ensureDomOrder: true,
      },
      gridOptionsMachines: {
        columnDefs: [
          {
            headerName: 'ID',
            field: 'machine_id',
          },
          {
            headerName: 'Provider',
            field: 'provider',
          },
          {
            headerName: 'Machine Name',
            field: 'machine_type',
          },
          {
            headerName: 'Serial No',
            field: 'machine_serial_number',
          },
          {
            headerName: 'Counter',
            field: 'counter',
          },
          {
            headerName: 'EMI',
            field: 'emi',
          },
        ],
        defaultColDef: {
          sortable: true,
          filter: true,
        },
        enableBrowserTooltips: true,
        columnHoverHighlight: true,
        enableCellTextSelection: true,
        ensureDomOrder: true,
      },
      gridOptionsStaff: {
        columnDefs: [
          {
            headerName: 'ID',
            field: 'id',
          },
          {
            headerName: 'Name',
            field: 'username',
          },
          {
            headerName: 'Email',
            field: 'email',
          },
          {
            headerName: 'Designation',
            field: 'designation',
          },
          {
            headerName: 'Phone No.',
            field: 'phone',
          },
          {
            headerName: 'Emergency No.',
            field: 'emphone',
          },
          {
            headerName: 'Salary',
            field: 'salary',
          },
        ],
        defaultColDef: {
          sortable: true,
          filter: true,
        },
        enableBrowserTooltips: true,
        columnHoverHighlight: true,
        enableCellTextSelection: true,
        ensureDomOrder: true,
      },
      gridOptionsDoctor: {
        columnDefs: [
          {
            headerName: 'ID',
            field: 'id',
          },
          {
            headerName: 'Name',
            field: 'username',
          },
          {
            headerName: 'Speciality',
            field: 'speciality',
          },
          {
            headerName: 'Email',
            field: 'email',
          },
          {
            headerName: 'Branch',
            field: 'branch',
          },
          {
            headerName: 'Phone',
            field: 'phone',
          },
          {
            headerName: 'Emergency No.',
            field: 'emphone',
          },
        ],
        defaultColDef: {
          sortable: true,
          filter: true,
        },
        enableBrowserTooltips: true,
        columnHoverHighlight: true,
        enableCellTextSelection: true,
        ensureDomOrder: true,
      },
    }
  },
  head() {
    return {
      title: 'Microcenter Resources',
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
