<template>
  <div>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="currentName"
        @input="updatePizzaName"
      />
    </label>

    <AppDrop
      @drop="onDrop"
      class="content__constructor"
      data-test="pizza-wrapper"
    >
      <div
        :class="`pizza pizza--foundation--${currentDoughClass}-${currentSauceClass}`"
      >
        <div class="pizza__wrapper">
          <transition-group name="ingredient">
            <div v-for="ingredient in order.ingredients" :key="ingredient.id">
              <div
                class="pizza__filling"
                :class="`pizza__filling--${ingredient.value}`"
              />
              <transition name="ingredient-second">
                <div
                  v-if="ingredient.count >= 2"
                  class="pizza__filling pizza__filling--second"
                  :class="`pizza__filling--${ingredient.value}`"
                />
              </transition>
              <transition name="ingredient-third">
                <div
                  v-if="ingredient.count === 3"
                  class="pizza__filling pizza__filling--third"
                  :class="`pizza__filling--${ingredient.value}`"
                />
              </transition>
            </div>
          </transition-group>
        </div>
      </div>
    </AppDrop>

    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";
import { mapGetters, mapState, mapActions } from "vuex";
import { SET_NAME_PIZZA, UPDATE_INGREDIENTS } from "@/store/mutation-types";

export default {
  name: "BuilderPizzaView",

  components: {
    BuilderPriceCounter,
    AppDrop,
  },

  computed: {
    ...mapState("builder", ["order"]),
    ...mapGetters("builder", [
      "currentName",
      "currentDoughClass",
      "currentSauceClass",
    ]),
  },

  methods: {
    ...mapActions("builder", [SET_NAME_PIZZA, UPDATE_INGREDIENTS]),

    updatePizzaName(event) {
      this.SET_NAME_PIZZA(event.target.value);
    },

    onDrop(event) {
      let newCount = (event.count += 1);
      this.UPDATE_INGREDIENTS({
        id: event.id,
        count: newCount,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ingredient-enter-active,
.ingredient-second-enter-active,
.ingredient-third-enter-active,
.ingredient-leave-active,
.ingredient-second-leave-active,
.ingredient-third-leave-active {
  transition: all 0.5s;
}

.ingredient-enter,
.ingredient-second-enter,
.ingredient-third-enter,
.ingredient-leave-to,
.ingredient-second-leave-to,
.ingredient-third-leave-to {
  opacity: 0;
}

.ingredient-second-enter {
  transform: rotate(15deg);
}

.ingredient-third-enter {
  transform: rotate(-15deg);
}
</style>
