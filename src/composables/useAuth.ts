import { useAuth0 } from '@auth0/auth0-vue'

export function useAuth() {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
    user
  } = useAuth0()

  async function login() {
    await loginWithRedirect()
  }

  async function logout() {
    await auth0Logout({
      logoutParams: {
        returnTo: `${globalThis.location.origin}/login`
      }
    })
  }

  async function getSession() {
    if (!isAuthenticated.value) return null

    const token = await getAccessTokenSilently()

    return {
      token,
      sub: user.value?.sub ?? '',
      email: user.value?.email ?? ''
    }
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    getSession
  }
}