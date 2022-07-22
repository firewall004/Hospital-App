<template>
  <v-sheet color="white" elevation="1">
    <v-card>
      <v-card-title class="text-center">
        <span class="font-weight-semibold">UPCOMING APPOINTMENTS</span>
      </v-card-title>
    </v-card>

    <v-divider class="my-2"></v-divider>

    <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 600px" />
  </v-sheet>
</template>

<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default {
  middleware: 'staff',
  head() {
    return {
      title: 'Appointments',
    }
  },

  mounted() {
    const columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        width: 110,
      },
      {
        headerName: 'Patient Name',
        field: 'name',
        width: 150,
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 180,
      },
      {
        headerName: 'Slot',
        field: 'slot',
        width: 80,
      },
      {
        headerName: 'Bed Counter',
        field: 'beds_count',
        width: 150,
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 170,
      },
      {
        headerName: 'Edit',
        field: 'edit',
        width: 170,
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

    this.$axios('/api/staff/upcomingAppointment').then((response) => {
      gridOptions.api.setRowData(response.data.data)
    })

    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
}
</script>
