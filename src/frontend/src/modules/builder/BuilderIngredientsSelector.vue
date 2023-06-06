<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <RadioButton
          v-for="sauce in sauces"
          :key="sauce.id"
          :class-radio-label="`radio ingredients__input`"
          :name="`sauce`"
          :params="sauce"
          :checked="order.sauce === sauce.id"
          data-test="sauce-input"
          @selected="updateOrder(sauce, 'sauce')"
        >
          <span>{{ sauce.name }}</span>
        </RadioButton>
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
          <li
            class="ingredients__item"
            v-for="item in ingredients"
            :key="item.id"
            data-test="ingredients-item"
          >
            <AppDrag
              :transfer-data="item"
              :isDraggable="item.count < MAX_COUNT_INGREDIENT"
            >
              <span class="filling" :class="`filling--${item.value}`">
                {{ item.name }}
              </span>
            </AppDrag>

            <ItemCounter
              :classCounter="`ingredients__counter`"
              :inputName="item.value"
              :id="item.id"
              :counter-value="item.count"
              data-test="ingredients-counter"
              @updateOrder="updateIngredients"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import AppDrag from "@/common/components/AppDrag";
import { mapGetters, mapActions, mapState } from "vuex";
import { MAX_COUNT_INGREDIENT } from "@/common/constants";
import { UPDATE_INGREDIENTS, UPDATE_ORDER } from "@/store/mutation-types";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    RadioButton,
    ItemCounter,
    AppDrag,
  },

  data() {
    return {
      MAX_COUNT_INGREDIENT,
    };
  },

  computed: {
    ...mapState("builder", ["order"]),
    ...mapGetters("builder", ["ingredients", "sauces"]),
  },

  methods: {
    ...mapActions("builder", [UPDATE_INGREDIENTS, UPDATE_ORDER]),

    updateIngredients(event) {
      const updateItem = this.ingredients.find((id) => id === event.id);
      if (updateItem) {
        updateItem.count = event.count;
      }
      this.UPDATE_INGREDIENTS({
        id: event.id,
        count: event.count,
      });
    },

    updateOrder(selected, type) {
      this.UPDATE_ORDER([
        {
          value: selected.id,
          name: type,
        },
      ]);
    },
  },
};
</script>
