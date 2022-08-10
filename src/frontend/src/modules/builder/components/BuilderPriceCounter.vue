<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button type="button" class="button" :disabled="isDisabled">
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    doughPrice: {
      type: Number,
      default: 0,
    },
    sizePrice: {
      type: Number,
      default: 0,
    },
    saucePrice: {
      type: Number,
      default: 0,
    },
    isNameFilled: {
      type: Boolean,
      default: false,
    },
    ingredientsPrice: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    totalPrice() {
      return (
        (this.doughPrice + this.saucePrice + this.ingredientsPrice) *
        this.sizePrice
      );
    },
    isPizzaSelected() {
      return this.saucePrice && this.sizePrice && this.doughPrice;
    },
    isDisabled() {
      return !(
        this.ingredientsPrice &&
        this.isNameFilled &&
        this.isPizzaSelected
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
