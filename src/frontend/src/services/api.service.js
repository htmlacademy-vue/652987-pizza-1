import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";
import {
  SIZE_TYPES,
  DOUGH_TYPES,
  SAUCE_TYPES,
  INGREDIENT_TYPES,
  MISC_TYPES,
} from "@/common/constants";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

// наследуемся от BaseApiService, так как класс не подразумевает CRUD операции
export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    // передаём notifier для использования в родительском конструкторе
    super(notifier);
  }

  // задаём токен авторизации
  setAuthHeader() {
    // получаем токен из LocalStorage с помощью JWT-сервиса
    const token = JwtService.getToken();
    // добавляем заголовок авторизации в axios как Bearer token
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    // отправляем логин/пароль для авторизации на сервере
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    // делаем логаут на сервере
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    // получаем профиль залогиненного пользователя
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class ReadOnlyApiService extends BaseApiService {
  // resource — приватное свойство класса. Добавляем его к базовому URL, чтобы получить
  // финальный URL, на который нужно отправлять запросы
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

// Наследуемся от Read-only API-сервиса и добавляем операции post, put, delete
export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  // запрос на удаление сущности
  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class BuilderApiService extends BaseApiService {
  normalizePizza = (item, constants) => {
    return {
      ...item,
      value: constants.find((constant) => constant?.name === item?.name)?.value,
      count: 0,
    };
  };

  async fetchDough() {
    const { data } = await axios.get("dough");
    return data
      .slice(0, 2)
      .map((item) => this.normalizePizza(item, DOUGH_TYPES));
  }

  async fetchSauces() {
    const { data } = await axios.get("sauces");
    return data
      .slice(0, 2)
      .map((item) => this.normalizePizza(item, SAUCE_TYPES));
  }

  async fetchSizes() {
    const { data } = await axios.get("sizes");
    return data
      .slice(0, 3)
      .map((item) => this.normalizePizza(item, SIZE_TYPES));
  }

  async fetchMisc() {
    const { data } = await axios.get("misc");
    return data
      .slice(0, 3)
      .map((item) => this.normalizePizza(item, MISC_TYPES));
  }

  async fetchIngredients() {
    const { data } = await axios.get("ingredients");
    return data
      .slice(0, 15)
      .map((item) => this.normalizePizza(item, INGREDIENT_TYPES));
  }
}
