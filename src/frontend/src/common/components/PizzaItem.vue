<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="pizza.name"
    />
    <div class="product__text">
      <h2>{{ pizza.name }}</h2>
      <ul>
        <li>
          {{ getSizeText(pizza.sizeId) }}, {{ getDoughText(pizza.doughId) }}
        </li>
        <li>Соус: {{ getSauceText(pizza.sauceId) }}</li>
        <li>Начинка: {{ getIngredientsText(pizza.ingredients) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getItemById } from "@/common/helpers";

export default {
  name: "PizzaItem",

  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("builder", ["dough", "sauces", "sizes", "ingredients"]),
  },

  methods: {
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

    getIngredientsText(ingredients) {
      const names = ingredients.map((ingredient) => {
        return getItemById(this.ingredients, ingredient.ingredientId)?.name;
      });
      return names.map((item) => item?.toLowerCase()).join(", ");
    },
  },
};
</script>

<style lang="scss" scoped></style>
