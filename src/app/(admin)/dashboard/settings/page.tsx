import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground">Hesap ve tercihleri yönet</p>
      </div>

      <div className="grid gap-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>Kişisel bilgilerini güncelle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad</Label>
                <Input id="name" placeholder="Ahmet Yılmaz" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>
            <Button>Değişiklikleri kaydet</Button>
          </CardContent>
        </Card>

        <Separator />

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Bildirimler</CardTitle>
            <CardDescription>Bildirimleri nasıl alacağını ayarla</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["E-posta bildirimleri", "Anlık bildirimler", "Haftalık özet"].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item}</span>
                  <div className="h-6 w-11 rounded-full bg-muted border cursor-pointer" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Tehlikeli Bölge</CardTitle>
            <CardDescription>Hesabın için geri alınamaz işlemler</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Hesabı sil</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
