<template>
  <div id="misc">
    <div class="page-title text-center px-5">
      <h2 class="text-2xl font-weight-semibold text--primary d-flex align-center justify-center">
        <span class="me-2">Page Not Found</span>
        <v-icon color="warning"> mdi-boom-gate-alert </v-icon>
      </h2>
      <p class="text-sm">we couldn't find the page you are looking for</p>

      <v-btn color="primary" to="/" class="mb-4"> Back to home </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  head() {
    return {
      title: 'Page not found',
    }
  },
}
</script>
