<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" @change="onSelectChanged($event)">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option v-if="user" value="3">Дом</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          v-model="addressForm.phone"
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
        />
      </label>

      <div v-if="isAddressFormVisible" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="addressForm.street"
              type="text"
              name="street"
              :readonly="isAddressReadonly"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="addressForm.house"
              type="text"
              name="house"
              :readonly="isAddressReadonly"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="addressForm.apartment"
              type="text"
              name="apartment"
              :readonly="isAddressReadonly"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CartForm",
  data() {
    return {
      isAddressFormVisible: false,
      isAddressReadonly: false,
      addressForm: {
        phone: "",
        street: "",
        house: "",
        apartment: "",
      },
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    onSelectChanged(event) {
      switch (event.target.value) {
        case "1":
          this.isAddressFormVisible = false;
          break;
        case "2":
          this.isAddressFormVisible = true;
          this.isAddressReadonly = false;
          this.addressForm.street = "";
          this.addressForm.house = "";
          this.addressForm.apartment = "";
          break;
        default:
          this.isAddressFormVisible = true;
          this.isAddressReadonly = true;
          this.addressForm.street = "Вязов";
          this.addressForm.house = "13";
          this.addressForm.apartment = "13";
      }
    },
  },
};
</script>
