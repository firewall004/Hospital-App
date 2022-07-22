<template>
  <div class="text-center">
    <v-snackbar :value="isToastOpen" top right :timeout="timeout">
      {{ text }}

      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="isToastOpen = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      required: false,
      default: 10000,
    },
  },
  data() {
    return {
      isToastOpen: this.isOpen,
    }
  },
}
</script>
