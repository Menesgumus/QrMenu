# `menu.prilmones.com.tr` Sunucu Kurulum ve HTTPS Rehberi

Bu rehber, **Lokal Fırın & Kahve QR Menü Sunum Prototipi**nin mevcut sunucuda diğer uygulamalardan (ör. **Pril Masası**) izole şekilde canlıya alınması içindir.

> **Önemli:** Mevcut Pril Masası servislerine, portlarına ve Nginx yapılandırma dosyalarına **dokunmayın**. Bu uygulama kendi bağımsız Compose projesi (`qrmenu`) ve kendi ayrı Nginx site dosyası (`menu.prilmones.com.tr`) ile çalışır.

---

## 1. Ön Koşullar

- `menu.prilmones.com.tr` için DNS A (ve varsa AAAA) kaydının sunucuya yönlendirilmiş olması
- Sunucuda Docker Engine ve Docker Compose v2 kurulu olması (`docker compose version`)
- Sunucuda Nginx ve Certbot (`certbot` + `python3-certbot-nginx`) kurulu olması

---

## 2. Sunucuda Boş Port Kontrolü

Uygulama yalnızca sunucunun `127.0.0.1` arayüzüne bağlanır. Çakışma olmaması için önce sunucuda kullanımda olan portları listeleyin:

```bash
ss -tulpn | grep LISTEN
```

Mevcut servislerin (özellikle Pril Masası ve veritabanı/proxy servislerinin) kullanmadığı boş bir port numarası belirleyin. Aşağıdaki adımlarda bu değer `<APP_PORT>` olarak gösterilmiştir.

---

## 3. Depoyu Klonlama ve `.env` Hazırlama

Sunucuda proje için uygun bir dizine depoyu klonlayın:

```bash
git clone https://github.com/Menesgumus/QrMenu.git qrmenu
cd qrmenu
cp .env.example .env
```

`.env` dosyasını düzenleyip alan adını ve belirlediğiniz boş portu girin:

```env
NEXT_PUBLIC_PRESENTATION_BASE_URL=https://menu.prilmones.com.tr
APP_PORT=<APP_PORT>
```

> **Not:** `NEXT_PUBLIC_PRESENTATION_BASE_URL` değeri Next.js üretim derlemesi (`next build`) sırasında istemci paketine gömülür. Bu alan adı değiştirilirse `--build` ile imaj yeniden derlenmelidir.

---

## 4. Konteyneri Derleme ve Başlatma

```bash
docker compose up -d --build
```

Durumu ve sağlık kontrolünü doğrulayın:

```bash
docker compose ps
docker compose logs --tail=50 qrmenu
curl -I http://127.0.0.1:<APP_PORT>
```

`curl -I` çıktısında `HTTP/1.1 200 OK` yanıtı görülmelidir.

---

## 5. Nginx Sanal Sunucu Tanımı (Ayrı Site Dosyası)

Örnek yapılandırmayı yeni bir site dosyası olarak kopyalayın (mevcut dosyalara dokunmayın):

```bash
sudo cp deploy/nginx-menu.prilmones.com.tr.conf /etc/nginx/sites-available/menu.prilmones.com.tr
```

`/etc/nginx/sites-available/menu.prilmones.com.tr` dosyasını açıp `<APP_PORT>` yer tutucusunu 2. adımda seçtiğiniz port numarasıyla değiştirin, ardından etkinleştirin:

```bash
sudo nano /etc/nginx/sites-available/menu.prilmones.com.tr
sudo ln -s /etc/nginx/sites-available/menu.prilmones.com.tr /etc/nginx/sites-enabled/menu.prilmones.com.tr
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6. HTTPS (TLS) Sertifikası Kurulumu

DNS yayılımı tamamlandıktan sonra yalnızca `menu.prilmones.com.tr` için Certbot çalıştırın:

```bash
sudo certbot --nginx -d menu.prilmones.com.tr
```

Otomatik yenilemeyi test edin:

```bash
sudo certbot renew --dry-run
```

---

## 7. Canlı Doğrulama Kontrol Listesi

Kurulum tamamlandıktan sonra tarayıcıda aşağıdaki kontrolleri yapın:

1. Sunum görünümü tüm tasarımlar:
   - `https://menu.prilmones.com.tr/?tasarim=ozel`
   - `https://menu.prilmones.com.tr/?tasarim=gece`
   - `https://menu.prilmones.com.tr/?tasarim=canli`
   - `https://menu.prilmones.com.tr/?tasarim=ferah`
   - `https://menu.prilmones.com.tr/?tasarim=klasik`
   - `https://menu.prilmones.com.tr/?tasarim=vitrin`
2. Müşteri görünümü (tasarım seçici gizli):
   - `https://menu.prilmones.com.tr/m/lokal-firin-kahve?tasarim=vitrin`
3. Herhangi bir tasarımda **Paylaş** menüsünü açıp:
   - Bağlantıların `https://menu.prilmones.com.tr/...` ile başladığını,
   - Yerel önizleme uyarısının görünmediğini,
   - **SVG İndir** ve **PNG İndir** çıktılarının baskıya hazır gerçek alan adı QR kodunu ürettiğini doğrulayın.

---

## 8. Sonraki Güncellemeler

Depoya yeni değişiklikler geldiğinde sunucuda yalnızca aşağıdaki komutları çalıştırın:

```bash
cd qrmenu
git pull --ff-only origin main
docker compose up -d --build
```
