<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart"> {{ totalCartPrice }} ₽ </router-link>
    </div>
    <div class="header__user">
      <router-link v-if="user" to="/profile">
        <AppPicture
          :src="user.avatar"
          :alt="user.name"
          :width="32"
          :height="32"
        />
        <span>{{ user.name }}</span>
      </router-link>
      <a v-if="user" href="#" class="header__logout" @click="$logout"
        ><span>Выйти</span></a
      >
      <router-link v-else to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { logout } from "@/common/mixins";
import AppPicture from "@/common/components/AppPicture";

export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  components: {
    AppPicture,
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("cart", ["totalCartPrice"]),
  },
};
</script>

<style lang="scss" scoped></style>
