<template>
  <v-sheet color="white" elevation="1" justify-center>
    <v-card justify-center color="primary" class="my-8">
      <v-card-title class="text-center">
        <v-row justify="center" class="py-2">
          <span class="font-weight-semibold white--text">Prescriptions</span>
        </v-row>
      </v-card-title>
    </v-card>
    <add-prescription />
    <v-divider class="my-2" />

    <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 600px" />
  </v-sheet>
</template>

<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import AddPrescription from '~/components/Doctor/AddPrescription.vue'
export default {
  components: {
    AddPrescription,
  },
  middleware: 'doctor',
  head() {
    return {
      title: 'Prescriptions',
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
        headerName: 'Date',
        field: 'date',
        width: 180,
      },
      {
        headerName: 'Prescription',
        field: 'prescription',
        tooltipField: 'prescription',
        width: 400,
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
      pagination: true,
    }

    this.$axios('/api/doctor/show/prescription/24').then((response) => {
      // FIX ME : All prescriptions fetch not working properly
      gridOptions.api.setRowData(response.data.data)
    })

    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
}
</script>
