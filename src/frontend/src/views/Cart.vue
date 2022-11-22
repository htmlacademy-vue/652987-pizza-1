<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="isCartEmpty" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <div v-else>
          <CartsCards :cards="orders" />
          <CartAdditional />
          <CartForm />
        </div>
      </div>
    </main>

    <CartFooter @click="openNewOrderPopup" />
    <NewOrderPopup
      v-if="showNewOrderPopup"
      @click="placeOrder"
      @close="placeOrder"
    />
  </form>
</template>

<script>
import CartFooter from "@/modules/cart/CartFooter";
import CartsCards from "@/modules/cart/CartsCards";
import CartAdditional from "@/modules/cart/CartAdditional";
import CartForm from "@/modules/cart/CartForm";
import NewOrderPopup from "@/modules/modal/NewOrderPopup";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Cart",
  components: {
    CartFooter,
    CartsCards,
    CartAdditional,
    CartForm,
    NewOrderPopup,
  },
  data() {
    return {
      showNewOrderPopup: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("cart", ["orders"]),
    isCartEmpty() {
      return this.orders.length === 0;
    },
  },
  created() {
    this.setCartItems();
  },
  methods: {
    ...mapActions("builder", ["RESET_BUILDER_STATE"]),
    ...mapActions("cart", ["RESET_CART_STATE", "SET_CART_ITEMS"]),
    setCartItems() {
      this.SET_CART_ITEMS();
    },
    openNewOrderPopup() {
      this.showNewOrderPopup = true;
    },
    placeOrder() {
      this.showNewOrderPopup = false;
      if (this.user) {
        this.$router.push({ name: "Orders" });
      } else {
        this.$router.push({ name: "IndexHome" });
      }
      localStorage.clear();
      this.RESET_CART_STATE();
      this.RESET_BUILDER_STATE();
    },
  },
};
</script>

<style lang="scss" scoped></style>
