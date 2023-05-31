import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import CartCards from "@/modules/cart/CartCards";
import ItemCounter from "@/common/components/ItemCounter.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartCards", () => {
  const stubs = { ItemCounter };

  const propsData = {
    cards: [
      {
        id: 1,
        name: "Капричоза",
        size: 2,
        dough: 1,
        sauce: 1,
        ingredients: [
          {
            count: 0,
            id: 1,
            name: "mushrooms",
          },
        ],
        totalPrice: 200,
        count: 2,
      },
      {
        id: 2,
        name: "Мексиканская",
        size: 3,
        dough: 2,
        sauce: 2,
        ingredients: [
          {
            count: 0,
            id: 1,
            name: "mushrooms",
          },
        ],
        totalPrice: 300,
        count: 1,
      },
    ],
  };

  let actions;
  let store;
  let wrapper;

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = mount(CartCards, options);
  };

  beforeEach(() => {
    actions = {
      builder: {
        CHANGE_ORDER: jest.fn(),
      },
      cart: {
        UPDATE_CART_ORDER: jest.fn(),
        DELETE_ITEM_CART: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("changes pizza quantity on counter click if new quantity is more than 1", async () => {
    createComponent({ localVue, store, propsData, stubs });
    const counter = wrapper.find('[data-test="cart-cards-counter"]');
    await counter.vm.$emit("updateOrder", {
      count: 1,
      id: 1,
      name: "mushrooms",
    });
    expect(actions.cart.UPDATE_CART_ORDER).toHaveBeenCalled();
  });

  it("deletes pizza on counter click if new quantity is 0", async () => {
    createComponent({ localVue, store, propsData, stubs });
    const counter = wrapper.find('[data-test="cart-cards-counter"]');
    await counter.vm.$emit("updateOrder", {
      count: 0,
      id: 1,
      name: "mushrooms",
    });
    expect(actions.cart.UPDATE_CART_ORDER).toHaveBeenCalled();
    expect(actions.cart.DELETE_ITEM_CART).toHaveBeenCalled();
  });

  it("set pizza to builder on edit button clicked and redirects to index page", async () => {
    createComponent({ localVue, store, propsData, mocks });
    const editBtn = wrapper.find('[data-test="cart-cards-edit"]');
    await editBtn.trigger("click");
    expect(actions.builder.CHANGE_ORDER).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
