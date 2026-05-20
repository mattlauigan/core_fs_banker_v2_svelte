export const ls = {
  get: (key: string) => {localStorage.getItem(key)},
  add: (key: string, value: string) => {localStorage.setItem(key, value)},
  remove: (key: string) => {localStorage.removeItem(key)},
}