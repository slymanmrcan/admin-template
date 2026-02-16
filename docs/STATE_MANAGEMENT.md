# State Management & Auth Flow

Bu projede state yönetimi için **Zustand**, global bildirimler için **Sonner**, ve API istekleri için özel bir **Service Layer** kullanılmaktadır.

---

## 1. Zustand Store'ları

Projede iki ana store bulunmaktadır: `auth-store` ve `ui-store`.

### A. Auth Store (`src/store/auth-store.ts`)

Kullanıcı oturum bilgilerini ve token'ı yönetir.

```ts
import { useAuthStore } from "@/store"

// State okuma
const user = useAuthStore((state) => state.user)
const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

// Action kullanma
const logout = useAuthStore((state) => state.logout)
```

**State Yapısı:**

- `user`: `User | null`
- `token`: `string | null`
- `isAuthenticated`: `boolean`
- `isLoading`: `boolean` (Uygulama ilk açıldığında auth kontrolü için)

### B. UI Store (`src/store/ui-store.ts`)

Arayüz durumlarını yönetir.

```ts
import { useUIStore } from "@/store"

// Sidebar'ı aç/kapat
const toggleSidebar = useUIStore((state) => state.toggleSidebar)
```

---

## 2. Authentication Akışı

Sistem, **JWT (JSON Web Token)** tabanlı bir kimlik doğrulama kullanır.

1.  **Login**: `authService.login` çağrılır. Başarılı olursa dönen `token` ve `user` Zustand store'a kaydedilir.
2.  **Middleware Koruması**: `middleware.ts`, `/dashboard` altındaki sayfalara erişimde `token` cookie'sini kontrol eder.
3.  **API İstekleri**: `api.ts` içindeki interceptor, Zustand store'dan token'ı okur ve her isteğin header'ına `Authorization: Bearer <token>` ekler.
4.  **401 Handling**: Eğer API `401 Unauthorized` dönerse, interceptor otomatik olarak `logout()` action'ını çağırır ve kullanıcıyı login sayfasına atar.

---

## 3. Mock Mode (Backend Olmadan Geliştirme)

Backend henüz hazır değilse veya sadece frontend geliştirmesi yapılıyorsa, "Mock Auth" modu kullanılabilir.

### Nasıl Aktif Edilir?

`.env.local` dosyasında şu ayarı yapın:

```bash
NEXT_PUBLIC_MOCK_AUTH=true
```

### Nasıl Çalışır?

- **Login**: Herhangi bir email/şifre ile giriş yapıldığında 1 saniye bekler ve sahte bir admin kullanıcısı ile başarılı giriş yapar.
- **Token**: `mock-jwt-token-12345` adında sahte bir token üretir.
- **Middleware**: Bu sahte token cookie'ye de yazıldığı için middleware korumasından geçer.
- **Logout**: Sahte token'ı ve user'ı temizler.

Bu sayede login formunu, dashboard erişimini ve logout akışını backend olmadan test edebilirsiniz.
