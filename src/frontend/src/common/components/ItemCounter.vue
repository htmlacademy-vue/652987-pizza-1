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
    inputName: {
      type: String,
    },
    maxValue: {
      type: Number,
      default: 3,
    },
    counterValue: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  methods: {
    changeCounter(event) {
      let counterValue = this.counterValue;
      if (event.target.name === "minus") {
        counterValue -= 1;
      } else {
        counterValue += 1;
      }
      this.$emit("updateOrder", {
        id: this.id,
        count: counterValue,
        name: this.inputName,
      });
    },
  },
};
</script>
