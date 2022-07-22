<template>
  <v-sheet color="white" elevation="1" justify-center>
    <v-card justify-center color="primary" class="my-8">
      <v-card-title class="text-center">
        <v-row justify="center" class="py-2">
          <span class="font-weight-semibold white--text">Daily Reports</span>
        </v-row>
      </v-card-title>
    </v-card>

    <v-container>
      <v-row>
        <v-autocomplete
          v-model="selectedPatient"
          :items="patientUsers"
          item-text="name"
          item-value="id"
          solo
          label="Select Patient"
        />
      </v-row>
      <v-divider />

      <v-row>
        <v-col cols="3">
          <v-select v-model="entryLimit" :items="entryLimitVals" label="Show entries limit" solo class="mt-3" />
        </v-col>
      </v-row>
    </v-container>

    <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 600px" />
  </v-sheet>
</template>

<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default {
  middleware: 'doctor',
  data() {
    return {
      entryLimit: 10,
      entryLimitVals: [10, 25, 50, 100],
      patientUsers: [],
      selectedPatient: null,
      gridOptions: {
        columnDefs: [
          {
            headerName: 'ID',
            field: 'ap_id',
            width: 110,
          },
          {
            headerName: 'Report',
            field: 'report_name',
            width: 250,
          },
          {
            headerName: 'View Details',
            field: 'ap_id',
            cellRenderer: function (params) {
              return `<a style="font-family: Comfortaa;" href="staff/dialysis-sheet?pid=${params.value}">View</a>`
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
        pagination: true,
        // paginationPageSize: this.entryLimit,
      },
    }
  },
  fetch() {
    this.$axios('/api/doctor/view/patient/name_id_branch/dropdown/').then((response) => {
      this.patientUsers = response.data.results
    })
  },
  head() {
    return {
      title: 'Daily Reports',
    }
  },
  watch: {
    selectedPatient(newVal, oldVal) {
      this.$axios('/api/doctor/view/daily/report/' + this.selectedPatient).then((response) => {
        this.gridOptions.api.setRowData(response.data.results)
      })
    },
  },
  mounted() {
    this.agGridRef = new Grid(this.$refs.myGrid, this.gridOptions)
  },
}
</script>
