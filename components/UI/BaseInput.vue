<template>
  <div>
    <v-text-field
      :label="label"
      :rules="rules"
      :value="value"
      :persistent-placeholder="true"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped>
label {
  color: #131212;
  font-size: 13px;
}
</style>
