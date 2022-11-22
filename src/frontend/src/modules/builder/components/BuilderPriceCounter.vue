<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isDisabledButton"
      @click="sendOrder"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("builder", ["isDisabledButton", "totalPrice"]),
  },
  methods: {
    ...mapActions("cart", ["ADD_TO_CART"]),
    ...mapMutations("builder", ["RESET_BUILDER_STATE"]),
    sendOrder() {
      this.ADD_TO_CART();
      this.RESET_BUILDER_STATE();
    },
  },
};
</script>

<style lang="scss" scoped></style>
