# React Query (TanStack Query) Kullanımı

Bu projede sunucu durumu yönetimi (server state management) için **TanStack Query v5** kullanılmaktadır.

## Neden Kullanıyoruz?

- **Otomatik Caching:** Verileri önbelleğe alarak gereksiz API isteklerini önler.
- **Background Refetch:** Kullanıcı sayfaya geri döndüğünde verileri arka planda günceller.
- **Loading/Error State:** `isLoading`, `isError` gibi durumları otomatik yönetir.
- **Pagination:** Sayfalama işlemlerini kolaylaştırır.

---

## 1. Hook Oluşturma (`src/hooks/`)

Veri çekme işlemleri için component içinde doğrudan `useQuery` çağırmak yerine, özel hook'lar oluşturuyoruz.

**Örnek: `src/hooks/use-users.ts`**

```ts
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { userService } from "@/services"

// Parametre tipi
type UseUsersParams = {
  page?: number
  search?: string
}

export function useUsers(params: UseUsersParams = {}) {
  const { page = 1, search = "" } = params

  return useQuery({
    // Cache Key: Parametreler değişince query yeniden çalışır
    queryKey: ["users", page, search],

    // Fetcher Function: Promise dönmelidir
    queryFn: () => userService.getUsers({ page, search }),

    // Pagination için: Yeni veri gelene kadar eskisini göster (loading flicker önler)
    placeholderData: keepPreviousData,
  })
}
```

---

## 2. Component İçinde Kullanım

Hook'u component içinde çağırmak yeterlidir. `useEffect` kullanmaya gerek yoktur.

```tsx
import { useUsers } from "@/hooks/use-users"

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  // Veri çekme (otomatik başlar)
  const { data, isLoading, isError } = useUsers({ page, search })

  if (isLoading) return <div>Yükleniyor...</div>

  if (isError) return <div>Hata oluştu!</div>

  return (
    <div>
      {data?.data.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}

      <button onClick={() => setPage(page + 1)}>Sonraki Sayfa</button>
    </div>
  )
}
```

---

## 3. Mutation (Veri Güncelleme)

Veri ekleme/güncelleme/silme işlemleri için `useMutation` kullanılır. İşlem bitince listeyi yenilemek için `invalidateQueries` yapılır.

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newUser: UserData) => userService.createUser(newUser),

    onSuccess: () => {
      // "users" anahtarına sahip tüm query'leri bayatla (tekrar çektir)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("Kullanıcı oluşturuldu!")
    },
  })
}
```

**Kullanımı:**

```tsx
const createUserMutation = useCreateUser()

const handleSubmit = (data) => {
  createUserMutation.mutate(data)
}
```

## İpuçları

- **Query Key:** Benzersiz olmalıdır. Parametreleri (page, id, search) key içine eklemeyi unutmayın.
- **Provider:** `src/providers/query-provider.tsx` içinde global ayarlar (staleTime vb.) bulunur.
