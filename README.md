# Admin Panel Template

Next.js App Router tabanlı, React Query + Zustand + Shadcn/UI altyapısı olan genel amaçlı admin panel şablonu.

## Hızlı Başlangıç

```bash
npm install
npm run dev
```

Uygulama: http://localhost:3000

## Komutlar

- `npm run dev` — geliştirme sunucusu
- `npm run build` — production build
- `npm run lint` — ESLint kontrolü
- `npm run type-check` — TypeScript tip kontrolü
- `npm test` — Playwright E2E testleri

## Docker ile Çalıştırma

```bash
docker build -t admin-panel .
docker run -p 3000:3000 admin-panel
```

Docker Compose:

```bash
docker compose up --build
```

## Konfigürasyon

- `src/config/site.ts` — proje adı, açıklama, URL
- `src/config/nav.ts` — sidebar menü yapısı
- `src/app/globals.css` — tema ve renk paleti
- `.env.example` — örnek environment değişkenleri

## Mock Auth

Backend olmadan geliştirme için `.env.local` içine:

```bash
NEXT_PUBLIC_MOCK_AUTH=true
NEXT_PUBLIC_DISABLE_MIDDLEWARE=true
```

## Özelleştirme Checklist

- `config/site.ts` → proje adı ve URL
- `config/nav.ts` → sidebar menüsü
- `globals.css` → tema renkleri
- `app/(admin)/dashboard/` → sayfa ekle/çıkar
- `src/app/layout.tsx` → SEO metadata
- `src/app/robots.ts` → robots.txt
- `src/app/sitemap.ts` → sitemap.xml

## Dokümantasyon

- `docs/ARCHITECTURE.md`
- `docs/ADD_NEW_FEATURE.md`
- `docs/REACT_QUERY.md`
- `docs/STATE_MANAGEMENT.md`
- `docs/FORM_TEMPLATES.md`
