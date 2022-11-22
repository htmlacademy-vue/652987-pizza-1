<template>
  <div id="app">
    <AppLayout :price="totalCartPrice" :userData="userData">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { AppLayout },
  data() {
    return {
      userData: true,
    };
  },
  computed: {
    ...mapGetters("cart", ["totalCartPrice"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
