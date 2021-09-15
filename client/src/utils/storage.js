export const setToStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getFromStorage = (key) => {
  const value = window.localStorage.getItem(key)

  if (value) {
    return JSON.parse(value)
  }
}
