<template>
  <v-container fluid>
    <v-card>
      <v-card color="primary">
        <v-card-subtitle class="white--text title">Blood Reports Table</v-card-subtitle>
      </v-card>
      <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 400px" />
    </v-card>
  </v-container>
</template>

<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default {
  props: {
    patientId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const columnDefs = [
      {
        headerName: '#',
        field: '#',
      },
      {
        headerName: 'Date',
        field: 'date    ',
      },
      {
        headerName: 'Report Name',
        field: 'reportName',
      },
      {
        headerName: 'View',
        field: 'view',
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

    // FIXME: Fix the CORS issue in patient list API, and get the patient_id properly as props
    this.$axios('/v3/api/doctor/show/user/report/' + this.patient_id).then((response) => {
      gridOptions.api.setRowData(response.data.results)
      gridOptions.api.sizeColumnsToFit()
    })

    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
}
</script>
