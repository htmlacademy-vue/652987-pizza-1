<template>
  <div class="counter counter--orange" :class="classCounter">
    <button
      type="button"
      name="minus"
      class="counter__button counter__button--minus"
      :disabled="counterValue === 0"
      @click="changeCounter"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      :name="inputName"
      class="counter__input"
      :value="counterValue"
      readonly
    />
    <button
      type="button"
      name="plus"
      :class="[
        'counter__button counter__button--plus',
        { 'counter__button--orange': orangeBtn },
      ]"
      :disabled="counterValue >= maxValue"
      @click="changeCounter"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    classCounter: {
      type: String,
      required: true,
    },
    orangeBtn: {
      type: Boolean,
      default: false,
    },
    counterValue: {
      type: Number,
      default: 0,
    },
    inputName: {
      type: String,
    },
    maxValue: {
      type: Number,
      default: 3,
    },
  },
  methods: {
    changeCounter(event) {
      this.$emit("updateOrder", {
        buttonName: event.target.name,
        inputName: this.inputName,
        count: this.counterValue,
      });
    },
  },
};
</script>
