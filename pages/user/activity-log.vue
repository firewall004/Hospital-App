<template>
  <v-sheet color="white" elevation="1">
    <v-card>
      <v-card-title class="text-center">
        <span class="font-weight-semibold">Activity Log</span>
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
  head() {
    return {
      title: 'Activity Log',
    }
  },

  mounted() {
    const columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        sortable: true,
        filter: true,
        width: 130,
        type: ['numberColumn', 'rightAligned'],
      },
      {
        headerName: 'Action',
        field: 'action',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Log',
        field: 'log',
        sortable: true,
        filter: true,
        tooltipField: 'log',
        width: 350,
      },
      {
        headerName: 'Date',
        field: 'time.date',
        sortable: true,
        filter: 'agDateColumnFilter',
        type: 'dateColumn',
        width: 170,
      },
      {
        headerName: 'Time',
        field: 'time.time',
        sortable: true,
        filter: true,
        flex: 1,
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

    this.$axios('/api/admin/activityLog').then((response) => {
      gridOptions.api.setRowData(response.data.results)
    })

    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
}
</script>
