"use server"

import { createClient } from "@/lib/supabase/server"

export async function signUpAction(email: string, password: string, name: string) {
  try {
    console.log("[v0] Server action: Starting signup for:", email)

    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (signUpError) {
      console.error("[v0] Signup auth error:", signUpError.message)
      return { success: false, error: signUpError.message }
    }

    if (!data.user) {
      return { success: false, error: "User creation failed" }
    }

    console.log("[v0] User created, creating profile:", data.user.id)

    const { error: profileError } = await supabase.from("users").insert({
      id: data.user.id,
      email: data.user.email,
      name: name || "",
      onboarding_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      console.error("[v0] Profile creation error:", profileError)
      return { success: false, error: "Profile creation failed" }
    }

    console.log("[v0] Signup successful")
    return { success: true }
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

export async function signInAction(email: string, password: string) {
  try {
    console.log("[v0] Server action: Starting signin for:", email)

    const supabase = createClient()

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      console.error("[v0] Signin auth error:", signInError.message)
      return { success: false, error: signInError.message }
    }

    if (!data.user) {
      return { success: false, error: "Sign in failed" }
    }

    console.log("[v0] Signin successful, fetching profile")

    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("onboarding_completed")
      .eq("id", data.user.id)
      .single()

    if (profileError && profileError.code !== "PGRST116") {
      console.error("[v0] Profile fetch error:", profileError)
    }

    return {
      success: true,
      onboarding_completed: userProfile?.onboarding_completed || false,
    }
  } catch (error) {
    console.error("[v0] Signin error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

export async function signOutAction() {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("[v0] Signout error:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Signout successful")
    return { success: true }
  } catch (error) {
    console.error("[v0] Signout error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

export async function getCurrentUserAction() {
  try {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { user: null }
    }

    console.log("[v0] Fetching user profile:", user.id)

    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError && profileError.code !== "PGRST116") {
      console.error("[v0] Profile fetch error:", profileError)
    }

    return {
      user: {
        ...user,
        profile: userProfile,
        onboarding_completed: userProfile?.onboarding_completed || false,
      },
    }
  } catch (error) {
    console.error("[v0] Get user error:", error)
    return { user: null }
  }
}
