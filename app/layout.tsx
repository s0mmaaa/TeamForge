import type React from "react"
import "./globals.css"
import { Space_Grotesk, Poppins, Outfit, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Define fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
})

export const metadata = {
  title: "TeamForge - Build Amazing Teams",
  description: "Connect with talented developers and designers to build amazing projects together.",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${poppins.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
