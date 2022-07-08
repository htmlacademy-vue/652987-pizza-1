<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>

    <div class="sheet__content diameter">
      <RadioButton
        v-for="item in sizes"
        :key="item.id"
        :name="`diameter`"
        :value="item.value"
        :classRadioLabel="`diameter__input diameter__input--${item.value}`"
        :classRadioInput="`visually-hidden`"
        @change="
          $emit('selectSize', {
            size: item.value,
            multiplier: item.multiplier,
          })
        "
      >
        <span>{{ item.name }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
};
</script>
