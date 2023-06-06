<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="item in misc"
        :key="item.id"
      >
        <p class="additional-list__description">
          <img
            :src="formattedImage(item.image)"
            :alt="item.name"
            width="39"
            height="60"
          />
          <span>{{ item.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <ItemCounter
            :classCounter="`counter additional-list__counter`"
            :orange-btn="true"
            :max-value="100"
            :inputName="item.value"
            :counter-value="item.count"
            :id="item.id"
            @updateOrder="updateMics"
            data-test="additional-list-counter"
          />

          <div class="additional-list__price">
            <b v-if="item.count > 0">{{ item.price * item.count }} ₽</b>
            <b v-else>× {{ item.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapActions, mapGetters } from "vuex";
import { prepareImage } from "@/common/helpers";
import { UPDATE_MISC } from "@/store/mutation-types";
export default {
  name: "CartAdditional",

  components: { ItemCounter },

  computed: {
    ...mapGetters("cart", ["misc"]),
  },

  methods: {
    ...mapActions("cart", [UPDATE_MISC]),

    updateMics(event) {
      this.UPDATE_MISC({
        id: event.id,
        count: event.count,
      });
    },

    formattedImage(data) {
      return prepareImage(data);
    },
  },
};
</script>
