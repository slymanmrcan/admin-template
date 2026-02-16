"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const sampleRows = [
  { id: "USR-1024", name: "Ahmet Yılmaz", status: "Aktif" },
  { id: "USR-2041", name: "Elif Kaya", status: "Beklemede" },
  { id: "USR-3107", name: "Mehmet Demir", status: "Pasif" },
]

export default function ComponentsPage() {
  const [showArchived, setShowArchived] = useState(false)
  const [showFavorites, setShowFavorites] = useState(true)
  const [sortBy, setSortBy] = useState("latest")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bileşenler</h1>
        <p className="text-muted-foreground">Temel UI bileşenleri ve durum örnekleri.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Butonlar</CardTitle>
            <CardDescription>Varyasyon ve durum örnekleri.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Form giriş alanı örnekleri.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="E-posta adresi" type="email" />
            <Input placeholder="Arama..." />
            <Input placeholder="Hatalı giriş" aria-invalid />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Badge</CardTitle>
            <CardDescription>Durum ve etiket örnekleri.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Badge>Varsayılan</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge className="bg-emerald-500 text-white">Aktif</Badge>
            <Badge className="bg-amber-500 text-white">Beklemede</Badge>
            <Badge className="bg-rose-500 text-white">Pasif</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Switch & Select</CardTitle>
            <CardDescription>Kontrol ve seçim örnekleri.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">Bildirimler</div>
                <div className="text-xs text-muted-foreground">Açık / kapalı durumu</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Select defaultValue="weekly">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Rapor sıklığı" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Günlük</SelectItem>
                <SelectItem value="weekly">Haftalık</SelectItem>
                <SelectItem value="monthly">Aylık</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>Kullanıcı temsilleri.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://avatar.vercel.sh/ahmet" alt="Ahmet" />
              <AvatarFallback>AY</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://avatar.vercel.sh/elif" alt="Elif" />
              <AvatarFallback>EK</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toast</CardTitle>
            <CardDescription>Sonner bildirim örnekleri.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={() => toast("Bilgi mesajı gönderildi")}>Bilgi</Button>
            <Button variant="secondary" onClick={() => toast.success("Başarılı işlem tamamlandı")}>
              Başarılı
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Dikkat edilmesi gerekiyor")}>
              Uyarı
            </Button>
            <Button variant="destructive" onClick={() => toast.error("Bir hata oluştu")}>
              Hata
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Table</CardTitle>
          <CardDescription>Listeleme örneği.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>İsim</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skeleton</CardTitle>
          <CardDescription>Yüklenme durumu için placeholder örnekleri.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Empty State</CardTitle>
            <CardDescription>Boş içerik durumları için örnek.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <span className="text-lg">📭</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Henüz içerik yok</div>
              <div className="text-xs text-muted-foreground">
                Yeni bir kayıt ekleyerek başlayabilirsin.
              </div>
            </div>
            <Button size="sm">Yeni kayıt ekle</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error State</CardTitle>
            <CardDescription>Hata durumları için örnek.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <span className="text-lg">⚠️</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Bir şeyler ters gitti</div>
              <div className="text-xs text-muted-foreground">
                Lütfen bağlantını kontrol edip tekrar dene.
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Tekrar dene</Button>
              <Button size="sm" variant="outline">Destek</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
            <CardDescription>Dialog örneği ve aksiyonlar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Modal Aç</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni bildirim</DialogTitle>
                  <DialogDescription>
                    Bu bir örnek modal. İçerik düzeni ve aksiyonları göstermek için.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <Input placeholder="Başlık" />
                  <Input placeholder="Kısa açıklama" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Vazgeç</Button>
                  </DialogClose>
                  <Button onClick={() => toast.success("Modal kaydedildi")}>Kaydet</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dropdown</CardTitle>
            <CardDescription>Menü ve aksiyon örnekleri.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Hızlı İşlemler</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Detayları görüntüle</DropdownMenuItem>
                <DropdownMenuItem>Kopyala</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Sil</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Filtre</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Görünürlük</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={showArchived}
                  onCheckedChange={(checked) => setShowArchived(checked === true)}
                >
                  Arşivleneni göster
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showFavorites}
                  onCheckedChange={(checked) => setShowFavorites(checked === true)}
                >
                  Favorileri göster
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sıralama</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="latest">En yeni</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="popular">En popüler</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="rating">En yüksek puan</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modal Boyutları</CardTitle>
          <CardDescription>Küçük ve büyük dialog örnekleri.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Küçük Modal</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Küçük dialog</DialogTitle>
                <DialogDescription>Hızlı onay ve kısa içerik için.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Başlık" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Kapat</Button>
                </DialogClose>
                <Button>Onayla</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Geniş Modal</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Geniş dialog</DialogTitle>
                <DialogDescription>Uzun form ve detaylı içerik için.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="Başlık" />
                <Input placeholder="Kategori" />
                <Input placeholder="Sahip" />
                <Input placeholder="Öncelik" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Vazgeç</Button>
                </DialogClose>
                <Button onClick={() => toast.success("Geniş modal kaydedildi")}>
                  Kaydet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tooltip</CardTitle>
          <CardDescription>Kısa açıklamalar ve mikro kopya örnekleri.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Bilgi</Button>
              </TooltipTrigger>
              <TooltipContent side="top">Kısa açıklama metni</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Detay</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Detaylı açıklama</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">İpucu</Button>
              </TooltipTrigger>
              <TooltipContent side="right">Bu bir ipucu</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Uzun Metin</Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Bu tooltip daha uzun bir açıklama metni içerir.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hizalı</Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="start">
                Sol hizalı içerik
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  )
}
