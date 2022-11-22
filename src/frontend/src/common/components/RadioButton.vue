<template>
  <label :class="classRadioLabel">
    <input
      type="radio"
      :name="name"
      :value="params.value"
      :checked="checked"
      :class="classRadioInput"
      @change="$emit('selected')"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      required: true,
    },
    classRadioInput: {
      type: String,
      required: false,
    },
    classRadioLabel: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
