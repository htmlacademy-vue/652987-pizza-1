import { createLocalVue, shallowMount } from "@vue/test-utils";
import OrdersItem from "@/modules/orders/OrdersItem.vue";
import {
  generateMockStore,
  setDough,
  setSauces,
  setSizes,
  setIngredients,
  setAdditionalItems,
} from "@/store/mock";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("OrdersItem", () => {
  const propsData = {
    order: {
      id: 1,
      phone: "",
      userId: "1",
      addressId: null,
      orderPizzas: [
        {
          id: 1,
          name: "Pizza name",
          quantity: 1,
          sauceId: 2,
          doughId: 2,
          sizeId: 1,
          orderId: 1,
          ingredients: [
            {
              id: 1,
              quantity: 1,
              pizzaId: 1,
              ingredientId: 4,
            },
            {
              id: 2,
              quantity: 1,
              pizzaId: 1,
              ingredientId: 8,
            },
          ],
        },
      ],
      orderMisc: [
        { id: 1, quantity: 0, orderId: 1, miscId: 1 },
        { id: 2, quantity: 1, orderId: 1, miscId: 3 },
        { id: 3, quantity: 1, orderId: 1, miscId: 3 },
      ],
    },
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(OrdersItem, options);
  };

  beforeEach(() => {
    actions = {
      cart: {
        ADD_TO_CART: jest.fn(),
        UPDATE_COUNT_MISC: jest.fn(),
      },
      orders: {
        DELETE_ORDER: jest.fn(),
      },
      builder: {
        REPEAT_ORDER: jest.fn(),
        RESET_BUILDER_STATE: jest.fn(),
        GET_PIZZA_PARTS: jest.fn(),
      },
    };

    store = generateMockStore(actions);
    setDough(store);
    setSizes(store);
    setSauces(store);
    setIngredients(store);
    setAdditionalItems(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("deletes order on delete button click", async () => {
    createComponent({ localVue, store, propsData });
    const deleteBtn = wrapper.find('[data-test="delete-btn"]');
    await deleteBtn.trigger("click");
    expect(actions.orders.DELETE_ORDER).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      propsData.order.id
    );
  });

  it("adds items to cart on repeat button click", async () => {
    createComponent({ localVue, store, propsData });
    const repeatBtn = wrapper.find('[data-test="repeat-btn"]');
    await repeatBtn.trigger("click");
    expect(actions.builder.REPEAT_ORDER).toHaveBeenCalled();
    expect(actions.cart.ADD_TO_CART).toHaveBeenCalled();
    expect(actions.cart.UPDATE_COUNT_MISC).toHaveBeenCalled();
    expect(actions.builder.RESET_BUILDER_STATE).toHaveBeenCalled();
    expect(actions.builder.GET_PIZZA_PARTS).toHaveBeenCalled();
  });
});
