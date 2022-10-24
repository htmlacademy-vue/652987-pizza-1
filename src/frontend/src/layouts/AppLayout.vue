<template>
  <div class="app-layout">
    <component :is="layout" :price="price" :userData="userData">
      <slot />
    </component>
  </div>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  props: {
    price: {
      type: Number,
      required: true,
    },
    userData: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
