# Lokal Fırın & Kahve — QR Menü Sunum Prototipi

Bu proje, **Lokal Fırın & Kahve** markası için hazırlanmış, tek veri kaynağını (`src/data/prototype-menu.ts`) paylaşan **6 farklı misafir menüsü tasarımını** sunan Next.js tabanlı QR menü sunum uygulamasıdır.

## Tasarımlar ve Bağlantı Yapısı

Uygulama iki temel rota sunar:

- **Sunum görünümü (tasarım seçici açık):** `/` ve `/?tasarim=<id>`
- **Müşteri görünümü (tasarım seçici gizli):** `/m/lokal-firin-kahve?tasarim=<id>`

Desteklenen `tasarim` değerleri:

| Tasarım | Değer (`tasarim`) |
| --- | --- |
| Özel Menü (varsayılan) | `ozel` |
| Gece | `gece` |
| Canlı | `canli` |
| Ferah | `ferah` |
| Klasik QR | `klasik` |
| Vitrin | `vitrin` |

Geçersiz veya tanımsız `tasarim` değerlerinde varsayılan olarak `ozel` tasarımı açılır. Üst çubuktaki **Paylaş** menüsü, aktif tasarıma göre **Sunum bağlantısı** ve **Müşteri bağlantısı** üretimini tek noktadan (`src/lib/presentation-urls.ts`) yönetir ve canlı **SVG / PNG QR kod** indirir.

### Ortam Değişkeni Notu (`NEXT_PUBLIC_PRESENTATION_BASE_URL`)

- Örnek dosya: [`.env.example`](./.env.example)
- `NEXT_PUBLIC_PRESENTATION_BASE_URL` değeri Next.js üretim derlemesi (`next build`) sırasında istemci paketine gömülür.
- Canlı yayın hedefi için varsayılan üretim değeri `https://menu.prilmones.com.tr` olarak yapılandırılabilir (sonunda `/` olmadan; alt dizin varsa yol korunur).
- Yerel geliştirmede tanımlanmazsa uygulama mevcut tarayıcı kökenini kullanır; `localhost` / loopback adreslerinde QR kodları baskıya hazır olmayan yerel önizleme uyarısı ile üretir.

---

## Gereksinimler

- **Node.js:** `24.x` (yerel doğrulama ortamı `v24.13.1`)
- **Paket yöneticisi:** `pnpm@11.25.0` (`package.json` içindeki `packageManager` alanı; Corepack ile etkinleştirilebilir)
- **Canlı konteyner yayını için (isteğe bağlı):** Docker Engine ve Docker Compose v2

---

## Yerel Çalıştırma

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Geliştirme sunucusu varsayılan olarak `http://localhost:3000` adresinde açılır.

> **Not:** Yerel ortamda `pnpm build` çalıştırmadan önce `.env.local` içine değer yazmak isterseniz `.env.example` şablonunu referans alabilirsiniz; gerçek `.env*` dosyaları Git tarafından yoksayılır.

---

## Üretim Derlemesi ve Yerel Doğrulama

Tip kontrolü, lint ve üretim derlemesini çalıştırmak için:

```bash
pnpm exec tsc --noEmit
pnpm lint
NEXT_PUBLIC_PRESENTATION_BASE_URL=https://menu.prilmones.com.tr pnpm build
pnpm start
```

Windows PowerShell üzerinde üretim ortamı adresiyle derleme yapmak için:

```powershell
$env:NEXT_PUBLIC_PRESENTATION_BASE_URL = "https://menu.prilmones.com.tr"
pnpm build
pnpm start
```

---

## Docker ve Sunucu Yayını (`menu.prilmones.com.tr`)

Projede üretim yayını için çok aşamalı `Dockerfile`, `.dockerignore`, `compose.yaml` (`name: qrmenu`) ve `deploy/` altında örnek Nginx + HTTPS kurulum belgeleri yer alır:

- Compose tanımı uygulamayı yalnızca `127.0.0.1:${APP_PORT}:3000` arayüzüne bağlar.
- `APP_PORT` için sunucuda `ss -tulpn` ile boş olduğu doğrulanmış bir port `.env` içinde tanımlanmalıdır.
- Nginx ters proxy ve Certbot HTTPS kurulum adımları için [`deploy/KURULUM.md`](./deploy/KURULUM.md) ve [`deploy/nginx-menu.prilmones.com.tr.conf`](./deploy/nginx-menu.prilmones.com.tr.conf) dosyalarını izleyin.

---

## Güncelleme Adımları

### Yerel ortamda

```bash
git pull --ff-only origin main
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

### Sunucuda (Docker Compose ile)

```bash
git pull --ff-only origin main
docker compose up -d --build
```

---

## Görseller ve Ekran Görüntüleri

- Menü ürün görselleri `public/images/menu/` altında (`thumbs`, `grid`, `full` alt dizinleri) yer alır; lisans ve kaynak kayıtları [`public/images/menu/SOURCES.md`](./public/images/menu/SOURCES.md) dosyasındadır.
- Tüm tasarımların inceleme ekran görüntüleri `screenshots/` klasöründe, özet rapor ise [`prototip-onizleme.md`](./prototip-onizleme.md) dosyasında tutulur.
