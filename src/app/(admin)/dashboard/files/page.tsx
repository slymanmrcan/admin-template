"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Upload, Search, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const files = [
  {
    id: "FIL-201",
    name: "Q4-Report.pdf",
    type: "PDF",
    size: "2.4 MB",
    owner: "Ayşe K.",
    updatedAt: "2 saat önce",
    status: "Paylaşıldı",
  },
  {
    id: "FIL-202",
    name: "Brand-Guidelines.fig",
    type: "Figma",
    size: "14.8 MB",
    owner: "Onur D.",
    updatedAt: "Dün",
    status: "Özel",
  },
  {
    id: "FIL-203",
    name: "Invoices-2025.xlsx",
    type: "Excel",
    size: "1.1 MB",
    owner: "Melis S.",
    updatedAt: "3 gün önce",
    status: "Paylaşıldı",
  },
  {
    id: "FIL-204",
    name: "Onboarding.zip",
    type: "Arşiv",
    size: "28.3 MB",
    owner: "Berk A.",
    updatedAt: "1 hafta önce",
    status: "Arşivlendi",
  },
]

export default function FilesPage() {
  const [search, setSearch] = useState("")

  const filteredFiles = useMemo(() => {
    if (!search.trim()) {
      return files
    }

    return files.filter((file) => file.name.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dosyalar</h1>
          <p className="text-muted-foreground">Paylaşılan dosyaları ve erişimi yönet.</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Dosya yükle
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dosya Merkezi</CardTitle>
          <CardDescription>Dosya türü, boyut ve paylaşım durumu.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Dosya ara..."
                className="pl-8"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dosya</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Boyut</TableHead>
                  <TableHead>Sahip</TableHead>
                  <TableHead>Güncelleme</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Dosya bulunamadı.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>{file.type}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.owner}</TableCell>
                      <TableCell>{file.updatedAt}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            file.status === "Paylaşıldı"
                              ? "default"
                              : file.status === "Özel"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {file.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Menüyü aç</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                            <DropdownMenuItem>İndir</DropdownMenuItem>
                            <DropdownMenuItem>Paylaş</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Dosyayı sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
