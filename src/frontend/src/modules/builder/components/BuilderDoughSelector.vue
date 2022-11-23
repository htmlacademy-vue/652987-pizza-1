<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>

    <div class="sheet__content dough">
      <RadioButton
        v-for="dough in doughs"
        :key="dough.id"
        :name="`dough`"
        :params="dough"
        :checked="order.dough === dough.id"
        :class="`dough__input dough__input--${dough.value}`"
        :class-radio-input="`visually-hidden`"
        @selected="updateOrder(dough, 'dough')"
      >
        <b>{{ dough.name }}</b>
        <span>{{ dough.description }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapGetters, mapState, mapActions } from "vuex";
import { UPDATE_ORDER } from "@/store/mutation-types";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  computed: {
    ...mapState("builder", ["order"]),
    ...mapGetters("builder", ["doughs"]),
  },
  methods: {
    ...mapActions("builder", [UPDATE_ORDER]),
    updateOrder(selected, type) {
      this.UPDATE_ORDER([
        {
          value: selected.id,
          name: type,
          description: selected.name,
        },
      ]);
    },
  },
};
</script>
