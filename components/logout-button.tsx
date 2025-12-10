"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface LogoutButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function LogoutButton({ variant = "outline", size = "sm", className }: LogoutButtonProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      // The signOut function already handles the redirect
    } catch (error) {
      console.error("Error signing out:", error)
      // Force redirect even if there's an error
      router.push("/login")
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} className={className}>
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </Button>
  )
}
