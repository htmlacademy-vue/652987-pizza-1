<template>
  <label :class="classRadioLabel">
    <input
      type="radio"
      :name="name"
      :value="value"
      :class="classRadioInput"
      @change="$emit('change', $event.target.value)"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    classRadioLabel: {
      type: String,
      required: false,
    },
    classRadioInput: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped></style>
