<template>
  <div>
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ orderPrice }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="deleteOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="repeatOrder(order)">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li v-for="pizza in pizzas" :key="pizza.id" class="order__item">
        <PizzaItem :pizza="pizza" />

        <p class="order__price">{{ pizzaPrice(pizza) }} ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <OrdersAdditionalItem
        v-for="item in miscFormat"
        :key="item.id"
        :item="item"
      />
    </ul>

    <p class="order__address">Адрес доставки: {{ address }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getItemById, getOrderPrice } from "@/common/helpers";
import PizzaItem from "@/common/components/PizzaItem";
import OrdersAdditionalItem from "./OrdersAdditionalItem";
import {
  ADD_TO_CART,
  DELETE_ORDER,
  GET_PIZZA_PARTS,
  REPEAT_ORDER,
  RESET_BUILDER_STATE,
  UPDATE_COUNT_MISC,
} from "@/store/mutation-types";

export default {
  name: "OrdersItem",
  components: { PizzaItem, OrdersAdditionalItem },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("builder", ["doughs", "sauces", "sizes", "ingredients"]),
    ...mapGetters("cart", ["misc"]),

    address() {
      return this.order.orderAddress
        ? this.order.orderAddress.name
        : "Самовывоз";
    },

    pizzas() {
      return this.order.orderPizzas.map((pizza) => {
        return { ...pizza, price: this.getPizzaPrice(pizza) };
      });
    },

    miscFormat() {
      return this.order.orderMisc.map((misc) => {
        return {
          ...getItemById(this.misc, misc.miscId),
          count: misc.quantity,
        };
      });
    },

    orderPrice() {
      return getOrderPrice(this.pizzas, this.miscFormat);
    },
  },
  methods: {
    ...mapActions("orders", [DELETE_ORDER]),
    ...mapActions("cart", [ADD_TO_CART, UPDATE_COUNT_MISC]),
    ...mapActions("builder", [
      REPEAT_ORDER,
      RESET_BUILDER_STATE,
      GET_PIZZA_PARTS,
    ]),
    deleteOrder(id) {
      this.DELETE_ORDER(id);
    },
    getPizzaPrice(pizza) {
      const doughPrice = getItemById(this.doughs, pizza.doughId)?.price;
      const saucePrice = getItemById(this.sauces, pizza.sauceId)?.price;
      const multiplier = getItemById(this.sizes, pizza.sizeId)?.multiplier;
      const ingredientsSum = pizza.ingredients
        .map(
          (ingredient) =>
            getItemById(this.ingredients, ingredient.ingredientId)?.price *
            ingredient.quantity
        )
        .reduce((a, b) => a + b, 0);

      return (doughPrice + saucePrice + ingredientsSum) * multiplier;
    },

    pizzaPrice(pizza) {
      return pizza.quantity > 1
        ? `${pizza.quantity}х${pizza.price}`
        : pizza.price;
    },
    repeatOrder(order) {
      order.orderPizzas.forEach((item) => {
        const formattedIngredients = [];
        item.ingredients.forEach((item) => {
          let formattedItem = {
            ...getItemById(this.ingredients, item.ingredientId),
            count: item.quantity,
          };
          formattedIngredients.push(formattedItem);
        });
        const data = {
          dough: item.doughId,
          size: item.sizeId,
          sauce: item.sauceId,
          ingredients: formattedIngredients.slice(0),
          name: item.name,
          count: item.quantity,
        };
        this.REPEAT_ORDER(data);
        this.ADD_TO_CART();
      });
      order.orderMisc.forEach((item) => {
        this.UPDATE_COUNT_MISC(item);
      });
      this.RESET_BUILDER_STATE();
      this.GET_PIZZA_PARTS();
    },
  },
};
</script>

<style lang="scss" scoped></style>
