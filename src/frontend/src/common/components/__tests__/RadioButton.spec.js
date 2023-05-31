import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  const defaultPropsData = {
    checked: false,
    inputName: "testName",
    params: {
      value: "testValue",
    },
    classRadioInput: "test",
    classRadioLabel: "test",
    name: "test",
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
    wrapper = shallowMount(RadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets the initial model value", () => {
    createComponent(getPropsData());
    expect(wrapper.find("input").element.value).toBe(
      defaultPropsData.params.value
    );
  });

  it("emits change event on click and changes the checked to the opposite", async () => {
    createComponent(getPropsData());
    await wrapper.trigger("click");
    expect(wrapper.find("input").element).toBeTruthy();
  });

  it("input isn't checked if prop checked is false", () => {
    createComponent(getPropsData());
    expect(wrapper.find("input").element.checked).toBeFalsy();
  });

  it("input is checked if prop checked is true", () => {
    createComponent(getPropsData({ checked: true }));
    expect(wrapper.find("input").element.checked).toBeTruthy();
  });

  it("input name is prop name", () => {
    createComponent(getPropsData());
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(defaultPropsData.name);
  });

  it("if there is an option classRadioLabel to add a class", () => {
    createComponent(getPropsData());
    expect(wrapper.attributes("class")).toContain("test");
  });

  it("if there is an option classRadioInput to add a class", () => {
    createComponent(getPropsData());
    let input = wrapper.find("input");
    expect(input.attributes("class")).toContain("test");
  });
});
