<template>
  <v-menu
    rounded
    offset-y
    :close-delay="400"
    left
    nudge-bottom="14"
    min-width="200"
    content-class="user-profile-menu-content"
    origin="top right"
    transition="scale-transition"
  >
    <template #activator="{ on, attrs }">
      <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
        <v-avatar size="40px" v-bind="attrs" v-on="on">
          <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
        </v-avatar>
      </v-badge>
    </template>

    <v-list :tile="false" flat nav>
      <div class="pb-3 pt-2">
        <div class="d-inline-flex flex-column justify-end ms-3" style="vertical-align: end">
          <span class="text--primary font-weight-semibold mb-n1"> Vivek Kumar </span>
          <small class="text--disabled text-capitalize">Admin</small>
        </div>
      </div>

      <!-- Check In -->
      <v-list-item to="/aci">
        <v-list-item-icon class="me-2">
          <v-icon size="22"> mdi-calendar-check </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Check In</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Profile -->
      <v-list-item to="/user/account-settings">
        <v-list-item-icon class="me-2">
          <v-icon size="22"> mdi-account-circle </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Account Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- FAQ -->
      <v-list-item to="/faq">
        <v-list-item-icon class="me-2">
          <v-icon size="22"> mdi-frequently-asked-questions </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>FAQ</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Logout -->
      <v-list-item @click="logout">
        <v-list-item-icon class="me-2">
          <v-icon size="22"> mdi-logout </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$store.dispatch('user/clearUserData')

      this.$router.push('/login')
    },
  },
}
</script>
<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
