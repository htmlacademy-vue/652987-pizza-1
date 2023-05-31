import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setUser, setAddresses } from "@/store/mock";
import CartForm from "@/modules/cart/CartForm.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartForm", () => {
  const propsData = {
    reorderAddressId: null,
    validations: {
      building: {
        error: "",
        rules: ["required"],
      },
      street: {
        error: "",
        rules: ["required"],
      },
    },
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(CartForm, options);
  };

  beforeEach(() => {
    actions = {
      addresses: {
        GET_ADDRESSES: jest.fn(),
        RESET_ADDRESSES_STATE: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("fetch addresses if user is authenticated", async () => {
    setUser(store);
    createComponent({ localVue, store, propsData });
    expect(actions.addresses.GET_ADDRESSES).toHaveBeenCalled();
  });

  it("reset addresses state if they exist but user isn't authenticated", async () => {
    setAddresses(store);
    createComponent({ localVue, store, propsData });
    expect(actions.addresses.RESET_ADDRESSES_STATE).toHaveBeenCalled();
  });

  it("form doesn't contain user generated addresses if user isn't authenticated", async () => {
    createComponent({ localVue, store, propsData });
    const userAddress = wrapper.find('[data-test="user-address"]');
    expect(userAddress.exists()).toBeFalsy();
  });

  it("form contains user generated addresses if they exist and user is authenticated", async () => {
    setUser(store);
    setAddresses(store);
    createComponent({ localVue, store, propsData });
    const userAddress = wrapper.find('[data-test="user-address"]');
    expect(userAddress.exists()).toBeTruthy();
    expect(userAddress.html()).toContain("Домик");
  });

  it("inputs for address aren't displayed in form by default", async () => {
    setUser(store);
    setAddresses(store);
    createComponent({ localVue, store, propsData });
    const streetInput = wrapper.find('input[name="street"]');
    expect(streetInput.exists()).toBeFalsy();
  });

  it("inputs for address display if default select value was changed to new address or user address", async () => {
    setUser(store);
    setAddresses(store);
    createComponent({ localVue, store, propsData });
    const select = wrapper.find("select");
    select.element.value = "newAddress";
    await select.trigger("change");
    await wrapper.vm.$nextTick();
    const streetInput = wrapper.find('input[name="street"]');
    expect(streetInput.exists()).toBeTruthy();
    expect(streetInput.element.value).toBe("");
  });

  it("form inputs change emits setAddress event with the current address value", async () => {
    createComponent({ localVue, store, propsData });
    const phoneInput = wrapper.find('input[name="tel"]');
    await phoneInput.trigger("change");
    expect(wrapper.emitted("setAddress")[0][0]).toEqual({
      phone: "",
      address: null,
    });
  });

  it("select value change emits setAddress event with the current address value", async () => {
    setUser(store);
    setAddresses(store);
    createComponent({ localVue, store, propsData });
    const select = wrapper.find("select");
    select.element.value = "1";
    await select.trigger("change");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("setAddress")[0][0]).toEqual({
      phone: "+777 777 777",
      address: {
        id: 1,
        street: "Зеленая",
        building: "1",
        flat: "1",
        comment: "Не звоните",
      },
    });
  });
});
