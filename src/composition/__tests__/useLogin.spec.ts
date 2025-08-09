// __tests__/useLoginForm.spec.ts
import { useLoginForm } from '@/composition/useLogin'
import { setToken as setStorageToken } from '@/utils/storage'
import { login } from '@/services'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/services', () => ({
  login: vi.fn()
}))

vi.mock('@/utils/storage', () => ({
  setToken: vi.fn()
}))

const setTokenMock = vi.fn()
const setUserMock = vi.fn()

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    setToken: setTokenMock,
    setUser: setUserMock
  })
}))

describe('useLoginForm composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initial state is correct', () => {
    const loginForm = useLoginForm()
    expect(loginForm.username.value).toBe('')
    expect(loginForm.password.value).toBe('')
    expect(loginForm.rememberMe.value).toBe(false)
    expect(loginForm.message.value).toBe('')
  })

  it('handles successful login', async () => {
    const loginForm = useLoginForm()
    loginForm.username.value = 'testuser'
    loginForm.password.value = 'password'
    loginForm.rememberMe.value = true

    const mockToken = 'fake-token'
    const mockUser = { id: 1, name: 'Test User' }

    ;(login as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      token: mockToken,
      ...mockUser
    })

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() }
    })

    await loginForm.handleLogin()

    expect(setStorageToken).toHaveBeenCalledWith(mockToken)
    expect(setTokenMock).toHaveBeenCalledWith(mockToken)
    expect(setUserMock).toHaveBeenCalledWith(mockUser)
    expect(loginForm.message.value).toBe('')
    expect(window.location.reload).toHaveBeenCalled()
  })

  it('handles login error', async () => {
    const loginForm = useLoginForm()
    const errorMessage = 'Invalid credentials'
    ;(login as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage))

    await loginForm.handleLogin()

    expect(loginForm.message.value).toBe(errorMessage)
  })
})
