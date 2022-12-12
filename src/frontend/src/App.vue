<template>
  <div id="app">
    <AppLayout :price="totalCartPrice" :userData="userData">
      <transition name="slide" mode="out-in" :appear="isAnimated">
        <router-view />
      </transition>
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
    isAnimated() {
      return this.$route.name !== "Login";
    },
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

.slide-enter-active {
  transition: all 0.4s;
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}
</style>
