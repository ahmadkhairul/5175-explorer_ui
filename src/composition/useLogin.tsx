import { ref, nextTick } from 'vue'
import type { Ref } from 'vue'
import { login } from '@/services'
import { setToken as setStorageToken } from '@/utils/storage'
import { useAuthStore } from '@/stores/auth'

export interface UseLoginFormReturn {
  username: Ref<string>
  password: Ref<string>
  rememberMe: Ref<boolean>
  message: Ref<string>
  handleLogin: () => Promise<void>
}

/**
 * useLoginForm
 *
 * This composable manages the user login process. It provides reactive states
 * for username, password, rememberMe checkbox, and an error message. It also
 * handles calling the login API and storing the token/user data.
 *
 * Workflow:
 * 1. Calls the login() service with the entered credentials
 * 2. On success:
 *    - Stores the token to local storage
 *    - Updates the auth store with token and user info
 *    - Reloads the page
 * 3. On failure:
 *    - Sets an error message to be shown on the UI
 *
 * @returns {{
 *   username: Ref<string>,
 *   password: Ref<string>,
 *   rememberMe: Ref<boolean>,
 *   message: Ref<string>,
 *   handleLogin: () => Promise<void>
 * }}
 */

export function useLoginForm(): UseLoginFormReturn {
  const auth = useAuthStore()

  const username: Ref<string> = ref('')
  const password: Ref<string> = ref('')
  const rememberMe: Ref<boolean> = ref(false)
  const message: Ref<string> = ref('')

  const handleLogin = async () => {
    try {
      const { token, ...result } = await login({
        username: username.value,
        password: password.value,
        rememberMe: rememberMe.value
      })

      setStorageToken(token)
      auth.setToken(token)
      auth.setUser(result)

      await nextTick()
      window.location.reload()
    } catch (_e: unknown) {
      const error: Error = _e as Error
      message.value = error.message
    }
  }

  return {
    username,
    password,
    rememberMe,
    message,
    handleLogin
  }
}
