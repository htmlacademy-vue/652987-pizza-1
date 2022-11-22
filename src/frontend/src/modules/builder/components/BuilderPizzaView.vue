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
          <div
            v-for="item in order.ingredients"
            :key="`${item.name}-${item.count}`"
            :class="['pizza__filling', `pizza__filling--${item.value}`]"
          ></div>
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
    ...mapActions("builder", ["GET_NAME_PIZZA", "UPDATE_INGREDIENTS"]),
    updatePizzaName(event) {
      this.GET_NAME_PIZZA(event.target.value);
    },
    onDrop(ingredient) {
      this.UPDATE_INGREDIENTS({
        inputName: ingredient,
      });
    },
  },
};
</script>
