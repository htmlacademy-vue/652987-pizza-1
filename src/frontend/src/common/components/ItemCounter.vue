<template>
  <div class="counter counter--orange" :class="classCounter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="!value"
      @click="decreaseCounter"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      :name="['counter_' + name]"
      type="text"
      class="counter__input"
      :value="value"
      @input="conversionValue($event.target.value)"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="increaseCounter"
      :disabled="value >= 3"
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
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    startValue(newVal) {
      if (newVal >= 3) this.$emit("changeAmount", 3);
    },
  },
  methods: {
    conversionValue(value) {
      this.$emit("changeAmount", +value);
    },
    decreaseCounter() {
      this.conversionValue(this.value - 1);
    },
    increaseCounter() {
      this.conversionValue(this.value + 1);
    },
  },
};
</script>
