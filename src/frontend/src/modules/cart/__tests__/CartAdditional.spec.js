import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setAdditionalItems } from "@/store/mock";
import CartAdditional from "@/modules/cart/CartAdditional.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartAdditional", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(CartAdditional, options);
  };

  beforeEach(() => {
    actions = {
      cart: {
        UPDATE_MISC: jest.fn(),
      },
    };

    store = generateMockStore(actions);
    setAdditionalItems(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("changes additional item quantity on counter click", async () => {
    createComponent({ localVue, store });
    const counter = wrapper.find('[data-test="additional-list-counter"]');
    await counter.vm.$emit("updateOrder", {
      id: 1,
      count: 1,
    });
    expect(actions.cart.UPDATE_MISC).toHaveBeenCalled();
  });
});
