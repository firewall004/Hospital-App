<template>
  <v-card color="primary">
    <v-card-title class="text-center white--text">
      <v-container>
        <span class="text-lg-h3"> Telemedicine </span>
      </v-container>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  middleware: 'staff',
  head() {
    return {
      title: 'Telemedicine',
    }
  },
}
</script>
