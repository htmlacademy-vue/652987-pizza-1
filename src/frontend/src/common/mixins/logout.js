export default {
  methods: {
    async $logout() {
      await this.$store.dispatch("auth/LOGOUT");
      await this.$router.push("/login");
    },
  },
};
