<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <RadioButton
          v-for="item in sauces"
          :key="item.id"
          :name="`sauces`"
          :value="item.value"
          :classRadioLabel="`radio ingredients__input`"
          @change="
            $emit('selectSauce', { sauce: item.value, price: item.price })
          "
        >
          <span>{{ item.name }}</span>
        </RadioButton>
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
          <li
            class="ingredients__item"
            v-for="item in ingredients"
            :key="item.id"
          >
            <AppDrag
              :transfer-data="item.value"
              :isDraggable="canDrag(selectedIngredients[item.value])"
            >
              <span class="filling" :class="`filling--${item.value}`">
                {{ item.name }}
              </span>
            </AppDrag>

            <ItemCounter
              :name="item.value"
              :classCounter="`ingredients__counter`"
              :value="selectedIngredients[item.value]"
              @changeAmount="selectIngredients($event, item.value)"
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

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    ItemCounter,
    AppDrag,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    selectIngredients(amount, filling) {
      this.$emit("selectIngredients", { [filling]: amount });
    },
    canDrag(value) {
      return typeof value === "undefined" || value < 3;
    },
  },
};
</script>
