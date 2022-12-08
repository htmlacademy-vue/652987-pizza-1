<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="createOrder"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="isCartEmpty" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <div v-else>
          <CartsCards :cards="orders" />
          <CartAdditional />
          <CartForm
            :reorder-address-id="addressId"
            :validations="validations"
            @setAddress="setAddress"
          />
        </div>
      </div>
    </main>

    <CartFooter v-if="!isCartEmpty" @click="RESET_BUILDER_STATE" />
    <NewOrderPopup
      v-if="showNewOrderPopup"
      @click="placeOrder"
      @close="closePopup"
    />
  </form>
</template>

<script>
import CartFooter from "@/modules/cart/CartFooter";
import CartsCards from "@/modules/cart/CartsCards";
import CartAdditional from "@/modules/cart/CartAdditional";
import CartForm from "@/modules/cart/CartForm";
import NewOrderPopup from "@/modules/modal/NewOrderPopup";
import { validator } from "@/common/mixins";
import { localeStorageService } from "@/services/localeStorage";
import { mapState, mapGetters, mapActions } from "vuex";
import {
  CREATE_ORDER,
  GET_MISC,
  GET_PIZZA_PARTS,
  RESET_BUILDER_STATE,
  RESET_CART_STATE,
  SET_CART_ITEMS,
} from "@/store/mutation-types";

export default {
  name: "Cart",
  mixins: [validator],
  components: {
    CartFooter,
    CartsCards,
    CartAdditional,
    CartForm,
    NewOrderPopup,
  },
  data() {
    return {
      showNewOrderPopup: false,
      address: null,
      addressId: null,
      phone: "",
      validations: {
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("cart", ["orders", "misc"]),
    isCartEmpty() {
      return this.orders.length === 0;
    },
  },
  watch: {
    isCartEmpty(val) {
      if (val) {
        this.RESET_CART_STATE();
        this.GET_MISC();
      }
    },
  },
  async created() {
    this.addressId = this.$route.params.addressId;
    const arrayMisc = localeStorageService.getJSON("misc");
    if (!arrayMisc.length) {
      this.GET_MISC();
    }
    this.setCartItems();
  },
  methods: {
    ...mapActions("builder", [RESET_BUILDER_STATE, GET_PIZZA_PARTS]),
    ...mapActions("cart", [RESET_CART_STATE, SET_CART_ITEMS, GET_MISC]),
    ...mapActions("orders", [CREATE_ORDER]),

    async createOrder() {
      if (
        this.address !== null &&
        this.address.id === null &&
        !this.$validateFields(
          { street: this.address.street, building: this.address.building },
          this.validations
        )
      ) {
        return;
      }

      const order = {
        userId: this.user ? this.user.id : null,
        phone: this.phone,
        address: this.address,
        pizzas: this.normalizePizzas(),
        misc: this.normalizeMisc(),
      };

      await this.CREATE_ORDER(order);

      if (this.user) {
        this.showNewOrderPopup = true;
      } else {
        await this.$router.push({ name: "Login" });
      }
    },

    normalizePizzas() {
      return this.orders.map((pizza) => {
        return {
          name: pizza.name,
          quantity: pizza.count,
          doughId: pizza.dough,
          sauceId: pizza.sauce,
          sizeId: pizza.size,
          ingredients: pizza.ingredients.map((ingredient) => {
            return {
              ingredientId: ingredient.id,
              quantity: ingredient.count,
            };
          }),
        };
      });
    },

    normalizeMisc() {
      return this.misc.map((item) => {
        return {
          miscId: item.id,
          quantity: item.count,
        };
      });
    },

    setCartItems() {
      this.SET_CART_ITEMS();
    },

    async placeOrder() {
      this.showNewOrderPopup = false;
      if (this.user) {
        await this.$router.push({ name: "Orders" });
      } else {
        await this.$router.push({ name: "IndexHome" });
      }
      localeStorageService.delete("orders");
      localeStorageService.delete("misc");
      this.RESET_BUILDER_STATE();
      this.RESET_CART_STATE();
      await this.GET_PIZZA_PARTS();
    },
    closePopup() {
      this.showNewOrderPopup = false;
    },
    setAddress({ phone, address }) {
      this.phone = phone;
      this.address = address;
    },
  },
};
</script>

<style lang="scss" scoped></style>
