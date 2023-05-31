import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, setPizzaItems, setUser } from "@/store/mock";
import $validator from "@/common/mixins/validator";
import Vuex from "vuex";
import Cart from "@/views/Cart.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const emptyAddress = {
  id: null,
  street: "",
  building: "",
  flat: "",
  comment: "",
};

const testAddress = {
  id: null,
  street: "Зеленая",
  building: "1",
  flat: "1",
  comment: "Не звоните",
};

describe("Cart", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $route: {
      params: { addressId: null },
    },
    $validator,
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      orders: {
        CREATE_ORDER: jest.fn(),
      },
      cart: {
        SET_CART_ITEMS: jest.fn(),
        GET_MISC: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("displays message if cart is empty", () => {
    createComponent({ localVue, store, mocks });
    const message = wrapper.find('[data-test="cart-empty"]');
    const cartItems = wrapper.find('[data-test="cart-items"]');
    expect(message.exists()).toBeTruthy();
    expect(cartItems.exists()).toBeFalsy();
  });

  it("displays cart items and cart footer if cart isn't empty", () => {
    setPizzaItems(store);
    createComponent({ localVue, store, mocks });
    const cartItems = wrapper.find('[data-test="cart-items"]');
    const cartFooter = wrapper.find('[data-test="cart-footer"]');
    expect(cartItems.exists()).toBeTruthy();
    expect(cartFooter.exists()).toBeTruthy();
  });

  it("validation mixin has been called on form submit, invalid form isn't submitted", async () => {
    setPizzaItems(store);
    createComponent({ localVue, store, mocks });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    const addressForm = wrapper.find('[data-test="order-form"]');
    addressForm.vm.$emit("setAddress", { phone: "", address: emptyAddress });
    await wrapper.vm.$nextTick();
    await wrapper.find('[data-test="order-form"]').trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(actions.orders.CREATE_ORDER).not.toHaveBeenCalled();
  });

  it("authorised user makes a new order when submitting a valid form and displays a success pop-up window", async () => {
    setPizzaItems(store);
    setUser(store);
    createComponent({ localVue, store, mocks });
    const addressForm = wrapper.find('[data-test="order-form"]');
    addressForm.vm.$emit("setAddress", { phone: "", address: testAddress });
    await wrapper.vm.$nextTick();
    await wrapper.find('[data-test="order-form"]').trigger("submit");
    expect(actions.orders.CREATE_ORDER).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="success-popup"]').exists()).toBeTruthy();
  });

  it("the unauthorised user places a new order when submitting a valid form and goes to the authorisation page", async () => {
    setPizzaItems(store);
    createComponent({ localVue, store, mocks });
    const addressForm = wrapper.find('[data-test="order-form"]');
    addressForm.vm.$emit("setAddress", { phone: "", address: testAddress });
    await wrapper.vm.$nextTick();
    await wrapper.find('[data-test="order-form"]').trigger("submit");
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Login" });
  });
});
