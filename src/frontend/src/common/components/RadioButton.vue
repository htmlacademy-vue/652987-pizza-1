<template>
  <label :class="classRadioLabel">
    <input
      type="radio"
      :name="name"
      :value="value"
      :class="classRadioInput"
      :checked="isChecked"
      @change="$emit('change', $event.target.value)"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    classRadioLabel: {
      type: String,
      required: false,
    },
    classRadioInput: {
      type: String,
      required: false,
    },
    isChecked: {
      type: Boolean,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
