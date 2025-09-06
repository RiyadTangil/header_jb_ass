"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit3 } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeadlineSettings {
  text: string
  fontSize: number
  fontFamily: string
  fontWeight: string
  lineHeight: number
  letterSpacing: number
  textAlign: "left" | "center" | "right"
  useGradient: boolean
  gradientDirection: "to-r" | "to-l" | "to-b" | "to-t" | "to-br" | "to-bl"
  gradientColors: string[]
  gradientAnimate: boolean
  textShadow: boolean
  textGlow: boolean
  textOutline: boolean
  outlineColor: string
  shadowColor: string
  backgroundColor: string
  useBackground: boolean
  padding: number
  borderRadius: number
  animationType: "none" | "fade-in" | "slide-up" | "bounce" | "per-letter"
  hoverEffect: boolean
}

export default function PreviewPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<HeadlineSettings | null>(null)

  useEffect(() => {
    // Get settings from localStorage or URL params
    const savedSettings = localStorage.getItem("headlineSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    } else {
      // Default settings with black text
      setSettings({
        text: "Your Amazing Headline",
        fontSize: 48,
        fontFamily: "Playfair Display, serif",
        fontWeight: "700",
        lineHeight: 1.2,
        letterSpacing: 0,
        textAlign: "center",
        useGradient: false,
        gradientDirection: "to-r",
        gradientColors: ["#000000", "#333333"],
        gradientAnimate: false,
        textShadow: false,
        textGlow: false,
        textOutline: false,
        outlineColor: "#000000",
        shadowColor: "#000000",
        backgroundColor: "#ffffff",
        useBackground: false,
        padding: 24,
        borderRadius: 12,
        animationType: "fade-in",
        hoverEffect: true,
      })
    }
  }, [])

  const getHeadlineStyle = () => {
    if (!settings) return {}

    const baseStyle: React.CSSProperties = {
      fontFamily: settings.fontFamily,
      fontSize: `${settings.fontSize}px`,
      fontWeight: settings.fontWeight,
      lineHeight: settings.lineHeight,
      letterSpacing: `${settings.letterSpacing}px`,
      textAlign: settings.textAlign,
      margin: 0,
      padding: settings.useBackground ? `${settings.padding}px` : 0,
      borderRadius: settings.useBackground ? `${settings.borderRadius}px` : 0,
      backgroundColor: settings.useBackground ? settings.backgroundColor : "transparent",
      color: settings.useGradient ? "transparent" : "#000000", // Default to black text
    }

    if (settings.useGradient) {
      const direction = settings.gradientDirection.replace("to-", "")
      baseStyle.background = `linear-gradient(${direction}, ${settings.gradientColors.join(", ")})`
      baseStyle.WebkitBackgroundClip = "text"
      baseStyle.WebkitTextFillColor = "transparent"
      baseStyle.backgroundClip = "text"
    }

    if (settings.textShadow) {
      baseStyle.textShadow = `2px 2px 4px ${settings.shadowColor}`
    }

    if (settings.textGlow) {
      baseStyle.filter = "drop-shadow(0 0 10px currentColor)"
    }

    if (settings.textOutline) {
      baseStyle.WebkitTextStroke = `1px ${settings.outlineColor}`
    }

    return baseStyle
  }

  const getAnimationProps = () => {
    if (!settings) return {}

    switch (settings.animationType) {
      case "fade-in":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8 },
        }
      case "slide-up":
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
        }
      case "bounce":
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.8, type: "spring", bounce: 0.4 },
        }
      default:
        return {}
    }
  }

  const renderHeadline = () => {
    if (!settings) return null

    if (settings.animationType === "per-letter") {
      return (
        <motion.h1
          style={getHeadlineStyle()}
          className={`${settings.gradientAnimate && settings.useGradient ? "gradient-animate" : ""} ${
            settings.textGlow ? "text-glow-subtle" : ""
          } ${settings.hoverEffect ? "transition-all duration-300 hover:scale-105" : ""}`}
        >
          {settings.text.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      )
    }

    return (
      <motion.h1
        {...getAnimationProps()}
        style={getHeadlineStyle()}
        className={`${settings.gradientAnimate && settings.useGradient ? "gradient-animate" : ""} ${
          settings.textGlow ? "text-glow-subtle" : ""
        } ${settings.hoverEffect ? "transition-all duration-300 hover:scale-105" : ""}`}
      >
        {settings.text}
      </motion.h1>
    )
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading preview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with navigation */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Editor
          </Button>

          <h1 className="text-lg font-semibold">Preview Mode</h1>

          <Button onClick={() => router.push("/")} className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </header>

      {/* Full-screen preview */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl mx-auto text-center">{renderHeadline()}</div>
      </main>

      {/* Footer info */}
      <footer className="border-t bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 text-center text-sm text-muted-foreground">
          Headline Widget Demo - Clean preview without distractions
        </div>
      </footer>
    </div>
  )
}
