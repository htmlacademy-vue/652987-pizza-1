<template>
  <li>
    <img :src="item.image" width="20" height="30" :alt="item.name" />
    <p>
      <span>{{ item.name }}</span>
      <b>{{ item.count }}х{{ item.price }} ₽</b>
    </p>
  </li>
</template>

<script>
import { prepareImage } from "@/common/helpers";

export default {
  name: "OrdersAdditionalItem",

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formattedImage(data) {
      return prepareImage(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
