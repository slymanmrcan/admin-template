# Ekip Onboarding (Yeni Başlayanlar)

Bu doküman, projeyi ilk kez kuracak ekip üyeleri için hızlı kurulum ve doğrulama adımlarını içerir.

## 1) Ön Koşullar

- Node.js 20.x
- npm 10+
- Git

Doğrulama:

```bash
node -v
npm -v
git -v
```

## 2) Repo Klonlama

SSH ile:

```bash
git clone git@github.com:slymanmrcan/admin-template.git
cd admin-template
```

Remote kontrolü:

```bash
git remote -v
origin  git@github.com:slymanmrcan/admin-template.git (fetch)
origin  git@github.com:slymanmrcan/admin-template.git (push)
```

## 3) Bağımlılıkları Kurma

```bash
npm install
```

## 4) Environment Dosyası

```bash
cp .env.example .env.local
```

Gerekli alanları doldurun:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_URL`

Mock ile geliştirme:

```bash
NEXT_PUBLIC_MOCK_AUTH=true
NEXT_PUBLIC_DISABLE_MIDDLEWARE=true
```

## 5) Geliştirme Sunucusu

```bash
npm run dev
```

Uygulama: http://localhost:3000

## 6) Doğrulama Komutları

```bash
npm run lint
npm run type-check
```

## 7) Yaygın Sorunlar

- SSH erişim hatası alırsanız GitHub SSH anahtarınızı kontrol edin.
- `node -v` sürümü 20 değilse nvm ile yükseltin.
