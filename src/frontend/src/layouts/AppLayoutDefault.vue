<template>
  <div class="app-layout-default">
    <Notifications />
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import Notifications from "@/common/components/Notifications";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
    Notifications,
  },
};
</script>
