<template>
  <div class="py-3 pl-2 table-wrapper-scroll-y my-custom-scrollbar">
    <v-row v-for="(data, key) in value" :key="key" cols="12">
      <v-col cols="5">
        <span class="text-capitalize font-weight-bold">{{ key.replaceAll('_', ' ') }} </span>
      </v-col>
      <v-col cols="7">
        <span class="text-capitalize">: {{ data }}</span>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [Object],
      required: true,
    },
  },
}
</script>
