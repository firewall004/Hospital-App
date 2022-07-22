<template>
  <div>
    <div>
      <p style="text-align: left">
        Logo
        <span style="float: right">
          <p class="font-weight-bold">My Hospital App Pvt Ltd</p>
        </span>
      </p>
    </div>

    <v-divider></v-divider>
    <div class="pt-4">
      <v-row style="height: 30px" no-gutters>
        <v-col cols="2">
          <p class="font-weight-bold">Name</p>
        </v-col>
        <v-col cols="4">
          <p>: {{ bill_data.patinet_name }}</p>
        </v-col>
      </v-row>
      <v-row style="height: 30px" no-gutters>
        <v-col cols="2">
          <p class="font-weight-bold">Patient ID</p>
        </v-col>
        <v-col cols="4">
          <p>: {{ bill_data.patient_id }}</p>
        </v-col>
      </v-row>
      <v-row style="height: 30px" no-gutters>
        <v-col cols="2">
          <p class="font-weight-bold">Opening Staff</p>
        </v-col>
        <v-col cols="4">
          <p>: {{ bill_data.opening_staff }}</p>
        </v-col>
      </v-row>
      <v-row style="height: 30px" no-gutters>
        <v-col cols="2">
          <p class="font-weight-bold">Closing Staff</p>
        </v-col>
        <v-col cols="4">
          <p>: {{ bill_data.closing_staff }}</p>
        </v-col>
      </v-row>
      <v-row style="height: 30px" no-gutters>
        <v-col cols="2">
          <p class="font-weight-bold">Dialysis End Time</p>
        </v-col>
        <v-col cols="4">
          <p>: {{ bill_data.end_time }}</p>
        </v-col>
      </v-row>
    </div>
    <p class="display-1">Invoice</p>
    <p>
      <v-row>
        <v-col cols="2"><p class="font-weight-bold">Invoice Date</p></v-col>
        <v-col cols="2">:{{ date }}</v-col>
      </v-row>
    </p>

    <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 600px" />
    <p></p>
    <v-divider></v-divider>
    <div class="pt-4"><p class="text-center">Phone:+91 95607 86456, Email:info@hospital.com</p></div>
  </div>
</template>
<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
export default {
  middleware: 'staff',
  data() {
    return {
      bill_data: {
        patinet_name: 'Ramesh ',
        patient_id: 'PIDSDC42',
        opening_staff: 'Nitin ',
        closing_staff: 'Nitin ',
        start_time: '2021-07-22 13:20:27',
        end_time: '2021-07-22 18:23:12',
        total_amount: 1100,
        mode_of_payment: 'Cashless Scheme',
        paid: 1100,
        amount_due: 1400,
      },
      date: '21st Dec 2020',
    }
  },
  // fetch() {
  // 	this.$axios('/api/staff/get/patient/name_and_id').then((response) => {
  // 		this.patientUsers = response.data.data
  // 	})
  // },
  head() {
    return {
      title: 'Patient Bills',
    }
  },
  mounted() {
    const columnDefs = [
      {
        headerName: 'Description',
        field: 'description',
        width: 150,
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        width: 600,
      },
      {
        headerName: 'Amount',
        field: 'amount',
        width: 150,
      },
      {
        headerName: 'Subtotal(₹)',
        field: 'subtotal',
        width: 200,
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
    this.$axios('/api/admin/employee/attendance', { date: this.date }).then((response) => {
      gridOptions.api.setRowData({ description: 'description', quantity: 1, amount: 100, subtotal: 200 })
    })
    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
}
</script>
