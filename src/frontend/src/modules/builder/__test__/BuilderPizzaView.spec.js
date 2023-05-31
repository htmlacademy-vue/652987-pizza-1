import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setPizzaName, setOrder } from "@/store/mock";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const testIngredient = {
  count: 0,
  id: 1,
};

const order = {
  count: 1,
  dough: 2,
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
  pizzaName: "",
  price: 0,
  sauce: 2,
  size: 1,
};

describe("BuilderPizzaView", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders input that displays current pizza name", () => {
    setPizzaName(store);
    createComponent({ localVue, store });
    expect(wrapper.find("input").element.value).toBe("testPizzaName");
  });

  it("sets pizza name when typing in input", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "SET_NAME_PIZZA");
    let input = wrapper.find("input");
    input.element.value = "test";
    await input.trigger("input");
    expect(spyOnAction).toHaveBeenCalled();
  });

  it("adds ingredient to pizza on drop event", () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "UPDATE_INGREDIENTS");
    const pizzaWrapper = wrapper.find('[data-test="pizza-wrapper"]');
    pizzaWrapper.vm.$emit("drop", testIngredient);
    expect(spyOnAction).toHaveBeenCalledWith({
      ...testIngredient,
      count: 1,
    });
  });

  it("renders ingredients if there are selected ingredients", () => {
    setOrder(store, order);
    createComponent({ localVue, store });
    const ingredient = wrapper.find(".pizza__filling");
    expect(ingredient.exists()).toBeTruthy();
  });

  it("renders specific classes if there are ingredients with quantity > 1", () => {
    setOrder(store, order);
    createComponent({ localVue, store });
    const secondIngredient = wrapper.find(".pizza__filling--second");
    const thirdIngredient = wrapper.find(".pizza__filling--third");
    expect(secondIngredient.exists()).toBeTruthy();
    expect(thirdIngredient.exists()).toBeTruthy();
  });
});
