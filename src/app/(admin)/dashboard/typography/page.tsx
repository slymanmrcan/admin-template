import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const typeScale = [
  { label: "Display / 4xl", className: "text-4xl font-semibold", text: "Başlık Örneği" },
  { label: "H1 / 3xl", className: "text-3xl font-semibold", text: "Sayfa Başlığı" },
  { label: "H2 / 2xl", className: "text-2xl font-semibold", text: "Bölüm Başlığı" },
  { label: "H3 / xl", className: "text-xl font-semibold", text: "Alt Başlık" },
  { label: "Body / base", className: "text-base", text: "Bu bir normal paragraf örneğidir." },
  { label: "Small / sm", className: "text-sm", text: "İkincil açıklama metni." },
  { label: "Muted / sm", className: "text-sm text-muted-foreground", text: "İkincil ve düşük öncelikli metin." },
]

const colorTokens = [
  { label: "Background", className: "bg-background text-foreground border-border" },
  { label: "Card", className: "bg-card text-card-foreground border-border" },
  { label: "Primary", className: "bg-primary text-primary-foreground border-primary/20" },
  { label: "Secondary", className: "bg-secondary text-secondary-foreground border-secondary/20" },
  { label: "Muted", className: "bg-muted text-muted-foreground border-muted/20" },
  { label: "Accent", className: "bg-accent text-accent-foreground border-accent/20" },
  { label: "Destructive", className: "bg-destructive text-white border-destructive/20" },
]

export default function TypographyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tipografi & Renkler</h1>
        <p className="text-muted-foreground">
          Tailwind tokenları ve tema değişkenleri ile tipografi hiyerarşisi örnekleri.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Yazı Ölçekleri</CardTitle>
            <CardDescription>Başlık ve metin boyutları için örnekler.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {typeScale.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="text-xs text-muted-foreground">{item.label}</div>
                <div className={item.className}>{item.text}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metin Kombinasyonları</CardTitle>
            <CardDescription>Başlık + açıklama + link kombinasyonu.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="text-lg font-semibold">Özellik Başlığı</div>
              <p className="text-sm text-muted-foreground">
                Açıklama metni kısa ve okunabilir tutulmalı. Gerektiğinde detay için ikinci satır
                kullanılabilir.
              </p>
              <a className="text-sm text-primary hover:underline" href="#">
                Daha fazla bilgi
              </a>
            </div>
            <div className="space-y-2">
              <div className="text-base font-medium">Kısa Başlık</div>
              <p className="text-sm">
                Normal metin ile birincil aksiyon arasındaki kontrast önemlidir.
              </p>
              <div className="text-sm text-muted-foreground">İkincil açıklama</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Renk Tokenları</CardTitle>
          <CardDescription>Theme değişkenlerinden gelen temel renk seti.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {colorTokens.map((token) => (
              <div key={token.label} className="rounded-lg border p-4">
                <div className={`h-12 w-full rounded-md border ${token.className}`} />
                <div className="mt-3 text-sm font-medium">{token.label}</div>
                <div className="text-xs text-muted-foreground">{token.className}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
