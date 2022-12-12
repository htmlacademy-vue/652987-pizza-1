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

    <AppDrop @drop="onDrop" class="content__constructor">
      <div
        :class="`pizza pizza--foundation--${currentDoughClass}-${currentSauceClass}`"
      >
        <div class="pizza__wrapper">
          <transition-group name="ingredient">
            <div
              v-for="item in order.ingredients"
              :key="`${item.name}-${item.count}`"
              :class="['pizza__filling', `pizza__filling--${item.value}`]"
            ></div>
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
.ingredient-leave-active {
  transition: all 0.5s;
}

.ingredient-enter,
.ingredient-leave-to {
  opacity: 0;
}

</style>
