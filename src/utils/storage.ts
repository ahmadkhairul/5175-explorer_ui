const TOKEN_STORAGE = 'token'

export async function setToken(value: string) {
  await Promise.resolve()
  localStorage.setItem(TOKEN_STORAGE, value)
}

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE)
}

export async function clearStorages() {
  await Promise.resolve()
  localStorage.removeItem(TOKEN_STORAGE)
}
