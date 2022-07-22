<template>
  <v-app dark>
    <!-- Top bar -->
    <v-app-bar fixed app>
      <v-spacer></v-spacer>

      <v-list-item-content class="align-center justify-center">
        <v-img :src="'/images/logo.png'" :alt="'My Hospital App'" :max-height="'4rem'" :max-width="'4rem'" />
      </v-list-item-content>

      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  data() {
    return {
      fixed: false,
    }
  },
}
</script>
