<template>
  <div>
    <h1>Graphs</h1>
    <client-only>
      <v-card class="pa-3 my-4">
        <BpDiastolicGraph />
      </v-card>
      <v-card class="pa-3 my-4">
        <BpStolicGraph />
      </v-card>
      <v-card class="pa-3 my-4">
        <CreatinineValueChart />
      </v-card>
      <v-card class="pa-3 my-4">
        <ConsumablesChart />
      </v-card>
      <v-card class="pa-3 my-4">
        <HbVsPharmaGraph />
      </v-card>
    </client-only>
  </div>
</template>

<script>
import BpDiastolicGraph from '~/components/Graphs/patient-graphs/BpDiastolicGraph'
import BpStolicGraph from '~/components/Graphs/patient-graphs/BpStolicGraph'
import CreatinineValueChart from '~/components/Graphs/patient-graphs/CreatinineValueChart'
import ConsumablesChart from '~/components/Graphs/patient-graphs/ConsumablesChart'
import HbVsPharmaGraph from '~/components/Graphs/patient-graphs/HbVsPharmaGraph'

export default {
  name: 'PatientInfo',
  components: {
    BpDiastolicGraph,
    BpStolicGraph,
    CreatinineValueChart,
    ConsumablesChart,
    HbVsPharmaGraph,
  },
  head() {
    return {
      title: 'Patient Info',
    }
  },
}
</script>
