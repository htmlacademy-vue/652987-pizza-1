import { mount, createLocalVue } from "@vue/test-utils";
import {
  generateMockStore,
  setDough,
  setIngredients,
  setSauces,
  setSizes,
} from "@/store/mock";
import Vuex from "vuex";
import PizzaItem from "@/common/components/PizzaItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PizzaItem", () => {
  const propsData = {
    pizza: {
      id: 1,
      name: "Pizza name",
      doughId: 2,
      sauceId: 2,
      sizeId: 1,
      quantity: 1,
      ingredients: [
        { id: 1, quantity: 1, pizzaId: 1, ingredientId: 4 },
        { id: 2, quantity: 1, pizzaId: 1, ingredientId: 8 },
      ],
    },
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(PizzaItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setDough(store);
    setSizes(store);
    setSauces(store);
    setIngredients(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out pizza name", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("Pizza name");
  });

  it("renders out correct size and dough description", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("23 см, на толстом тесте");
  });

  it("renders out correct sauce description", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("Соус: сливочный");
  });

  it("renders out correct ingredients list", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("Начинка: ветчина, чили");
  });
});
