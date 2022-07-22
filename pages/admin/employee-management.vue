<template>
  <v-sheet color="white" elevation="1">
    <v-card>
      <v-card-title class="text-center">
        <span class="font-weight-semibold">Employee attendance management</span>
        <v-spacer></v-spacer>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker without buttons"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>
      </v-card-title>
      <v-card-text>
        <div ref="myGrid" class="ag-theme-alpine" style="width: 100%; height: 600px" />
      </v-card-text>
    </v-card>
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
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      menu: false,
    }
  },
  head() {
    return {
      title: 'Employee Management',
    }
  },
  mounted() {
    const columnDefs = [
      {
        headerName: 'UserName',
        field: 'username',
        width: 110,
      },
      {
        headerName: 'Branch',
        field: 'branch',
        width: 150,
      },
      {
        headerName: 'Check in Time',
        field: 'clock_in',
        width: 180,
      },
      {
        headerName: 'Clock in location',
        field: 'clock_in_location',
        width: 80,
      },
      {
        headerName: 'Present location',
        field: 'present_location',
        width: 150,
      },
      {
        headerName: 'Clock Out time',
        field: 'clock_out',
        width: 170,
      },
      {
        headerName: 'Clock Out location',
        field: 'clock_out_location',
        width: 170,
      },
      {
        headerName: 'Type',
        field: 'type',
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
    this.$axios('/api/admin/employee/attendance', { date: this.date }).then((response) => {
      gridOptions.api.setRowData(response.data.data)
    })
    this.agGridRef = new Grid(this.$refs.myGrid, gridOptions)
  },
}
</script>
