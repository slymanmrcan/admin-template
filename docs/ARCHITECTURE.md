# Admin Panel Template — Yapı Dökümanı

## Tech Stack

| Teknoloji             | Versiyon | Amaç                              |
| --------------------- | -------- | --------------------------------- |
| Next.js               | 16.1.6   | App Router, RSC, Server Actions   |
| React                 | 19.2.3   | UI framework                      |
| TypeScript            | ^5       | Tip güvenliği                     |
| Tailwind CSS          | v4       | Utility-first CSS                 |
| Zod                   | ^3       | Schema validation                 |
| React Query           | ^5       | Server state management & caching |
| Shadcn/UI             | Latest   | Reusable accessible components    |
| React Compiler        | 1.0.0    | Otomatik memoization              |
| react-hook-form + zod | ^7 / ^4  | Form yönetimi + validasyon        |
| recharts              | ^2.15    | Grafikler                         |
| next-themes           | ^0.4     | Dark/Light mode                   |
| lucide-react          | ^0.564   | İkon seti                         |
| Prettier              | ^3.8     | Kod formatlama                    |

---

## Klasör Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, ThemeProvider)
│   ├── page.tsx            # "/" → /dashboard redirect
│   ├── globals.css
│   ├── (admin)/            # 🔒 Admin route group (sidebar layout)
│   │   └── dashboard/
│   │       ├── layout.tsx  # Sidebar + Header + Content wrapper
│   │       ├── page.tsx    # /dashboard
│   │       ├── analytics/  # /dashboard/analytics
│   │       ├── users/      # /dashboard/users
│   │       └── settings/   # /dashboard/settings
│   │
│   └── (auth)/             # 🔓 Auth route group (split-screen layout)
│       ├── layout.tsx      # Sol branding + sağ form
│       ├── login/          # /login
│       ├── register/       # /register
│       └── forgot-password/# /forgot-password
│
├── components/             # UI bileşenleri
│   ├── ui/                 # shadcn/ui (button, card, dialog vs.)
│   ├── header/             # Header (search, notifications, user menu)
│   ├── sidebar/            # Sidebar (brand, nav-menu)
│   └── theme-toggle.tsx    # Dark/Light toggle butonu
│
├── config/                 # ⚙️ Proje konfigürasyonu
│   ├── site.ts             # Proje adı, açıklama, URL
│   ├── nav.ts              # Sidebar menü yapılandırması
│   └── index.ts            # Barrel export
│
├── constants/              # 📋 Sabit değerler
│   └── index.ts            # PAGE_SIZE, BREAKPOINTS, DATE_FORMATS
│
├── hooks/                  # 🪝 Custom React hooks
│   └── use-mobile.ts       # Breakpoint hook
│
├── lib/                    # 🔧 Utility fonksiyonlar
│   └── utils.ts            # cn() — Tailwind class merge
│
├── providers/              # 🎁 Context Providers
│   ├── theme-provider.tsx  # next-themes wrapper
│   └── index.ts            # Barrel export
│
├── services/               # 🌐 API katmanı
│   ├── api.ts              # Fetch wrapper (get, post, put, delete)
│   └── index.ts            # Barrel export
│
└── types/                  # 📝 Global TypeScript tipleri
    └── index.ts            # ApiResponse, User, BaseEntity
```

---

## CI/CD Pipeline

Proje, GitHub Actions üzerinde çalışan bir CI pipeline'ına sahiptir (`.github/workflows/ci.yml`).
Her `push` ve `pull_request` işleminde şunlar kontrol edilir:

1.  **Format:** `npm run format:check` (Prettier)
2.  **Lint:** `npm run lint` (ESLint)
3.  **Type Check:** `npm run type-check` (TypeScript)
4.  **Build:** `npm run build` (Next.js Build)
5.  **Test:** `npm test` (Playwright E2E)

Detaylı kullanım için: [E2E Testing (Playwright)](./E2E_TESTING.md)

## Data Fetching Strategy

1.  **Service Layer:**
    - `src/services/` altında ham API istekleri yapılır (fetch tabanlı client kullanılır).
    - Mock data desteği buradadır (`NEXT_PUBLIC_MOCK_AUTH=true`).

2.  **React Query Hooks:**
    - Componentlerde servisleri doğrudan çağırmayız.
    - `src/hooks/` altında `useQuery` veya `useMutation` hook'ları oluştururuz.
    - Örnek: `useUsers` hook'u `userService.getUsers`'ı çağırır ve cache yönetimini yapar.

3.  **Global State (Zustand):**
    - Sadece **Client State** (Auth user, Theme, Sidebar open/close) burada tutulur.
    - Sunucudan gelen veriler (Users list, Products list) **React Query**'de tutulur.

## 🚀 Yeni Özellik Ekleme

Yeni bir rota veya özellik eklemek için (Örn: Courses, Orders) detaylı rehberi inceleyin:
👉 **[Yeni Özellik Ekleme Rehberi (Adım Adım)](./ADD_NEW_FEATURE.md)**

## Route Groups Nasıl Çalışır?

Parantezli klasörler `(admin)`, `(auth)` **URL'yi etkilemez**, sadece layout gruplar:

```
(admin)/dashboard/page.tsx  → /dashboard
(auth)/login/page.tsx       → /login
```

Yeni layout ihtiyacı olursa yeni bir route group eklenir:

```
(marketing)/        → Navbar + Footer layout
(onboarding)/       → Wizard layout
```

Her grubun kendi `layout.tsx`'i vardır.

---

## Config Dosyaları

### `config/site.ts`

Yeni proje açınca tek değiştirmen gereken yer:

```ts
export const siteConfig = {
  name: "Admin Panel",
  description: "Modern admin dashboard template",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  locale: "en",
}
```

### `config/nav.ts`

Sidebar menü grupları burada tanımlı. Yeni sayfa ekleyince sadece buraya eklenir:

```ts
export const navConfig: NavGroup[] = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
      { title: "Analytics", icon: BarChart3, url: "/dashboard/analytics" },
    ],
  },
  // ...
]
```

Her `NavItem` şu tipleri destekler: `title`, `url`, `icon`, `badge?`, `disabled?`

---

## Services — API Kullanımı

`services/api.ts` generic bir fetch wrapper:

```ts
import { api } from "@/services"
import type { ApiResponse, User } from "@/types"

// GET
const users = await api.get<ApiResponse<User[]>>("/users")

// POST
await api.post<ApiResponse<User>>("/users", { name: "Ali", email: "ali@test.com" })
```

`NEXT_PUBLIC_API_URL` env variable'ı ile base URL değiştirilir.

---

## Scripts

| Komut                  | Açıklama                  |
| ---------------------- | ------------------------- |
| `npm run dev`          | Development server        |
| `npm run build`        | Production build          |
| `npm run lint`         | ESLint kontrolü           |
| `npm run lint:fix`     | ESLint auto-fix           |
| `npm run format`       | Prettier ile formatla     |
| `npm run format:check` | Format kontrolü (CI için) |
| `npm run type-check`   | TypeScript tip kontrolü   |

---

## Tooling

- **Prettier** — `.prettierrc` ile yapılandırılmış. `eslint-config-prettier` ile ESLint çakışmaları engellendi.
- **ESLint** — `eslint-config-next` (core-web-vitals + typescript) + Prettier entegrasyonu.
- **Node.js** — `engines` alanı ile minimum `>=18.0.0` zorunlu.

---

## Core Infrastructure

### 1. State Management (Zustand)

- `useAuthStore` (`store/auth-store.ts`): User, token, login/logout.
- `useUIStore` (`store/ui-store.ts`): Sidebar toggle, modal state.

### 2. API Client & Auth

- Interceptor'lar (`services/api.ts`):
  - **Request**: Otomatik `Bearer` token ekler.
  - **Response**: 401 hatasında logout yapar. Global hata mesajlarını (toast) yönetir.
- Auth Service (`services/auth-service.ts`): Login, register, logout metodları.

### 3. Middleware

- `middleware.ts`: Protected route (`/dashboard`) kontrolü yapar. Token yoksa login'e atar.

### 4. Toast Notifications

- `sonner` ve `Toaster` bileşeni ile global bildirimler.
- `toast.success("OK")` veya `toast.error("Hata")` şeklinde kullanılır.

---

## Yeni Proje Başlatma Checklist

1. `config/site.ts` → proje adı, URL değiştir
2. `config/nav.ts` → sidebar menüsünü düzenle
3. `globals.css` → renk paletini değiştir (oklch değerleri)
4. `app/(admin)/dashboard/` → sayfa ekle/çıkar
5. `.env.example`'ı `.env.local`'a kopyala, değerleri doldur
6. `npm run format` ile kodu formatla
