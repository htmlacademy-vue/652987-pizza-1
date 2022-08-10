<template>
  <div>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model.trim="pizzaName"
      />
    </label>

    <AppDrop @drop="addIngredient" class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${doughSize}-${selectedSauce.sauce}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="item in chosenIngredients"
            :key="`${item.name}-${item.amount}`"
            class="pizza__filling"
            :class="[
              `pizza__filling--${item.name}`,
              showIngredientAmount(item.amount),
            ]"
          ></div>
        </div>
      </div>
    </AppDrop>

    <BuilderPriceCounter
      :doughPrice="selectedDough.price"
      :sizePrice="selectedSize.multiplier"
      :saucePrice="selectedSauce.price"
      :isNameFilled="!!pizzaName"
      :ingredientsPrice="ingredientsPrice"
    />
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
    AppDrop,
  },
  props: {
    selectedDough: {
      type: Object,
      default: () => {},
    },
    selectedSize: {
      type: Object,
      default: () => {},
    },
    selectedSauce: {
      type: Object,
      default: () => {},
    },
    selectedIngredients: {
      type: Object,
      required: true,
    },
    allIngredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pizzaName: "",
    };
  },
  computed: {
    doughSize() {
      return this.selectedDough.type === "light" ? "small" : "big";
    },
    chosenIngredients() {
      const amount = [];
      Object.keys(this.selectedIngredients).forEach((item) => {
        for (let i = 0; i < this.selectedIngredients[item]; i++) {
          amount.push({ name: item, amount: i + 1 });
        }
      });
      return amount;
    },
    ingredientsPrice() {
      return Object.entries(this.selectedIngredients).reduce((result, item) => {
        const price =
          this.allIngredients.find((ingredient) => ingredient.value === item[0])
            .price * item[1];
        return (result += price);
      }, 0);
    },
  },
  methods: {
    showIngredientAmount(amount) {
      switch (amount) {
        case 2:
          return "pizza__filling--second";
        case 3:
          return "pizza__filling--second pizza__filling--third";
        default:
          return "";
      }
    },
    addIngredient(ingredient) {
      this.$emit("updateIngredients", ingredient);
    },
  },
};
</script>
