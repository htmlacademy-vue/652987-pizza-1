// Нормализация пиццы
export const normalizePizza = (item, constants) => {
  return {
    ...item,
    value: constants.find((constant) => constant?.name === item?.name)?.value,
    count: 0,
  };
};

export const prepareImage = (data) => {
  const imageName = data.slice(12, -4);
  return require(`@/assets/img/${imageName}.svg`);
};

export const getCartItems = (keyName) => {
  const items = localStorage.getItem(keyName);
  if (items) {
    return JSON.parse(items);
  }
  return [];
};

export const setCartItems = (keyName, items) => {
  localStorage.setItem(keyName, JSON.stringify(items));
};
