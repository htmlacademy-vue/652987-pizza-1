import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setOrder, setPizzaName } from "@/store/mock";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const order = {
  count: 1,
  dough: 2,
  ingredients: [],
  pizzaName: "",
  price: 0,
  sauce: 2,
  size: 1,
};
describe("BuilderPriceCounter", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      cart: {
        ADD_TO_CART: jest.fn(),
      },
      builder: {
        RESET_BUILDER_STATE: jest.fn(),
        GET_PIZZA_PARTS: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("when pizza name is unset and no ingredients selected the button is disabled", () => {
    createComponent({ localVue, store });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    expect(addToCartBtn.attributes("disabled")).toBe("disabled");
  });

  it("when pizza name is set but no ingredients selected the button is disabled", () => {
    setOrder(store, order);
    createComponent({ localVue, store });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    expect(addToCartBtn.attributes("disabled")).toBe("disabled");
  });

  it("when pizza name is unset but ingredients selected the button is disabled", () => {
    setOrder(store, order);
    createComponent({ localVue, store });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    expect(addToCartBtn.attributes("disabled")).toBe("disabled");
  });

  it("when pizza name is set and ingredients selected the button is enabled", () => {
    setPizzaName(store);
    setOrder(store, {
      ...order,
      ingredients: [
        {
          count: 3,
          id: 1,
          image: "/public/img/filling/mushrooms.svg",
          name: "Грибы",
          price: 33,
          value: "mushrooms",
        },
      ],
    });
    createComponent({ localVue, store });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    expect(addToCartBtn.attributes("disabled")).toBeUndefined();
  });

  it("displays current pizza price", async () => {
    setOrder(store, {
      ...order,
      ingredients: [
        {
          count: 3,
          id: 1,
          image: "/public/img/filling/mushrooms.svg",
          name: "Грибы",
          price: 33,
          value: "mushrooms",
        },
      ],
    });
    createComponent({ localVue, store });
    expect(wrapper.html()).toContain(
      `${store.getters["builder/totalPrice"]} ₽`
    );
  });

  it("adds pizza to cart when the button clicked, then resets builder state", async () => {
    setPizzaName(store);
    setOrder(store, {
      ...order,
      ingredients: [
        {
          count: 3,
          id: 1,
          image: "/public/img/filling/mushrooms.svg",
          name: "Грибы",
          price: 33,
          value: "mushrooms",
        },
      ],
    });
    createComponent({ localVue, store });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    await addToCartBtn.trigger("click");
    expect(actions.cart.ADD_TO_CART).toHaveBeenCalled();
    expect(actions.builder.RESET_BUILDER_STATE).toHaveBeenCalled();
    expect(actions.builder.GET_PIZZA_PARTS).toHaveBeenCalled();
  });
});
