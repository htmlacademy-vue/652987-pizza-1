<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector data-test="builder-doug-selector" />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector data-test="builder-size-selector" />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector
            data-test="builder-ingredients-selector"
          />
        </div>

        <div class="content__pizza">
          <BuilderPizzaView data-test="builder-pizza-view" />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView.vue";
import { mapActions } from "vuex";
import { SET_CART_ITEMS } from "@/store/mutation-types";

export default {
  name: "IndexPage",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },

  created() {
    this.setCartItems();
  },

  methods: {
    ...mapActions("cart", [SET_CART_ITEMS]),

    setCartItems() {
      this.SET_CART_ITEMS();
    },
  },
};
</script>

<style lang="scss" scoped></style>
