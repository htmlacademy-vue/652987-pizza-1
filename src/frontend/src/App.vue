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
import { setAuth } from "@/common/helpers";

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
  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("builder/GET_PIZZA_PARTS");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
