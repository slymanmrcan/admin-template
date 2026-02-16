# Yeni Özellik/Rota Ekleme Rehberi (Örnek: Courses)

Bu rehber, projeye **"Courses" (Kurslar)** adında yeni bir özellik eklerken izlemeniz gereken adımları **sırasıyla ve detaylı kod örnekleriyle** anlatır.

Proje mimarisine uygun (TypeScript, React Query, Service Layer) geliştirme yapmak için bu adımları takip edin.

---

## 🏗️ Adım 1: Tip Tanımları (Type Definitions)

Öncelikle veri modelini ve API yanıt tiplerini tanımlayarak başlayın.

**Dosya:** `src/types/index.ts` (veya yeni dosya `src/types/course.ts`)

```typescript
// Course modelini tanımla
export interface Course {
  id: string
  title: string
  description: string
  price: number
  status: "draft" | "published"
  createdAt: string
}

// Yeni ekleme (kurşun oluşturma) veri tipi
export type CreateCourseDTO = Omit<Course, "id" | "createdAt">

// API Yanıt tipi (Pagination kullanacaksanız mevcut PaginatedResponse'u kullanın)
// import { PaginatedResponse } from "./index";
// type CoursesResponse = PaginatedResponse<Course>;
```

---

## 🔗 Adım 2: Servis Katmanı (Service Layer)

API isteklerini yapacak servisi yazın. Fetch tabanlı `api` client'ını kullanarak backend ile konuşun.

**Dosya:** `src/services/course-service.ts`

```typescript
import { api } from "@/services"
import { Course, CreateCourseDTO, PaginatedResponse } from "@/types"

// Mock Data (Backend henüz hazır değilse)
const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "React 101",
    description: "Intro to React",
    price: 100,
    status: "published",
    createdAt: new Date().toISOString(),
  },
  // ... diğer mock veriler
]

export const courseService = {
  // 1. Listeleme (Pagination & Search)
  getCourses: async (params: { page?: number; search?: string }) => {
    // Mock Modu Kontrolü
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Gecikme simülasyonu
      return {
        success: true,
        data: MOCK_COURSES,
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      } as PaginatedResponse<Course>
    }

    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append("page", params.page.toString())
    if (params.search) queryParams.append("search", params.search)

    // Gerçek API İsteği
    return api.get<PaginatedResponse<Course>>(`/courses?${queryParams.toString()}`)
  },

  // 2. Detay Getirme
  getCourse: async (id: string) => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      return MOCK_COURSES.find((c) => c.id === id) || null
    }
    return api.get<Course>(`/courses/${id}`)
  },

  // 3. Oluşturma
  createCourse: async (data: CreateCourseDTO) => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      return { success: true, message: "Course created" }
    }
    return api.post<Course>("/courses", data)
  },

  // 4. Güncelleme
  updateCourse: async (id: string, data: Partial<CreateCourseDTO>) => {
    return api.put<Course>(`/courses/${id}`, data)
  },

  // 5. Silme
  deleteCourse: async (id: string) => {
    return api.delete(`/courses/${id}`)
  },
}
```

**Not:** Bu servisi `src/services/index.ts` dosyasından export etmeyi unutmayın!

---

## 🪝 Adım 3: React Query Hooks

Component içinde servisi doğrudan çağırmak yerine, önbellekleme (caching) ve durum yönetimi için hook yazın.

**Dosya:** `src/hooks/use-courses.ts`

```typescript
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query"
import { courseService } from "@/services"
import { toast } from "sonner" // Bildirim için
import { CreateCourseDTO } from "@/types"

// --- Queries (Veri Çekme) ---

export function useCourses({ page = 1, search = "" }) {
  return useQuery({
    queryKey: ["courses", page, search], // Parametreler değiştikçe yeniden çalışır
    queryFn: () => courseService.getCourses({ page, search }),
    placeholderData: keepPreviousData, // Sayfa geçişinde titremeyi önler
  })
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getCourse(id),
    enabled: !!id, // ID yoksa çalışma
  })
}

// --- Mutations (Veri Değiştirme) ---

export function useCreateCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCourseDTO) => courseService.createCourse(data),
    onSuccess: () => {
      toast.success("Kurs başarıyla oluşturuldu!")
      // Listeyi yenile (yeni eklenen görünsün)
      queryClient.invalidateQueries({ queryKey: ["courses"] })
    },
    onError: (error) => {
      toast.error("Hata oluştu: " + error.message)
    },
  })
}
```

---

## 🎨 Adım 4: Sayfa ve Arayüz (UI)

Artık sayfayı oluşturabiliriz. `src/app/(admin)/dashboard/courses/page.tsx` dosyasını oluşturun.

**Dosya:** `src/app/(admin)/dashboard/courses/page.tsx`

```tsx
"use client"

import { useState } from "react"
import { useCourses } from "@/hooks/use-courses"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"
import Link from "next/link" // Yeni ekleme sayfasına gitmek için

export default function CoursesPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  // Hook'u kullan
  const { data, isLoading, isError } = useCourses({ page, search })

  return (
    <div className="space-y-4">
      {/* Başlık ve Buton */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
        <Button asChild>
          <Link href="/dashboard/courses/new">
            <Plus className="mr-2 h-4 w-4" /> Create Course
          </Link>
        </Button>
      </div>

      {/* Arama Kutusu */}
      <div className="max-w-sm">
        <Input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tablo */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-red-500">
                  Error loading data
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell>{course.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination component'i buraya eklenebilir */}
    </div>
  )
}
```

---

## 🧭 Adım 5: Navigasyon (Sidebar)

Son olarak, sol menüye link ekleyin.

**Dosya:** `src/components/sidebar/app-sidebar.tsx` (veya `nav-main.tsx`)

```tsx
// Mevcut items dizisine ekle:
{
  title: "Courses",
  url: "/dashboard/courses",
  icon: BookOpen, // Lucide icon
  isActive: pathname.startsWith("/dashboard/courses"),
},
```

---

## ✅ Kontrol Listesi

- [ ] `src/types` güncellendi mi?
- [ ] `src/services` altında servis yazıldı mı?
- [ ] `src/services/index.ts` export edildi mi?
- [ ] `src/hooks` altında query hook'ları yazıldı mı?
- [ ] Sayfa (`page.tsx`) oluşturuldu mu?
- [ ] Sidebar linki eklendi mi?
- [ ] `npm run build` hatasız çalışıyor mu?
