<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                class="dough__input"
                :class="`dough__input--${item.value}`"
                v-for="item in dough"
                :key="item.id"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="item.value"
                  class="visually-hidden"
                  checked
                />
                <b>{{ item.name }}</b>
                <span>{{ item.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                class="diameter__input"
                :class="`diameter__input--${item.value}`"
                v-for="item in sizes"
                :key="item.id"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="item.value"
                  class="visually-hidden"
                />
                <span>{{ item.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  class="radio ingredients__input"
                  v-for="item in sauces"
                  :key="item.id"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="item.value"
                    checked
                  />
                  <span>{{ item.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    class="ingredients__item"
                    v-for="item in ingredients"
                    :key="item.id"
                  >
                    <span class="filling" :class="`filling--${item.value}`">
                      {{ item.name }}
                    </span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

import {
  DOUGH_TYPES,
  SIZE_TYPES,
  SAUCE_TYPES,
  INGREDIENT_TYPES,
} from "@/common/constants";

import { normalizePizza } from "@/common/helpers";

export default {
  name: "Index",
  data() {
    return {
      misc: misc,
      user: user,
      dough: pizza.dough.map((item) => normalizePizza(item, DOUGH_TYPES)),
      sizes: pizza.sizes.map((item) => normalizePizza(item, SIZE_TYPES)),
      sauces: pizza.sauces.map((item) => normalizePizza(item, SAUCE_TYPES)),
      ingredients: pizza.ingredients.map((item) =>
        normalizePizza(item, INGREDIENT_TYPES)
      ),
    };
  },
};
</script>

<style lang="scss" scoped></style>
