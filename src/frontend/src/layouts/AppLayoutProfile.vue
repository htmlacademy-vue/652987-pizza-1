<template>
  <div>
    <Notifications />
    <AppLayoutHeader />

    <main class="layout">
      <AppLayoutSidebar />
      <slot />
    </main>
  </div>
</template>

<script>
import Notifications from "@/common/components/Notifications";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

export default {
  name: "AppLayoutDefault",

  components: {
    Notifications,
    AppLayoutHeader,
    AppLayoutSidebar,
  },
};
</script>
