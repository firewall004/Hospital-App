<template>
  <v-container fluid>
    <v-card elevation="2" class="my-8 full-width" color="primary">
      <v-card-subtitle class="title white--text">Bills</v-card-subtitle>
    </v-card>
    <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 400px" />
  </v-container>
</template>

<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default {
  name: 'PostDialysisBills',
  mounted() {
    const columnDefs = [
      {
        headerName: 'Date',
        field: 'date',
        width: 150,
      },
      {
        headerName: 'Bill',
        field: 'bill',
        width: 150,
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

    // FIXME: Confirm API and fix the req & resp
    this.$axios('/v3/api/staff/patient/bill/{appointment_id}').then((response) => {
      gridOptions.api.setRowData(response.data.results)
    })

    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
}
</script>
