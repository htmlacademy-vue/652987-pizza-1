import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setDough } from "@/store/mock";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setDough(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders dough name and description for dough item", () => {
    createComponent({ localVue, store });
    expect(wrapper.html()).toContain("Тонкое");
    expect(wrapper.html()).toContain("Из твердых сортов пшеницы");
  });

  it("changes selected dough on dough selector click", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "updateOrder");
    const selector = wrapper.find('input[name="dough"]');
    await selector.trigger("change");
    expect(spyOnAction).toHaveBeenCalledWith(
      {
        count: 0,
        description: "Из твердых сортов пшеницы",
        id: 1,
        image: "/public/img/dough-light.svg",
        name: "Тонкое",
        price: 300,
        value: "light",
      },
      "dough"
    );
  });
});
