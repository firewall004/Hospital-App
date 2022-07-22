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
      <v-badge v-bind="attrs" bottom color="success" overlap offset-x="12" offset-y="12" dot class="ms-4" v-on="on">
        <v-avatar size="40px" v-bind="attrs" v-on="on">
          <v-icon>mdi-bell</v-icon>
        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <v-list-item to="/a" class="text-xs">
        <v-list-item-content> Thanks for using our application. </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
