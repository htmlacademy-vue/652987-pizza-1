import { createLocalVue, shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mock";
import Index from "@/views/Index.vue";

import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);
describe("Index", () => {
  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Index, options);
  };

  beforeEach(() => {
    actions = {
      cart: {
        SET_CART_ITEMS: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders all the components", () => {
    createComponent({ localVue, store });
    const builderDoughSelector = wrapper.find(
      '[data-test="builder-doug-selector"]'
    );
    const builderSizeSelector = wrapper.find(
      '[data-test="builder-size-selector"]'
    );
    const builderIngredientsSelector = wrapper.find(
      '[data-test="builder-ingredients-selector"]'
    );
    const builderPizzaView = wrapper.find('[data-test="builder-pizza-view"]');
    expect(builderDoughSelector.exists()).toBeTruthy();
    expect(builderSizeSelector.exists()).toBeTruthy();
    expect(builderIngredientsSelector.exists()).toBeTruthy();
    expect(builderPizzaView.exists()).toBeTruthy();
  });

  it("calls setCartItems method on created hook", () => {
    createComponent({ localVue, store });
    expect(actions.cart.SET_CART_ITEMS).toHaveBeenCalled();
  });
});
