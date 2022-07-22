<template>
  <v-app dark>
    <!-- Left sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :mini-variant-width="65"
      :disable-route-watcher="false"
      :clipped="clipped"
      :bottom="false"
      :width="330"
      :fixed="true"
      app
    >
      <v-list dense nav>
        <v-list-item to="/">
          <v-img :src="'/images/logo.png'" :alt="title" :max-height="'3.3rem'" :max-width="'3.3rem'" />

          <v-list-item-content class="pl-3">
            <v-list-item-title>
              <strong>{{ title }}</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group v-for="(item, i) in itemsAsPerRole" :key="i" router exact active-class="font-weight-bold">
          <template #activator>
            <v-list-item :to="item.to" exact>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item v-for="(subItem, j) in item.subItems" :key="j" :to="subItem.to" exact dense class="sub-menu">
            <v-list-item-icon>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Top bar -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon class="d-block me-2" @click.stop="showDrawer()">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-list-item-content class="align-center justify-center">
        <v-img :src="'/images/logo.png'" :alt="title" :max-height="'4rem'" :max-width="'4rem'" />
      </v-list-item-content>

      <v-spacer></v-spacer>

      <user-notification />

      <user-menu />
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
import { leftSideBarMenuItems } from '~/constants/menuConstants'
import UserMenu from '~/components/Dashboard/AppBar/UserMenu'
import UserNotification from '~/components/Dashboard/AppBar/UserNotification'

export default {
  name: 'DefaultLayout',
  components: {
    UserMenu,
    UserNotification,
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: leftSideBarMenuItems,
      miniVariant: false,
      right: true,
      title: 'My Hospital App',
    }
  },
  computed: {
    itemsAsPerRole() {
      const userRole = this.$store.state.auth.role
      const swipSideBar = userRole === 'manager' ? 'admin' : userRole
      return leftSideBarMenuItems.filter((item) => {
        return item.roles.includes(swipSideBar)
      })
    },
  },
  methods: {
    showDrawer() {
      let breakPoint = 0

      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          breakPoint = 220
          break
        case 'sm':
          breakPoint = 400
          break
        case 'md':
          breakPoint = 500
          break
        case 'lg':
          breakPoint = 600
          break
        case 'xl':
          breakPoint = 800
          break
      }

      if (breakPoint <= 400) {
        this.drawer = !this.drawer
      } else {
        this.miniVariant = !this.miniVariant
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/css/_vars.scss';

.sub-menu {
  background-color: $hospital-primary-color--light;
}
</style>
