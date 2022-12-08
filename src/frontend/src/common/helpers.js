import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
  BuilderApiService,
} from "@/services/api.service";

// Нормализация пиццы
export const normalizePizza = (item, constants) => {
  return {
    ...item,
    value: constants.find((constant) => constant?.name === item?.name)?.value,
    count: 0,
  };
};

export const getOrderPrice = (pizzas, misc) => {
  const pizzaPrices = pizzas.map((pizza) => pizza.price * pizza.quantity);
  const miscPrices = misc.map((misc) => misc.price * misc.count);
  const allPrices = [...pizzaPrices, ...miscPrices];

  return allPrices.length ? allPrices.reduce((a, b) => a + b, 0) : 0;
};

export const getItemById = (list, id) => {
  return list.find((item) => item.id === id);
};

export const prepareImage = (data) => {
  const imageName = data.slice(12, -4);
  return require(`@/assets/img/${imageName}.svg`);
};

export const getImageSources = (src) => {
  const getDefaultSrc = (src) =>
    `${src.replace(".jpg", "@2x.jpg")} 2x, ${src.replace(
      ".jpg",
      "@4x.jpg"
    )} 4x`;

  const getWebPSrc = (src) =>
    `${src.replace(".jpg", ".webp")} 1x, ${src.replace(
      ".jpg",
      "@2x.webp"
    )} 2x, ${src.replace(".jpg", "@4x.webp")} 4x`;

  return {
    webpSrcset: getWebPSrc(src),
    srcset: getDefaultSrc(src),
  };
};

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.BUILDER]: new BuilderApiService(notifier),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("auth/getMe");
};
