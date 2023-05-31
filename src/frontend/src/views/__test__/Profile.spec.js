import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, setAddresses, setUser } from "@/store/mock";
import Vuex from "vuex";
import ProfileView from "@/views/Profile";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileView", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(ProfileView, options);
  };

  beforeEach(() => {
    actions = {
      addresses: {
        GET_ADDRESSES: jest.fn(),
      },
    };

    store = generateMockStore(actions);
    setUser(store);
    setAddresses(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls vuex action to fetch addresses when created", async () => {
    createComponent({ localVue, store });
    await wrapper.vm.$nextTick();

    expect(actions.addresses.GET_ADDRESSES).toHaveBeenCalled();
  });

  it("displays address card (not form) for each existing address", () => {
    createComponent({ localVue, store });
    expect(wrapper.find('[data-test="address-card"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="address-form"]').exists()).toBeFalsy();
  });

  it("replaces address card to form when edit address button clicked", async () => {
    createComponent({ localVue, store });
    const editBtn = wrapper.find('[data-test="edit-address-button"]');
    await editBtn.trigger("click");
    expect(wrapper.find('[data-test="address-form"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="address-card"]').exists()).toBeFalsy();
  });

  it("displays news address form when add address button clicked", async () => {
    createComponent({ localVue, store });
    const addBtn = wrapper.find('[data-test="add-address-button"]');
    await addBtn.trigger("click");
    const newAddressForm = wrapper.find('[data-test="new-address-form"]');

    expect(newAddressForm.exists()).toBeTruthy();
  });
});
