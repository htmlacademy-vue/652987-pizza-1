// Нормализация пиццы
export const normalizePizza = (item, constants) => {
  return {
    ...item,
    value: constants.find((constant) => constant?.name === item?.name)?.value,
  };
};
