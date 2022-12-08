<template>
  <div class="user" v-if="user">
    <AppPicture :src="user.avatar" :alt="user.name" :width="72" :height="72" />
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppPicture from "@/common/components/AppPicture";

export default {
  name: "ProfileUserBlock",
  components: {
    AppPicture,
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>

<style lang="scss" scoped></style>
