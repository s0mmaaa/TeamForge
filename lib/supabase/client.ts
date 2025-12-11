"use client"

import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("[v0] Creating Supabase client:", { url: url ? "✓" : "✗", key: key ? "✓" : "✗" })

  if (!url || !key) {
    console.error("[v0] Missing Supabase credentials:", { url: !url, key: !key })
    throw new Error("Missing Supabase environment variables")
  }

  return createBrowserClient(url, key)
}

// Browser client singleton
let _supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!_supabaseClient) {
    _supabaseClient = createClient()
  }
  return _supabaseClient
}
