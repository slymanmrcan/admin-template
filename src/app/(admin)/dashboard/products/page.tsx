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
import { Plus, Search, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const products = [
  {
    id: "PRD-1001",
    name: "Smart Dashboard",
    category: "SaaS",
    price: "₺1.250",
    stock: 42,
    status: "Aktif",
  },
  {
    id: "PRD-1002",
    name: "Analytics Pro",
    category: "Analitik",
    price: "₺2.400",
    stock: 8,
    status: "Düşük Stok",
  },
  {
    id: "PRD-1003",
    name: "CRM Plus",
    category: "Operasyon",
    price: "₺1.800",
    stock: 0,
    status: "Tükendi",
  },
  {
    id: "PRD-1004",
    name: "Billing Hub",
    category: "Finans",
    price: "₺950",
    stock: 16,
    status: "Aktif",
  },
]

export default function ProductsPage() {
  const [search, setSearch] = useState("")

  const filteredProducts = useMemo(() => {
    if (!search.trim()) {
      return products
    }

    return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ürünler</h1>
          <p className="text-muted-foreground">Katalog, stok ve satış performansı.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni ürün
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ürün Listesi</CardTitle>
          <CardDescription>Fiyat, stok ve durum bilgileriyle tüm ürünler.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ürün ara..."
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
                  <TableHead>Ürün</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Fiyat</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Ürün bulunamadı.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "Aktif"
                              ? "default"
                              : product.status === "Düşük Stok"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {product.status}
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
                            <DropdownMenuItem>Detayları görüntüle</DropdownMenuItem>
                            <DropdownMenuItem>Düzenle</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Ürünü kaldır
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
