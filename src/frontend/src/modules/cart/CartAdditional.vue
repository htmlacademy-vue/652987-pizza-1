<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="item in mics"
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
            :counterValue="item.count"
            @updateOrder="updateMics"
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
export default {
  name: "CartAdditional",
  components: { ItemCounter },
  computed: {
    ...mapGetters("cart", ["mics"]),
  },
  methods: {
    ...mapActions("cart", ["UPDATE_MICS"]),
    updateMics(event) {
      this.UPDATE_MICS({
        buttonName: event.buttonName,
        inputName: event.inputName,
      });
    },
    formattedImage(data) {
      return prepareImage(data);
    },
  },
};
</script>
