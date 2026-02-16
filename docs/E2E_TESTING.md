# E2E Testing (Playwright)

Bu projede uçtan uca (End-to-End) testler için **Playwright** kullanılmaktadır. E2E testleri, uygulamanın kritik akışlarını (Login, Dashboard erişimi vb.) gerçek bir kullanıcı gibi tarayıcı üzerinde test eder.

## 🚀 1. Kurulum

Projeyi ilk kez kuruyorsanız veya Playwright tarayıcıları eksikse:

```bash
# Bağımlılıkları ve tarayıcıları yükle
npm install
npx playwright install --with-deps
```

## 🛠️ 2. Testleri Çalıştırma

Aşağıdaki komutları kullanarak testleri farklı modlarda çalıştırabilirsiniz:

| Komut                | Açıklama                                                                           |
| :------------------- | :--------------------------------------------------------------------------------- |
| `npm test`           | Tüm testleri arka planda (headless) çalıştırır.                                    |
| `npm run test:ui`    | Testleri görsel arayüzde çalıştırır (Time travel, DOM snapshot özellikleri aktif). |
| `npm run test:debug` | Testleri adım adım (debug) modunda çalıştırır.                                     |

## 📂 3. Dosya Yapısı

Testler, **Page Object Model (POM)** tasarım desenine göre organize edilmiştir. Bu, kod tekrarını önler ve bakımı kolaylaştırır.

```
e2e/
├── tests/              # Test senaryoları (*.spec.ts)
│   └── auth.spec.ts    # Örnek: Login testleri
├── pages/              # Sayfa nesneleri (*.page.ts)
│   └── login.page.ts   # Örnek: Login sayfası selektörleri ve metotları
```

## 📝 4. Yeni Özellik İçin Test Ekleme (Detaylı Rehber)

Yeni bir özellik (örneğin "Courses") eklediğinizde, bunun için test yazarken **Page Object Model (POM)** yapısını takip etmelisiniz.

### Adım 1: Page Object Dosyası Oluşturma

`e2e/pages/` klasöründe yeni bir dosya oluşturun: `courses.page.ts`.
Bu sınıf, sayfadaki elementleri (locator) ve eylemleri (action) içermelidir.

```typescript
// e2e/pages/courses.page.ts
import { type Locator, type Page } from "@playwright/test"

export class CoursesPage {
  readonly page: Page
  readonly heading: Locator
  readonly createButton: Locator
  readonly courseList: Locator

  constructor(page: Page) {
    this.page = page
    // Selektörler: Mümkünse 'role', 'text' veya 'label' kullanın. CSS class'lardan kaçının.
    this.heading = page.getByRole("heading", { name: "Courses" })
    this.createButton = page.getByRole("link", { name: "Add Course" })
    this.courseList = page.locator("table tbody tr")
  }

  async goto() {
    await this.page.goto("/dashboard/courses")
  }

  async createCourse(name: string) {
    await this.createButton.click()
    await this.page.getByLabel("Course Name").fill(name)
    await this.page.getByRole("button", { name: "Save" }).click()
  }
}
```

### Adım 2: Test Dosyası Oluşturma

`e2e/tests/` klasöründe test dosyasını oluşturun: `courses.spec.ts`.

```typescript
// e2e/tests/courses.spec.ts
import { test, expect } from "@playwright/test"
import { CoursesPage } from "../pages/courses.page"
import { LoginPage } from "../pages/login.page"

test.describe("Courses Feature", () => {
  let coursesPage: CoursesPage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    // 1. Önce Login ol (Her test öncesi temiz oturum)
    loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.fillEmail("admin@example.com")
    await loginPage.fillPassword("123456")
    await loginPage.submit()

    // 2. Courses sayfasına git
    coursesPage = new CoursesPage(page)
    await coursesPage.goto()
  })

  test("should display courses list", async () => {
    await expect(coursesPage.heading).toBeVisible()
  })

  test("should create a new course", async ({ page }) => {
    const newCourseName = "Advanced React Patterns"

    await coursesPage.createCourse(newCourseName)

    // Başarı mesajını veya listede görünmesini kontrol et
    await expect(page.getByText("Course created successfully")).toBeVisible()
    await expect(page.getByText(newCourseName)).toBeVisible()
  })
})
```

### 💡 Best Practices (En İyi Uygulamalar)

1.  **Selectors:** `data-testid` veya kullanıcıya görünen metinleri (`getByText`, `getByRole`) tercih edin. Kırılgan CSS selektörleri (`div > div:nth-child(3)`) kullanmayın.
2.  **Assertions:** `expect` ile mutlaka beklenen durumu doğrulayın (`toBeVisible`, `toHaveURL` vb.).
3.  **Isolation:** Her test birbirinden bağımsız olmalı. Bir testin oluşturduğu veri, diğer testi etkilememeli (Mock API veya veritabanı temizliği önemlidir).
4.  **Wait:** `waitForTimeout` kullanmak yerine `expect` assertion'larının kendi bekleme sürelerine güvenin veya `waitFor` kullanın.

## 🤖 5. CI/CD Entegrasyonu

GitHub Actions yapılandırması (`.github/workflows/ci.yml`) sayesinde her `push` işleminde testler otomatik olarak çalışır.

- CI ortamında testlerin çalışabilmesi için `playwright.config.ts` dosyasında `webServer` ayarı yapılmıştır.
- Hata durumunda, GitHub Actions sayfasında "Artifacts" bölümünden test raporunu indirebilirsiniz.

## İpuçları

- **Codegen:** `npx playwright codegen http://localhost:3000` komutu ile tarayıcıda yaptıklarınızı koda dökebilirsiniz.
- **UI Mode:** `npm run test:ui` komutu ile testleri görsel olarak izleyip debug edebilirsiniz.
