<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>

    <div class="sheet__content diameter">
      <RadioButton
        v-for="item in sizes"
        :key="item.id"
        :name="`diameter`"
        :classRadioLabel="`diameter__input diameter__input--${item.value}`"
        :classRadioInput="`visually-hidden`"
        :params="item"
        :checked="order.size === item.id"
        @selected="updateOrder(item, 'diameter')"
      >
        <span>{{ item.name }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  computed: {
    ...mapState("builder", ["order"]),
    ...mapGetters("builder", ["sizes"]),
  },
  methods: {
    ...mapActions("builder", ["UPDATE_ORDER"]),
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
