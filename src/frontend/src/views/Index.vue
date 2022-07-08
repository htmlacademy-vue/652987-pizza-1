<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            v-if="dough.length"
            :dough="dough"
            @selectDough="selectedDough = $event"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            v-if="sizes.length"
            :sizes="sizes"
            @selectSize="selectedSize = $event"
          />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector
            :sauces="sauces"
            :ingredients="ingredients"
            :selectedIngredients="selectedIngredients"
            @selectSauce="selectedSauce = $event"
            @selectIngredients="selectIngredients"
          />
        </div>

        <div class="content__pizza">
          <BuilderPizzaView
            :selected-dough="selectedDough"
            :selected-sauce="selectedSauce"
            :selectedSize="selectedSize"
            :selectedIngredients="selectedIngredients"
            :allIngredients="ingredients"
            @updateIngredients="addIngredient"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";

import {
  DOUGH_TYPES,
  SIZE_TYPES,
  SAUCE_TYPES,
  INGREDIENT_TYPES,
} from "@/common/constants";

import { normalizePizza } from "@/common/helpers";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      misc: misc,
      user: user,
      dough: pizza.dough.map((item) => normalizePizza(item, DOUGH_TYPES)),
      sizes: pizza.sizes.map((item) => normalizePizza(item, SIZE_TYPES)),
      sauces: pizza.sauces.map((item) => normalizePizza(item, SAUCE_TYPES)),
      ingredients: pizza.ingredients.map((item) =>
        normalizePizza(item, INGREDIENT_TYPES)
      ),
      selectedDough: {},
      selectedSauce: {},
      selectedSize: {},
      selectedIngredients: {},
    };
  },
  methods: {
    selectIngredients(ingredientSet) {
      this.selectedIngredients = {
        ...this.selectedIngredients,
        ...ingredientSet,
      };
    },
    addIngredient(ingredientName) {
      if (this.selectedIngredients[ingredientName]) {
        console.log(this.selectedIngredients[ingredientName] + 1)
        this.$set(
          this.selectedIngredients,
          ingredientName,
          this.selectedIngredients[ingredientName] + 1
        );
      } else {
        this.$set(this.selectedIngredients, ingredientName, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
