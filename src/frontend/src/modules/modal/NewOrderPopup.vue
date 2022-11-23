<template>
  <div class="popup">
    <a href="#" class="close">
      <span
        class="visually-hidden"
        @click="$emit('closePopup', $event.target.value)"
        >Закрыть попап</span
      >
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a
        href="#"
        class="button"
        @click.prevent="$emit('click', $event.target.value)"
        >Отлично, я жду!</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NewOrderPopup",
};
</script>
