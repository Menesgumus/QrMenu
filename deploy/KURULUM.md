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

## 7A. Yayın Öncesi Sunucuda İzole Docker Doğrulaması (Ayrı Proje Adı)

Canlıya geçiş veya mevcut canlı konteyneri güncelleme öncesinde, **mevcut canlı konteynere, `3099` portuna ve diğer uygulamalara dokunmadan** ayrı bir Compose proje adıyla (`-p qrmenu-test`) boş bir localhost portunda (`<TEST_PORT>`) temiz imaj + kalıcı birim testi yapın:

> **Uyarı:** `docker compose down -v` veya canlı birim isimlerini (`qrmenu_hashed_assets`, `qrmenu_hashed_state`) silen hiçbir komut çalıştırmayın. `<TEST_PORT>` için `ss -tulpn | grep LISTEN` çıktısında yer almayan, `3099` dışındaki boş bir port seçin.

1. **İzole adlandırmayı doğrulayın ve temiz build ile hash'li görselleri üretin:**
   ```bash
   APP_PORT=<TEST_PORT> docker compose -p qrmenu-test config
   APP_PORT=<TEST_PORT> docker compose -p qrmenu-test build --no-cache
   ```
   `config` çıktısında yalnızca `name: qrmenu-test`, `published: "<TEST_PORT>"`, `qrmenu-test_qrmenu_hashed_assets`, `qrmenu-test_qrmenu_hashed_state` ve `qrmenu-test_default` adlarının göründüğünü (sabit `container_name` veya canlı `qrmenu_...` adıyla çakışma olmadığını); `build` çıktısında ise `[images:verify] OK (422 assets verified, hashed directory synced).` satırının geçtiğini doğrulayın.

2. **Boş named volume üzerinde root olmayan kullanıcının yazabildiğini doğrulayın:**
   ```bash
   APP_PORT=<TEST_PORT> docker compose -p qrmenu-test up -d
   docker compose -p qrmenu-test logs --tail=30 qrmenu
   docker compose -p qrmenu-test exec qrmenu sh -c 'id && ls -ld /app/.hashed-state /app/public/images/menu/hashed && ls -la /app/.hashed-state/releases.json'
   ```
   Beklenen çıktı: `uid=1001(nextjs) gid=1001(nodejs)` ve günlüklerde `[start-server] hashed-release synced=422 (copied=422, reused=0) retained_releases=1 retained_files=422 pruned=0`.

3. **Sağlık kontrolü, görsel HTTP başlıkları ve HTML `no-store` politikasını doğrulayın:**
   ```bash
   docker compose -p qrmenu-test ps
   curl -I "http://127.0.0.1:<TEST_PORT>/"
   for v in icon card card-lg detail-md full; do
     FILE=$(docker compose -p qrmenu-test exec -T qrmenu sh -c "ls /app/public/images/menu/hashed/${v} | head -n 1")
     echo "=== ${v}: ${FILE} ==="
     curl -sI "http://127.0.0.1:<TEST_PORT>/images/menu/hashed/${v}/${FILE}" | grep -iE '^(HTTP/|cache-control:)'
   done
   curl -sI "http://127.0.0.1:<TEST_PORT>/images/menu/hashed/grid/truflu-yumurta.deadbeef.webp" | head -n 1
   ```
   Beklenen çıktı: konteyner `healthy`, örnek `icon`/`card`/`card-lg`/`detail-md`/`full` yollarında `HTTP/1.1 200 OK` + `Cache-Control: public, max-age=31536000, immutable`, geçersiz `deadbeef` hash'inde `404 Not Found` ve `/` HTML yanıtında `no-store` (uzun önbellekleme yok).

4. **Yeniden başlatma ve iki sürüm geçişinde önceki hash'lerin korunmasını doğrulayın:**
   ```bash
   docker compose -p qrmenu-test restart qrmenu
   docker compose -p qrmenu-test logs --tail=15 qrmenu
   ```
   Yeniden başlatmada `reused=422` görülmelidir. Ardından iki sürüm geçişini doğrulamak için test biriminde önceki sürüme ait örnek bir hash dosyası (`OLD_URL`) not edilip yeni derleme (`APP_PORT=<TEST_PORT> docker compose -p qrmenu-test up -d --build`) sonrası `HASHED_ASSET_KEEP_RELEASES=2` saklama politikasıyla hem önceki sürümün `OLD_URL` adresinin hem yeni sürümün hash'li URL'sinin `200` (`immutable`) döndüğünü, `/app/.hashed-state/releases.json` içinde `retained_releases=2` tutulduğunu doğrulayın.

5. **Yalnızca izole test konteynerini temizleyin (`down -v` kullanmayın):**
   ```bash
   docker compose -p qrmenu-test stop
   docker compose -p qrmenu-test rm -f
   ```

---

## 8. Sonraki Güncellemeler ve Hash'li Görsel Geçiş Uyumluluğu

Konteyner başlangıcında `scripts/start-server.mjs`, yeni sürümün hash'li görsellerini `/app/.hashed-release` içinden kalıcı `qrmenu_hashed_assets` birimine eşler ve `HASHED_ASSET_KEEP_RELEASES` (varsayılan `2`, en fazla `168` saat) ayarıyla bir önceki sürümün hash'li görsellerini geçiş süresince korur; daha eski sürümler otomatik temizlenir. HTML sayfaları `no-store` politikasını koruduğu için yeni yüklemeler hemen güncel HTML'e geçerken, güncelleme anında açık kalmış sekmelerin eski hash'li görsel istekleri de kesintisiz `200` yanıtı alır.

Depoya yeni değişiklikler geldiğinde sunucuda yalnızca aşağıdaki komutları çalıştırın:

```bash
cd qrmenu
git pull --ff-only origin main
docker compose up -d --build
```
