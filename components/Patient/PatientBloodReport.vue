<template>
  <v-container fluid>
    <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 500px" />
  </v-container>
</template>

<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default {
  props: {
    patientId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      gridOptions: {
        columnDefs: [
          {
            headerName: 'Name',
            field: 'name',
            width: 110,
          },
          {
            headerName: 'Time',
            field: 'time',
            width: 150,
          },
          {
            headerName: 'End',
            field: 'end',
            width: 150,
          },
          {
            headerName: 'Parameters',
            field: 'parameters',
            width: 170,
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
        pagination: true,
      },
    }
  },
  watch: {
    patientId(newVal, oldVal) {
      this.$axios('/api/doctor/show/blood/report/' + newVal).then((response) => {
        this.gridOptions.api.setRowData(response.data.data)
      })
    },
  },
  mounted() {
    this.agGridRef = new Grid(this.$refs.myGrid, this.gridOptions)
  },
}
</script>
