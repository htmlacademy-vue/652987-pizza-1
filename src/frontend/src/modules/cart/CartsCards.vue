<template>
  <ul class="cart-list sheet">
    <li v-for="card in cards" :key="card.id" class="cart-list__item">
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
              {{ setSizeText(card.size) }}, {{ setDoughText(card.dough) }}
            </li>
            <li>Соус: {{ setSauceText(card.sauce) }}</li>
            <li>Начинка: {{ setIngredientsList(card.ingredients) }}</li>
          </ul>
        </div>
      </div>

      <ItemCounter
        :classCounter="`counter additional-list__counter`"
        :orange-btn="true"
        :max-value="10"
        :inputName="card.name"
        :counterValue="card.count"
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
    ...mapActions("cart", ["UPDATE_CART_ORDER"]),
    ...mapActions("builder", ["CHANGE_ORDER"]),
    updateAmount(event) {
      this.UPDATE_CART_ORDER({
        buttonName: event.buttonName,
        inputName: event.inputName,
      });
    },
    goToPizzaBuilder(pizza) {
      this.CHANGE_ORDER(pizza);
      this.$router.push("/");
    },
    setSizeText(size) {
      switch (size) {
        case 1:
          return "23 см";
        case 2:
          return "32 см";
        case 3:
          return "45 см";
      }
    },
    setDoughText(dough) {
      switch (dough) {
        case 1:
          return "на тонком тесте";
        case 2:
          return "на толстом тесте";
      }
    },
    setSauceText(sauce) {
      switch (sauce) {
        case 1:
          return "томатный";
        case 2:
          return "сливочный";
      }
    },
    setIngredientsList(ingredients) {
      return ingredients.map((item) => item.name.toLowerCase()).join(", ");
    },
  },
};
</script>

<style lang="scss" scoped></style>
