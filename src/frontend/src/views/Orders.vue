<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <div
      v-if="isOrdersListEmpty"
      key="orders-empty"
      class="sheet order__empty"
      data-test="orders-empty"
    >
      <p>У вас пока нет заказов</p>
    </div>

    <div v-else key="orders-list" data-test="orders-list">
      <section v-for="order in orders" :key="order.id" class="sheet order">
        <OrdersItem :order="order" data-test="order-item" />
      </section>
    </div>
  </div>
</template>

<script>
import OrdersItem from "@/modules/orders/OrdersItem";
import { mapActions, mapState } from "vuex";
import {
  GET_MISC,
  GET_ORDERS,
  GET_PIZZA_PARTS,
  SET_CART_ITEMS,
} from "@/store/mutation-types";
import { localeStorageService } from "@/services/localeStorage";

export default {
  name: "OrdersPage",

  components: {
    OrdersItem,
  },

  computed: {
    ...mapState("cart", ["misc"]),
    ...mapState("orders", ["orders"]),

    isOrdersListEmpty() {
      return this.orders.length === 0;
    },
  },

  methods: {
    ...mapActions("builder", [GET_PIZZA_PARTS]),
    ...mapActions("orders", [GET_ORDERS]),
    ...mapActions("cart", [GET_MISC, SET_CART_ITEMS]),
  },

  async created() {
    this.GET_ORDERS();

    const arrayMisc = localeStorageService.getJSON("misc");

    if (!arrayMisc.length) {
      this.GET_MISC();
    }

    this.SET_CART_ITEMS();
  },
};
</script>

<style lang="scss" scoped></style>
