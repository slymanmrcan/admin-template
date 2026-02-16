import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const spacingScale = [
  { label: "4 (1rem)", className: "h-4 w-4" },
  { label: "6 (1.5rem)", className: "h-6 w-6" },
  { label: "8 (2rem)", className: "h-8 w-8" },
  { label: "10 (2.5rem)", className: "h-10 w-10" },
  { label: "12 (3rem)", className: "h-12 w-12" },
  { label: "16 (4rem)", className: "h-16 w-16" },
]

const radiusScale = [
  { label: "sm", className: "rounded-sm" },
  { label: "md", className: "rounded-md" },
  { label: "lg", className: "rounded-lg" },
  { label: "xl", className: "rounded-xl" },
  { label: "2xl", className: "rounded-2xl" },
  { label: "3xl", className: "rounded-3xl" },
]

const shadowScale = [
  { label: "xs", className: "shadow-xs" },
  { label: "sm", className: "shadow-sm" },
  { label: "md", className: "shadow-md" },
  { label: "lg", className: "shadow-lg" },
  { label: "xl", className: "shadow-xl" },
]

const gridExamples = [
  { label: "2 kolon", className: "grid grid-cols-2 gap-4" },
  { label: "3 kolon", className: "grid grid-cols-3 gap-4" },
  { label: "4 kolon", className: "grid grid-cols-4 gap-4" },
]

const breakpointExamples = [
  { label: "Mobil → Tablet → Desktop", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" },
  { label: "Sidebar + Content", className: "grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4" },
]

const spacingPatterns = [
  { label: "Card içerik", className: "space-y-2" },
  { label: "Form blokları", className: "space-y-4" },
  { label: "Bölüm arası", className: "space-y-6" },
]

export default function LayoutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Layout & Spacing</h1>
        <p className="text-muted-foreground">
          Grid, radius, shadow ve boşluk ölçekleri için pratik örnekler.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Spacing Ölçeği</CardTitle>
            <CardDescription>Ortak boşluk ve boyut değerleri.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {spacingScale.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-muted-foreground/50" />
                <div className="flex items-center gap-3">
                  <div className={`rounded bg-primary/20 ${item.className}`} />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Radius Ölçeği</CardTitle>
            <CardDescription>Kart ve bileşen köşe yuvarlaklıkları.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {radiusScale.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className={`h-16 w-full border bg-muted/40 ${item.className}`} />
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shadow Ölçeği</CardTitle>
            <CardDescription>Yüzey derinliği ve hiyerarşi.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {shadowScale.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className={`h-16 w-full rounded-md bg-card ${item.className}`} />
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Grid Örnekleri</CardTitle>
            <CardDescription>Layout için standart grid kombinasyonları.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {gridExamples.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <div className={item.className}>
                  {[...Array(item.label.includes("4") ? 4 : item.label.includes("3") ? 3 : 2)].map((_, index) => (
                    <div key={index} className="h-10 rounded-md bg-muted/40" />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Breakpoint Örnekleri</CardTitle>
            <CardDescription>Responsive davranışları göstermek için şablonlar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {breakpointExamples.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <div className={item.className}>
                  {[...Array(item.label.includes("Sidebar") ? 2 : 3)].map((_, index) => (
                    <div key={index} className="h-10 rounded-md bg-primary/10" />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Component Spacing Kalıpları</CardTitle>
          <CardDescription>İçerik blokları için önerilen boşluk düzeni.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          {spacingPatterns.map((item) => (
            <div key={item.label} className="rounded-lg border p-4">
              <div className="text-sm font-medium">{item.label}</div>
              <div className={`mt-4 ${item.className}`}>
                <div className="h-3 rounded bg-muted-foreground/40" />
                <div className="h-3 rounded bg-muted-foreground/30" />
                <div className="h-3 rounded bg-muted-foreground/20" />
              </div>
              <div className="mt-3 text-xs text-muted-foreground">{item.className}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
