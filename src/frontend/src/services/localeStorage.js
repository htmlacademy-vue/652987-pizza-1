export const localeStorageService = {
  set(key, value) {
    return localStorage.setItem(key, value);
  },

  get(key) {
    return localStorage.getItem(key);
  },

  delete(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },

  getJSON(key) {
    const data = localeStorageService.get(key);
    if (!data) {
      return [];
    }

    return JSON.parse(data);
  },

  setJSON(key, value) {
    this.set(key, JSON.stringify(value));
  },
};
