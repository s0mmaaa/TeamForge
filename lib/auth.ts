import { signUpAction, signInAction, signOutAction, getCurrentUserAction } from "@/app/actions/auth"

export async function signUp(email: string, password: string, metadata?: Record<string, any>) {
  return await signUpAction(email, password, metadata?.name || "")
}

export async function signIn(email: string, password: string) {
  return await signInAction(email, password)
}

export async function signOut() {
  return await signOutAction()
}

export async function getCurrentUser() {
  return await getCurrentUserAction()
}

export function clearSession() {
  return Promise.resolve()
}
