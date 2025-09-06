import { HeadlineWidget } from "@/components/headline-widget"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Headline Widget Demo</h1>
          <p className="text-muted-foreground text-lg">
            Create stunning, customizable headlines with advanced typography and effects
          </p>
        </div>
        <HeadlineWidget />
      </div>
    </main>
  )
}
