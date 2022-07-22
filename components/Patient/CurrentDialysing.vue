<template>
  <v-container fluid>
    <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 400px" />
  </v-container>
</template>

<script>
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default {
  data() {
    return {
      time: new Date().getTime(),
      currentDialysing: [],
      gridOptions: {
        columnDefs: [
          {
            headerName: 'Name',
            field: 'name',
          },
          {
            headerName: 'Time',
            field: 'start_time',
          },
          {
            headerName: 'End Dialysis',
            field: 'id',
            cellRenderer: function (params) {
              return `<a  href="staff/post-dialysis?pid=${params.value}"><button type="button" style="background-color: #91215D;color: white;font-family: Comfortaa;width: 100%;">End</button></a>`
            },
          },
          {
            headerName: 'Parameters',
            cellRenderer: function (params) {
              return '<button type="button" style="background-color: #91215D;color: white;font-family: Comfortaa;width: 100%;" disabled>Enter</button>'
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
    }
  },
  // FIX ME : CLOCK DOWN NEEDED
  // watch: {
  // 	time(oldValue, newValue) {
  // 		this.currentDialysing = this.currentDialysing.map((item) => ({
  // 			start_time: item.start_time + 'a',
  // 			name: item.name,
  // 		}))
  // 		this.gridOptions.api.applyTransactionAsync({ update: this.currentDialysing })
  // 	},
  // },
  mounted() {
    this.agGridRef = new Grid(this.$refs.myGrid, this.gridOptions)
    this.$axios('/api/staff/view/dialysing/patient').then((response) => {
      this.currentDialysing = response.data.data.map((patient) => {
        const dialysisTime = new Date(patient.start_time)
        const timeNow = new Date()
        const timeDiff = this.getTimeDifference(dialysisTime, timeNow)
        return {
          start_time: timeDiff,
          name: patient.patient.name,
          id: patient.patient_id,
        }
      })
      this.gridOptions.api.sizeColumnsToFit()
      this.gridOptions.api.setRowData(this.currentDialysing)
    })
  },
  methods: {
    handleBtnClick() {
      alert('btn clicked')
    },
    getTimeDifference(dialysisTime, timeNow) {
      // logic for time difference
      const diff = timeNow.getTime() - dialysisTime.getTime()
      let msec = diff
      const hh = Math.floor(msec / 1000 / 60 / 60)
      msec -= hh * 1000 * 60 * 60
      const mm = Math.floor(msec / 1000 / 60)
      msec -= mm * 1000 * 60
      const ss = Math.floor(msec / 1000)
      msec -= ss * 1000
      return hh + ':' + mm + ':' + ss
    },
  },
}
</script>
