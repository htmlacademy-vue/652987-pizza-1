import { shallowMount } from "@vue/test-utils";
import OrdersAdditionalItem from "@/modules/orders/OrdersAdditionalItem.vue";

describe("OrdersAdditionalItem", () => {
  const propsData = {
    item: {
      count: 1,
      id: 1,
      image: "/public/img/sauce.svg",
      name: "Острый соус",
      price: 10,
    },
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(OrdersAdditionalItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders out additional item description", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain(propsData.item.name);
    expect(wrapper.html()).toContain(propsData.item.price);
    expect(wrapper.html()).toContain(propsData.item.count);
  });

  it("renders out additional item image", () => {
    createComponent({ propsData });
    const image = wrapper.find("img");
    expect(image.attributes("src")).toBe(propsData.item.image);
    expect(image.attributes("alt")).toBe(propsData.item.name);
  });
});
