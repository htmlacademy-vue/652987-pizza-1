<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>

    <div class="sheet__content dough">
      <RadioButton
        v-for="item in dough"
        :key="item.id"
        :name="`dough`"
        :value="item.value"
        :isChecked="item.value === checked"
        :class="`dough__input dough__input--${item.value}`"
        :classRadioInput="`visually-hidden`"
        @change="
          $emit('selectDough', {
            type: item.value,
            price: item.price,
          })
        "
      >
        <b>{{ item.name }}</b>
        <span>{{ item.description }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  props: {
    dough: {
      type: Array,
      required: true,
    },
    checked: {
      type: String,
    },
  },
};
</script>
