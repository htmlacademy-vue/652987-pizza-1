<template>
  <ul class="cart-list sheet">
    <li v-for="(card, index) in cards" :key="card.id" class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="Капричоза"
        />
        <div class="product__text">
          <h2>{{ card.name }}</h2>
          <ul>
            <li>
              {{ getSizeText(card.size) }}, {{ getDoughText(card.dough) }}
            </li>
            <li>Соус: {{ getSauceText(card.sauce) }}</li>
            <li>Начинка: {{ getIngredientsList(card.ingredients) }}</li>
          </ul>
        </div>
      </div>

      <ItemCounter
        :classCounter="`counter additional-list__counter`"
        :orange-btn="true"
        :max-value="10"
        :inputName="card.name"
        :counter-value="card.count"
        :id="index"
        @updateOrder="updateAmount"
      />

      <div class="cart-list__price">
        <b>{{ card.totalPrice * card.count }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="goToPizzaBuilder(card)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapActions } from "vuex";
import {
  CHANGE_ORDER,
  DELETE_ITEM_CART,
  UPDATE_CART_ORDER,
} from "@/store/mutation-types";

export default {
  name: "CartCards",
  components: { ItemCounter },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions("cart", [UPDATE_CART_ORDER, DELETE_ITEM_CART]),
    ...mapActions("builder", [CHANGE_ORDER]),
    updateAmount(event) {
      this.UPDATE_CART_ORDER({
        id: event.id,
        count: event.count,
        name: event.name,
      });
      this.DELETE_ITEM_CART();
    },
    goToPizzaBuilder(pizza) {
      this.CHANGE_ORDER(pizza);
      this.$router.push("/");
    },
    getSizeText(size) {
      switch (size) {
        case 1:
          return "23 см";
        case 2:
          return "32 см";
        case 3:
          return "45 см";
      }
    },
    getDoughText(dough) {
      switch (dough) {
        case 1:
          return "на тонком тесте";
        case 2:
          return "на толстом тесте";
      }
    },
    getSauceText(sauce) {
      switch (sauce) {
        case 1:
          return "томатный";
        case 2:
          return "сливочный";
      }
    },
    getIngredientsList(ingredients) {
      return ingredients.map((item) => item.name.toLowerCase()).join(", ");
    },
  },
};
</script>

<style lang="scss" scoped></style>
