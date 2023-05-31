import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setSauces, setIngredients } from "@/store/mock";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setSauces(store);
    setIngredients(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders sauce name for sauce selector", () => {
    createComponent({ localVue, store });
    const sauceSelector = wrapper.find('[data-test="sauce-input"]');
    expect(sauceSelector.html()).toContain("Томатный");
  });

  it("changes selected sauce on sauce selector click", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "updateOrder");
    const selector = wrapper.find('input[name="sauce"]');
    await selector.trigger("change");
    expect(spyOnAction).toHaveBeenCalledWith(
      {
        count: 0,
        id: 1,
        name: "Томатный",
        price: 50,
        value: "tomato",
      },
      "sauce"
    );
  });

  it("renders ingredient name for ingredient item", () => {
    createComponent({ localVue, store });
    const ingredientItem = wrapper.find('[data-test="ingredients-item"]');
    expect(ingredientItem.html()).toContain("Грибы");
  });

  it("changes ingredient quantity on ingredient counter click", async () => {
    createComponent({ localVue, store });
    const counter = wrapper.find('[data-test="ingredients-counter"]');
    await counter.vm.$emit("updateOrder", {
      count: 1,
      id: 1,
      name: "mushrooms",
    });
  });
});
