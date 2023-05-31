import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, setOrders } from "@/store/mock";
import Vuex from "vuex";
import OrdersView from "@/views/Orders";

const localVue = createLocalVue();
localVue.use(Vuex);

const orders = [
  {
    id: 1,
    phone: "",
    userId: "f296ed64-c8a0-469b-be53-a015b7032df0",
    addressId: null,
    orderPizzas: [
      {
        id: 1,
        name: "123",
        quantity: 1,
        sauceId: 2,
        doughId: 2,
        sizeId: 1,
        orderId: 1,
        ingredients: [
          { id: 1, quantity: 1, pizzaId: 1, ingredientId: 4 },
          { id: 2, quantity: 1, pizzaId: 1, ingredientId: 8 },
        ],
      },
    ],
    orderMisc: [
      { id: 1, quantity: 0, orderId: 1, miscId: 1 },
      { id: 2, quantity: 0, orderId: 1, miscId: 2 },
      { id: 3, quantity: 0, orderId: 1, miscId: 3 },
    ],
  },
  {
    id: 3,
    phone: "",
    userId: "c57084d3-212d-4db1-9349-0d199c563869",
    addressId: null,
    orderPizzas: [
      {
        id: 4,
        name: "ffff",
        quantity: 1,
        sauceId: 1,
        doughId: 1,
        sizeId: 1,
        orderId: 3,
        ingredients: [
          { id: 8, quantity: 1, pizzaId: 4, ingredientId: 2 },
          { id: 9, quantity: 2, pizzaId: 4, ingredientId: 3 },
          { id: 10, quantity: 1, pizzaId: 4, ingredientId: 7 },
          { id: 11, quantity: 1, pizzaId: 4, ingredientId: 8 },
        ],
      },
      {
        id: 5,
        name: "2",
        quantity: 1,
        sauceId: 2,
        doughId: 2,
        sizeId: 1,
        orderId: 3,
        ingredients: [{ id: 12, quantity: 1, pizzaId: 5, ingredientId: 4 }],
      },
    ],
    orderMisc: [
      { id: 7, quantity: 1, orderId: 3, miscId: 1 },
      { id: 8, quantity: 1, orderId: 3, miscId: 2 },
      { id: 9, quantity: 0, orderId: 3, miscId: 3 },
    ],
  },
];

describe("OrdersView", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(OrdersView, options);
  };

  beforeEach(() => {
    actions = {
      cart: {
        GET_MISC: jest.fn(),
        SET_CART_ITEMS: jest.fn(),
      },
      orders: {
        GET_ORDERS: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls vuex actions to fetch orders and additional items when created", async () => {
    createComponent({ localVue, store });
    await wrapper.vm.$nextTick();

    expect(actions.cart.GET_MISC).toHaveBeenCalled();
    expect(actions.cart.SET_CART_ITEMS).toHaveBeenCalled();
    expect(actions.orders.GET_ORDERS).toHaveBeenCalled();
  });

  it("displays message if orders list is empty", () => {
    createComponent({ localVue, store, mocks });
    const message = wrapper.find('[data-test="orders-empty"]');
    const ordersList = wrapper.find('[data-test="orders-list"]');
    expect(message.exists()).toBeTruthy();
    expect(ordersList.exists()).toBeFalsy();
  });

  it("displays orders list if orders exist", () => {
    setOrders(store, orders);
    createComponent({ localVue, store, mocks });
    const ordersList = wrapper.find('[data-test="orders-list"]');
    const orderComponent = wrapper.find('[data-test="order-item"]');
    expect(ordersList.exists()).toBeTruthy();
    expect(orderComponent.exists()).toBeTruthy();
  });
});
