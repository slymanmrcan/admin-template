# Form Şablonları

Bu sayfa, React Hook Form + Zod + React Query kombinasyonu ile tekrar kullanılabilir form örneklerini içerir. Amaç, uzun vadede bakım kolaylığı sağlayan bir form yapısı sunmaktır.

## Nerede?

- UI örnekleri: `src/app/(admin)/dashboard/forms/page.tsx`
- Servis katmanı: `src/services/form-templates-service.ts`
- React Query hook'ları: `src/hooks/use-form-templates.ts`

## Örnek Akışlar

### 1) Destek Talebi

- Zod şeması ile doğrulama
- `useCreateSupportRequest` ile mutation
- Başarılı işlemde form reset

### 2) Takım Daveti

- Rol seçimi (Select)
- `useInviteMember` ile mutation
- Form state temizliği

### 3) Tercihler

- `usePreferences` ile formu doldurma
- `useUpdatePreferences` ile güncelleme
- Query cache güncellemesi

## Servis Katmanı

Servisler, mock mod açıkken sahte gecikme ve dönüşler sağlar. Gerçek API aktif olduğunda `api` client kullanılır.

```ts
const response = await formTemplatesService.createSupportRequest(data)
```

## React Query

Mutations sonrası kullanıcıya bildirim gösterilir. Tercih güncellemede cache doğrudan güncellenir.

```ts
const updatePreferences = useUpdatePreferences()
updatePreferences.mutate(values)
```
