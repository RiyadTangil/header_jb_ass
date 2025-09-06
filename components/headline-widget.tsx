"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Download,
  Copy,
  RefreshCw,
  Type,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  ExternalLink,
  Settings,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface HeadlineSettings {
  text: string
  fontSize: number
  fontFamily: string
  fontWeight: string
  lineHeight: number
  letterSpacing: number
  textAlign: "left" | "center" | "right"
  textColor: string

  // Gradient settings
  useGradient: boolean
  gradientDirection: "to-r" | "to-l" | "to-b" | "to-t" | "to-br" | "to-bl"
  gradientColors: string[]
  gradientAnimate: boolean

  // Effects
  textShadow: boolean
  textGlow: boolean
  textOutline: boolean
  outlineColor: string
  shadowColor: string

  // Advanced styling
  backgroundColor: string
  useBackground: boolean
  padding: number
  borderRadius: number

  // Animation
  animationType: "none" | "fade-in" | "slide-up" | "bounce" | "per-letter"
  hoverEffect: boolean
}

const fontFamilies = [
  { name: "Playfair Display", value: "Playfair Display, serif" },
  { name: "Source Sans Pro", value: "Source Sans Pro, sans-serif" },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Poppins", value: "Poppins, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Open Sans", value: "Open Sans, sans-serif" },
  { name: "Geist Sans", value: "var(--font-geist-sans), sans-serif" },
  { name: "Geist Mono", value: "var(--font-geist-mono), monospace" },
]

const fontWeights = [
  { name: "Light", value: "300" },
  { name: "Regular", value: "400" },
  { name: "Medium", value: "500" },
  { name: "Semibold", value: "600" },
  { name: "Bold", value: "700" },
  { name: "Extrabold", value: "800" },
  { name: "Black", value: "900" },
]

const gradientPresets = [
  { name: "Ocean", colors: ["#0891b2", "#06b6d4", "#0ea5e9"] },
  { name: "Sunset", colors: ["#f97316", "#ec4899", "#8b5cf6"] },
  { name: "Forest", colors: ["#059669", "#10b981", "#34d399"] },
  { name: "Fire", colors: ["#dc2626", "#f97316", "#fbbf24"] },
  { name: "Purple", colors: ["#7c3aed", "#a855f7", "#c084fc"] },
  { name: "Monochrome", colors: ["#374151", "#6b7280", "#9ca3af"] },
]

export function HeadlineWidget() {
  const router = useRouter()
  const [settings, setSettings] = useState<HeadlineSettings>({
    text: "Your Amazing Headline",
    fontSize: 48,
    fontFamily: "Playfair Display, serif",
    fontWeight: "700",
    lineHeight: 1.2,
    letterSpacing: 0,
    textAlign: "center",
    textColor: "#000000",

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

  const [previewMode, setPreviewMode] = useState(true)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem("headlineSettings", JSON.stringify(settings))
  }, [settings])

  const updateSetting = useCallback(<K extends keyof HeadlineSettings>(key: K, value: HeadlineSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const addGradientColor = useCallback(() => {
    if (settings.gradientColors.length < 5) {
      setSettings((prev) => ({
        ...prev,
        gradientColors: [...prev.gradientColors, "#8b5cf6"],
      }))
    }
  }, [settings.gradientColors.length])

  const removeGradientColor = useCallback(
    (index: number) => {
      if (settings.gradientColors.length > 2) {
        setSettings((prev) => ({
          ...prev,
          gradientColors: prev.gradientColors.filter((_, i) => i !== index),
        }))
      }
    },
    [settings.gradientColors.length],
  )

  const updateGradientColor = useCallback((index: number, color: string) => {
    setSettings((prev) => ({
      ...prev,
      gradientColors: prev.gradientColors.map((c, i) => (i === index ? color : c)),
    }))
  }, [])

  const applyGradientPreset = useCallback((colors: string[]) => {
    setSettings((prev) => ({ ...prev, gradientColors: colors }))
  }, [])

  const exportSettings = useCallback(() => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "headline-settings.json"
    a.click()
    URL.revokeObjectURL(url)
  }, [settings])

  const copyCSS = useCallback(() => {
    const gradientString = settings.useGradient
      ? `background: linear-gradient(${settings.gradientDirection.replace("to-", "")}, ${settings.gradientColors.join(", ")});`
      : ""

    const css = `
.headline {
  font-family: ${settings.fontFamily};
  font-size: ${settings.fontSize}px;
  font-weight: ${settings.fontWeight};
  line-height: ${settings.lineHeight};
  letter-spacing: ${settings.letterSpacing}px;
  text-align: ${settings.textAlign};
  ${gradientString}
  ${settings.useGradient ? "-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;" : ""}
  ${settings.textShadow ? `text-shadow: 2px 2px 4px ${settings.shadowColor};` : ""}
  ${settings.textGlow ? "filter: drop-shadow(0 0 10px currentColor);" : ""}
  ${settings.textOutline ? `-webkit-text-stroke: 1px ${settings.outlineColor};` : ""}
  ${settings.useBackground ? `background-color: ${settings.backgroundColor}; padding: ${settings.padding}px; border-radius: ${settings.borderRadius}px;` : ""}
}`.trim()

    navigator.clipboard.writeText(css)
  }, [settings])

  const resetSettings = useCallback(() => {
    setSettings({
      text: "Your Amazing Headline",
      fontSize: 48,
      fontFamily: "Playfair Display, serif",
      fontWeight: "700",
      lineHeight: 1.2,
      letterSpacing: 0,
      textAlign: "center",
      textColor: "#000000",

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
  }, [])

  const getHeadlineStyle = useCallback(() => {
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
      color: settings.useGradient ? "transparent" : settings.textColor,
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
  }, [settings])

  const getAnimationProps = useCallback(() => {
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
  }, [settings.animationType])

  const renderHeadline = () => {
    if (settings.animationType === "per-letter") {
      return (
        <motion.h1
          style={getHeadlineStyle()}
          className={cn(
            settings.gradientAnimate && settings.useGradient && "gradient-animate",
            settings.textGlow && "text-glow-subtle",
            settings.hoverEffect && "transition-all duration-300 hover:scale-105",
          )}
        >
          {settings.text.split("").map((char, index) => (
            <motion.span
              key={index}
              className="letter-animate"
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
        className={cn(
          settings.gradientAnimate && settings.useGradient && "gradient-animate",
          settings.textGlow && "text-glow-subtle",
          settings.hoverEffect && "transition-all duration-300 hover:scale-105",
        )}
      >
        {settings.text}
      </motion.h1>
    )
  }

  const gradientDirectionIcons = {
    "to-r": ArrowRight,
    "to-l": ArrowLeft,
    "to-b": ArrowDown,
    "to-t": ArrowUp,
    "to-br": ArrowRight,
    "to-bl": ArrowLeft,
  }

  const openPreview = useCallback(() => {
    router.push("/preview")
  }, [router])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Preview Panel */}
      <Card className="lg:sticky lg:top-4 h-fit">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Preview
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={openPreview}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Full Preview
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
              {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div
            ref={headlineRef}
            className="min-h-[200px] flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg bg-card/50"
          >
            <AnimatePresence mode="wait">
              {previewMode && (
                <motion.div
                  key={JSON.stringify(settings)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderHeadline()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={resetSettings} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full" size="lg">
              <Settings className="h-5 w-5 mr-2" />
              Open Controls
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                Headline Controls
              </SheetTitle>
              <SheetDescription>
                Customize your headline with typography, colors, gradients, and effects.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto h-full pb-20">
              {/* Controls Content */}
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="headline-text">Headline Text</Label>
                    <Input
                      id="headline-text"
                      value={settings.text}
                      onChange={(e) => updateSetting("text", e.target.value)}
                      placeholder="Enter your headline..."
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <Select value={settings.fontFamily} onValueChange={(value) => updateSetting("fontFamily", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilies.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Font Weight</Label>
                      <Select value={settings.fontWeight} onValueChange={(value) => updateSetting("fontWeight", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontWeights.map((weight) => (
                            <SelectItem key={weight.value} value={weight.value}>
                              {weight.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size: {settings.fontSize}px</Label>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={([value]) => updateSetting("fontSize", value)}
                      min={12}
                      max={120}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Line Height: {settings.lineHeight}</Label>
                    <Slider
                      value={[settings.lineHeight]}
                      onValueChange={([value]) => updateSetting("lineHeight", value)}
                      min={0.8}
                      max={2}
                      step={0.1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Letter Spacing: {settings.letterSpacing}px</Label>
                    <Slider
                      value={[settings.letterSpacing]}
                      onValueChange={([value]) => updateSetting("letterSpacing", value)}
                      min={-5}
                      max={10}
                      step={0.5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Text Alignment</Label>
                    <Select
                      value={settings.textAlign}
                      onValueChange={(value: "left" | "center" | "right") => updateSetting("textAlign", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="text-color" className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Text Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="text-color"
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => updateSetting("textColor", e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.textColor}
                        onChange={(e) => updateSetting("textColor", e.target.value)}
                        className="flex-1"
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label htmlFor="use-background">Background</Label>
                    <Switch
                      id="use-background"
                      checked={settings.useBackground}
                      onCheckedChange={(checked) => updateSetting("useBackground", checked)}
                    />
                  </div>

                  {settings.useBackground && (
                    <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                      <div className="space-y-2">
                        <Label htmlFor="bg-color">Background Color</Label>
                        <div className="flex gap-2">
                          <Input
                            id="bg-color"
                            type="color"
                            value={settings.backgroundColor}
                            onChange={(e) => updateSetting("backgroundColor", e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={settings.backgroundColor}
                            onChange={(e) => updateSetting("backgroundColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Padding: {settings.padding}px</Label>
                        <Slider
                          value={[settings.padding]}
                          onValueChange={([value]) => updateSetting("padding", value)}
                          min={0}
                          max={60}
                          step={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Border Radius: {settings.borderRadius}px</Label>
                        <Slider
                          value={[settings.borderRadius]}
                          onValueChange={([value]) => updateSetting("borderRadius", value)}
                          min={0}
                          max={30}
                          step={2}
                        />
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <Label>Animation Type</Label>
                    <Select
                      value={settings.animationType}
                      onValueChange={(value: HeadlineSettings["animationType"]) =>
                        updateSetting("animationType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="fade-in">Fade In</SelectItem>
                        <SelectItem value="slide-up">Slide Up</SelectItem>
                        <SelectItem value="bounce">Bounce</SelectItem>
                        <SelectItem value="per-letter">Per Letter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="hover-effect">Hover Effect</Label>
                    <Switch
                      id="hover-effect"
                      checked={settings.hoverEffect}
                      onCheckedChange={(checked) => updateSetting("hoverEffect", checked)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="gradient" className="space-y-6 mt-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="use-gradient">Enable Gradient</Label>
                    <Switch
                      id="use-gradient"
                      checked={settings.useGradient}
                      onCheckedChange={(checked) => updateSetting("useGradient", checked)}
                    />
                  </div>

                  {settings.useGradient && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Gradient Presets</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {gradientPresets.map((preset) => (
                            <Button
                              key={preset.name}
                              variant="outline"
                              size="sm"
                              onClick={() => applyGradientPreset(preset.colors)}
                              className="h-10 p-1 flex items-center gap-2"
                            >
                              <div
                                className="w-6 h-6 rounded"
                                style={{
                                  background: `linear-gradient(to right, ${preset.colors.join(", ")})`,
                                }}
                              />
                              <span className="text-xs">{preset.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Direction</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {Object.entries(gradientDirectionIcons).map(([direction, Icon]) => (
                            <Button
                              key={direction}
                              variant={settings.gradientDirection === direction ? "default" : "outline"}
                              size="sm"
                              onClick={() =>
                                updateSetting("gradientDirection", direction as HeadlineSettings["gradientDirection"])
                              }
                            >
                              <Icon className="h-4 w-4" />
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Colors</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addGradientColor}
                            disabled={settings.gradientColors.length >= 5}
                          >
                            Add Color
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {settings.gradientColors.map((color, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Input
                                type="color"
                                value={color}
                                onChange={(e) => updateGradientColor(index, e.target.value)}
                                className="w-12 h-8 p-1"
                              />
                              <Input
                                value={color}
                                onChange={(e) => updateGradientColor(index, e.target.value)}
                                className="flex-1"
                              />
                              {settings.gradientColors.length > 2 && (
                                <Button variant="outline" size="sm" onClick={() => removeGradientColor(index)}>
                                  ×
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="gradient-animate">Animate Gradient</Label>
                        <Switch
                          id="gradient-animate"
                          checked={settings.gradientAnimate}
                          onCheckedChange={(checked) => updateSetting("gradientAnimate", checked)}
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="effects" className="space-y-6 mt-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="text-shadow">Text Shadow</Label>
                    <Switch
                      id="text-shadow"
                      checked={settings.textShadow}
                      onCheckedChange={(checked) => updateSetting("textShadow", checked)}
                    />
                  </div>

                  {settings.textShadow && (
                    <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                      <Label htmlFor="shadow-color">Shadow Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="shadow-color"
                          type="color"
                          value={settings.shadowColor}
                          onChange={(e) => updateSetting("shadowColor", e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={settings.shadowColor}
                          onChange={(e) => updateSetting("shadowColor", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Label htmlFor="text-glow">Text Glow</Label>
                    <Switch
                      id="text-glow"
                      checked={settings.textGlow}
                      onCheckedChange={(checked) => updateSetting("textGlow", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="text-outline">Text Outline</Label>
                    <Switch
                      id="text-outline"
                      checked={settings.textOutline}
                      onCheckedChange={(checked) => updateSetting("textOutline", checked)}
                    />
                  </div>

                  {settings.textOutline && (
                    <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                      <Label htmlFor="outline-color">Outline Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="outline-color"
                          type="color"
                          value={settings.outlineColor}
                          onChange={(e) => updateSetting("outlineColor", e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={settings.outlineColor}
                          onChange={(e) => updateSetting("outlineColor", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="hidden lg:block">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5 text-primary" />
            Headline Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="text" className="text-xs">
                Text
              </TabsTrigger>
              <TabsTrigger value="style" className="text-xs">
                Style
              </TabsTrigger>
              <TabsTrigger value="gradient" className="text-xs">
                Gradient
              </TabsTrigger>
              <TabsTrigger value="effects" className="text-xs">
                Effects
              </TabsTrigger>
            </TabsList>

            {/* Same tab content as mobile but with desktop-optimized spacing */}
            <TabsContent value="text" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="headline-text">Headline Text</Label>
                <Input
                  id="headline-text"
                  value={settings.text}
                  onChange={(e) => updateSetting("text", e.target.value)}
                  placeholder="Enter your headline..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select value={settings.fontFamily} onValueChange={(value) => updateSetting("fontFamily", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Weight</Label>
                  <Select value={settings.fontWeight} onValueChange={(value) => updateSetting("fontWeight", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontWeights.map((weight) => (
                        <SelectItem key={weight.value} value={weight.value}>
                          {weight.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Font Size: {settings.fontSize}px</Label>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => updateSetting("fontSize", value)}
                  min={12}
                  max={120}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <Label>Line Height: {settings.lineHeight}</Label>
                <Slider
                  value={[settings.lineHeight]}
                  onValueChange={([value]) => updateSetting("lineHeight", value)}
                  min={0.8}
                  max={2}
                  step={0.1}
                />
              </div>

              <div className="space-y-2">
                <Label>Letter Spacing: {settings.letterSpacing}px</Label>
                <Slider
                  value={[settings.letterSpacing]}
                  onValueChange={([value]) => updateSetting("letterSpacing", value)}
                  min={-5}
                  max={10}
                  step={0.5}
                />
              </div>

              <div className="space-y-2">
                <Label>Text Alignment</Label>
                <Select
                  value={settings.textAlign}
                  onValueChange={(value: "left" | "center" | "right") => updateSetting("textAlign", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="style" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text-color-desktop" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Text Color
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="text-color-desktop"
                    type="color"
                    value={settings.textColor}
                    onChange={(e) => updateSetting("textColor", e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={settings.textColor}
                    onChange={(e) => updateSetting("textColor", e.target.value)}
                    className="flex-1"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <Separator />

              {/* Rest of style controls remain the same */}
              <div className="flex items-center justify-between">
                <Label htmlFor="use-background">Background</Label>
                <Switch
                  id="use-background"
                  checked={settings.useBackground}
                  onCheckedChange={(checked) => updateSetting("useBackground", checked)}
                />
              </div>

              {settings.useBackground && (
                <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                  <div className="space-y-2">
                    <Label htmlFor="bg-color">Background Color</Label>
                    <Input
                      id="bg-color"
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => updateSetting("backgroundColor", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Padding: {settings.padding}px</Label>
                    <Slider
                      value={[settings.padding]}
                      onValueChange={([value]) => updateSetting("padding", value)}
                      min={0}
                      max={60}
                      step={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Border Radius: {settings.borderRadius}px</Label>
                    <Slider
                      value={[settings.borderRadius]}
                      onValueChange={([value]) => updateSetting("borderRadius", value)}
                      min={0}
                      max={30}
                      step={2}
                    />
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label>Animation Type</Label>
                <Select
                  value={settings.animationType}
                  onValueChange={(value: HeadlineSettings["animationType"]) => updateSetting("animationType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fade-in">Fade In</SelectItem>
                    <SelectItem value="slide-up">Slide Up</SelectItem>
                    <SelectItem value="bounce">Bounce</SelectItem>
                    <SelectItem value="per-letter">Per Letter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="hover-effect">Hover Effect</Label>
                <Switch
                  id="hover-effect"
                  checked={settings.hoverEffect}
                  onCheckedChange={(checked) => updateSetting("hoverEffect", checked)}
                />
              </div>
            </TabsContent>

            {/* Gradient and Effects tabs remain the same as mobile version */}
            <TabsContent value="gradient" className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-gradient">Enable Gradient</Label>
                <Switch
                  id="use-gradient"
                  checked={settings.useGradient}
                  onCheckedChange={(checked) => updateSetting("useGradient", checked)}
                />
              </div>

              {settings.useGradient && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Gradient Presets</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {gradientPresets.map((preset) => (
                        <Button
                          key={preset.name}
                          variant="outline"
                          size="sm"
                          onClick={() => applyGradientPreset(preset.colors)}
                          className="h-8 p-1"
                        >
                          <div
                            className="w-full h-full rounded"
                            style={{
                              background: `linear-gradient(to right, ${preset.colors.join(", ")})`,
                            }}
                          />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Direction</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(gradientDirectionIcons).map(([direction, Icon]) => (
                        <Button
                          key={direction}
                          variant={settings.gradientDirection === direction ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            updateSetting("gradientDirection", direction as HeadlineSettings["gradientDirection"])
                          }
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Colors</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addGradientColor}
                        disabled={settings.gradientColors.length >= 5}
                      >
                        Add Color
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {settings.gradientColors.map((color, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={color}
                            onChange={(e) => updateGradientColor(index, e.target.value)}
                            className="w-12 h-8 p-1"
                          />
                          <Input
                            value={color}
                            onChange={(e) => updateGradientColor(index, e.target.value)}
                            className="flex-1"
                          />
                          {settings.gradientColors.length > 2 && (
                            <Button variant="outline" size="sm" onClick={() => removeGradientColor(index)}>
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="gradient-animate">Animate Gradient</Label>
                    <Switch
                      id="gradient-animate"
                      checked={settings.gradientAnimate}
                      onCheckedChange={(checked) => updateSetting("gradientAnimate", checked)}
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="effects" className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="text-shadow">Text Shadow</Label>
                <Switch
                  id="text-shadow"
                  checked={settings.textShadow}
                  onCheckedChange={(checked) => updateSetting("textShadow", checked)}
                />
              </div>

              {settings.textShadow && (
                <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                  <Label htmlFor="shadow-color">Shadow Color</Label>
                  <Input
                    id="shadow-color"
                    type="color"
                    value={settings.shadowColor}
                    onChange={(e) => updateSetting("shadowColor", e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="text-glow">Text Glow</Label>
                <Switch
                  id="text-glow"
                  checked={settings.textGlow}
                  onCheckedChange={(checked) => updateSetting("textGlow", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="text-outline">Text Outline</Label>
                <Switch
                  id="text-outline"
                  checked={settings.textOutline}
                  onCheckedChange={(checked) => updateSetting("textOutline", checked)}
                />
              </div>

              {settings.textOutline && (
                <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                  <Label htmlFor="outline-color">Outline Color</Label>
                  <Input
                    id="outline-color"
                    type="color"
                    value={settings.outlineColor}
                    onChange={(e) => updateSetting("outlineColor", e.target.value)}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
