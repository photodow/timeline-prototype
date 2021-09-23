/**
 * stringifies json object before setting it to storage
 * @returns undefined
 */
export const setStorage = (name, data) => {
  data = typeof data === 'object' ? JSON.stringify(data) : data;
  localStorage.setItem(name, data);
};
/**
 * returns a fully parsed JSON object from storage
 * @returns undefined
 */
export const getStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};
