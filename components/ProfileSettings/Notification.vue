<template>
  <v-card flat class="mt-5">
    <div class="px-3">
      <v-card-text class="pt-5">
        <v-row>
          <v-col cols="3">
            <p class="text-base text--primary font-weight-bold pt-3">Email Notification :</p>
          </v-col>
          <v-col>
            <v-btn-toggle
              id="btnGroup"
              v-model="emailNotification"
              group
              dense
              required
              mandatory
              borderless
              class="align-center mb-2"
            >
              <v-btn active-class="btn" :elevation="3" :value="'1'"> Yes </v-btn>
              <v-btn active-class="btn" :elevation="3" rounded :value="'0'"> No </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <p class="text-base text--primary font-weight-bold pt-3">Whats App Notification :</p>
          </v-col>
          <v-col>
            <v-btn-toggle
              id="btnGroup"
              v-model="whatsAppNotification"
              group
              dense
              required
              mandatory
              borderless
              class="align-center mb-2"
            >
              <v-btn active-class="btn" :elevation="3" :value="'1'"> Yes </v-btn>
              <v-btn active-class="btn" :elevation="3" rounded :value="'0'"> No </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-card-text>
    </div>

    <!-- divider -->
    <v-divider></v-divider>

    <!-- action buttons -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      emailNotification: '0',
      whatsAppNotification: '0',
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/_vars.scss';

#btnGroup .btn {
  background-color: $hospital-primary-color !important;
  color: white !important;
}
</style>
