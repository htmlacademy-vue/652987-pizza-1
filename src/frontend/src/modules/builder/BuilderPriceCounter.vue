<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      data-test="add-to-cart-btn"
      :disabled="isDisabledButton"
      @click="sendOrder"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  ADD_TO_CART,
  GET_PIZZA_PARTS,
  RESET_BUILDER_STATE,
} from "@/store/mutation-types";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapGetters("builder", ["isDisabledButton", "totalPrice"]),
  },

  methods: {
    ...mapActions("cart", [ADD_TO_CART]),
    ...mapActions("builder", [GET_PIZZA_PARTS, RESET_BUILDER_STATE]),

    sendOrder() {
      this.ADD_TO_CART();
      this.RESET_BUILDER_STATE();
      this.GET_PIZZA_PARTS();
    },
  },
};
</script>

<style lang="scss" scoped></style>
