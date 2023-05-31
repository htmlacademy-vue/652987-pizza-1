import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  const defaultPropsData = {
    classCounter: "test-class",
    orangeBtn: true,
    inputName: "test",
    counterValue: 1,
    maxValue: 3,
    id: 1,
  };

  const getPropsData = (params) => {
    return {
      propsData: {
        ...defaultPropsData,
        ...params,
      },
    };
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets the initial value", () => {
    createComponent(getPropsData());
    expect(wrapper.find("input").element.value).toBe("1");
  });

  it("click on the plus button -> increase the value by 1", async () => {
    createComponent(getPropsData());
    const plusButton = wrapper.find(".counter__button--plus");
    await plusButton.trigger("click");
    expect(wrapper.emitted("updateOrder")[0][0]).toStrictEqual({
      count: 2,
      id: 1,
      name: "test",
    });
  });

  it("click on the minus button -> decrease the value by 1", async () => {
    createComponent(getPropsData());
    const minusButton = wrapper.find(".counter__button--minus");
    await minusButton.trigger("click");
    expect(wrapper.emitted("updateOrder")[0][0]).toStrictEqual({
      count: 0,
      id: 1,
      name: "test",
    });
  });

  it("plus button is disabled when value is equal to max value", () => {
    createComponent(getPropsData({ counterValue: 3 }));
    const plusButton = wrapper.find(".counter__button--plus");
    expect(plusButton.attributes("disabled")).toBe("disabled");
  });

  it("minus button is disabled when value is equal to min value", () => {
    createComponent(getPropsData({ counterValue: 0 }));
    const minusButton = wrapper.find(".counter__button--minus");
    expect(minusButton.attributes("disabled")).toBe("disabled");
  });

  it("plus button has orange color if prop orangeBtn is true", () => {
    createComponent(getPropsData());
    expect(wrapper.find(".counter__button--plus").classes()).toContain(
      "counter__button--orange"
    );
  });

  it("plus button has default styles if prop orangeBtn is false", () => {
    createComponent(getPropsData({ orangeBtn: false }));
    expect(
      wrapper.find(".counter__button--plus").classes("counter__button--orange")
    ).toBeFalsy();
  });

  it("input attribute name", () => {
    createComponent(getPropsData());
    expect(wrapper.find("input").attributes("name")).toBe(
      defaultPropsData.inputName
    );
  });

  it("required classCounter", () => {
    createComponent(getPropsData());
    expect(wrapper.attributes("class")).toContain("test-class");
  });

  it("input type is prop id", () => {
    createComponent(getPropsData());
    let input = wrapper.find("input");
    expect(input.attributes("id")).toBe(defaultPropsData.type);
  });
});
