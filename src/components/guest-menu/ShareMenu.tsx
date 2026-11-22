"use client";

import QRCode from "qrcode";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  buildCustomerUrl,
  buildPresentationUrl,
  isLocalOrLoopbackUrl,
  resolvePresentationBaseUrl,
} from "@/lib/presentation-urls";
import type { MenuThemeId } from "@/types/menu";

interface ShareMenuProps {
  activeTheme: MenuThemeId;
  activeThemeTitle: string;
  businessSlug: string;
}

type ShareLinkMode = "sunum" | "musteri";

interface ShareThemeStyle {
  trigger: string;
  popover: string;
  headingMuted: string;
  segmentedBg: string;
  segmentedActive: string;
  segmentedInactive: string;
  urlBox: string;
  primaryBtn: string;
  secondaryBtn: string;
  divider: string;
}

const SHARE_STYLE_MAP: Record<MenuThemeId, ShareThemeStyle> = {
  ozel: {
    trigger:
      "border-[#171714] bg-[#F6F4EE] text-[#171714] hover:border-[#2448D8] hover:text-[#2448D8] focus-visible:outline-[#2448D8]",
    popover: "border-[#171714] bg-white text-[#171714] shadow-md",
    headingMuted: "text-[#595950]",
    segmentedBg: "border-[#DCD8CC] bg-[#F6F4EE]",
    segmentedActive: "bg-[#171714] text-[#F6F4EE]",
    segmentedInactive: "text-[#595950] hover:text-[#171714]",
    urlBox: "border-[#DCD8CC] bg-[#FAF8F4] text-[#171714]",
    primaryBtn: "bg-[#2448D8] text-white hover:bg-[#1d3ab0]",
    secondaryBtn:
      "border border-[#171714] bg-white text-[#171714] hover:border-[#2448D8] hover:text-[#2448D8]",
    divider: "border-[#E6E4DD]",
  },
  gece: {
    trigger:
      "rounded-[6px] border-[#343835] bg-[#242725] text-[#F5F1E8] hover:border-[#F28B50] focus-visible:outline-[#F28B50]",
    popover:
      "rounded-[10px] border-[#343835] bg-[#1F2220] text-[#F5F1E8] shadow-xl",
    headingMuted: "text-[#B9BDB6]",
    segmentedBg: "rounded-[8px] border-[#343835] bg-[#171918]",
    segmentedActive: "rounded-[6px] bg-[#F28B50] font-semibold text-[#171918]",
    segmentedInactive: "text-[#B9BDB6] hover:text-[#F5F1E8]",
    urlBox:
      "rounded-[7px] border-[#343835] bg-[#171918] text-[#F5F1E8]",
    primaryBtn:
      "rounded-[7px] bg-[#F28B50] font-semibold text-[#171918] hover:bg-[#f59c69]",
    secondaryBtn:
      "rounded-[7px] border border-[#343835] bg-[#242725] text-[#F5F1E8] hover:border-[#F28B50]",
    divider: "border-[#2F3330]",
  },
  canli: {
    trigger:
      "rounded-[8px] border-[1.5px] border-[#24201B] bg-[#FFF9ED] font-semibold text-[#24201B] hover:border-[#AD3028] hover:text-[#AD3028] focus-visible:outline-[#AD3028]",
    popover:
      "rounded-[12px] border-[1.5px] border-[#24201B] bg-[#FFF9ED] text-[#24201B] shadow-[3px_3px_0_#24201B]",
    headingMuted: "text-[#5C5347]",
    segmentedBg:
      "rounded-[9px] border-[1.5px] border-[#24201B] bg-[#F4CE45]/35",
    segmentedActive: "rounded-[6px] bg-[#AD3028] font-bold text-[#FFF9ED]",
    segmentedInactive: "text-[#24201B] hover:text-[#AD3028]",
    urlBox:
      "rounded-[8px] border-[1.5px] border-[#24201B] bg-white text-[#24201B]",
    primaryBtn:
      "rounded-[8px] border-[1.5px] border-[#24201B] bg-[#AD3028] font-bold text-[#FFF9ED] hover:bg-[#8E251E]",
    secondaryBtn:
      "rounded-[8px] border-[1.5px] border-[#24201B] bg-[#F4CE45] font-bold text-[#24201B] hover:bg-[#e5bf38]",
    divider: "border-[#24201B]/20",
  },
  ferah: {
    trigger:
      "rounded-[8px] border-[#BFDBFE] bg-[#EFF6FF] font-semibold text-[#182747] hover:border-[#2454D6] hover:text-[#2454D6] focus-visible:outline-[#2454D6]",
    popover:
      "rounded-[12px] border-[#BFDBFE] bg-[#FFFFFF] text-[#182747] shadow-lg",
    headingMuted: "text-[#596579]",
    segmentedBg: "rounded-[8px] border-[#DBEAFE] bg-[#EFF6FF]",
    segmentedActive: "rounded-[6px] bg-[#2454D6] font-semibold text-white",
    segmentedInactive: "text-[#596579] hover:text-[#182747]",
    urlBox: "rounded-[8px] border-[#DBEAFE] bg-[#F8FAFC] text-[#182747]",
    primaryBtn:
      "rounded-[8px] bg-[#2454D6] font-semibold text-white hover:bg-[#1E44B8]",
    secondaryBtn:
      "rounded-[8px] border border-[#BFDBFE] bg-[#EFF6FF] font-semibold text-[#2454D6] hover:bg-[#DBEAFE]",
    divider: "border-[#E2E8F0]",
  },
  klasik: {
    trigger:
      "rounded-[8px] border-[#E2E5E9] bg-[#F7F7F8] font-semibold text-[#1A1D21] hover:border-[#1A1D21] focus-visible:outline-[#1A1D21]",
    popover:
      "rounded-[12px] border-[#E2E5E9] bg-[#FFFFFF] text-[#1A1D21] shadow-lg",
    headingMuted: "text-[#636A73]",
    segmentedBg: "rounded-[8px] border-[#EAECEF] bg-[#F7F7F8]",
    segmentedActive: "rounded-[6px] bg-[#1A1D21] font-semibold text-white",
    segmentedInactive: "text-[#636A73] hover:text-[#1A1D21]",
    urlBox: "rounded-[8px] border-[#EAECEF] bg-[#F7F7F8] text-[#1A1D21]",
    primaryBtn:
      "rounded-[8px] bg-[#1A1D21] font-semibold text-white hover:bg-[#32363E]",
    secondaryBtn:
      "rounded-[8px] border border-[#E2E5E9] bg-[#FFFFFF] font-semibold text-[#1A1D21] hover:border-[#1A1D21]",
    divider: "border-[#EAECEF]",
  },
  vitrin: {
    trigger:
      "rounded-full border-[#DFDBD2] bg-[#FFFFFF] font-medium text-[#191817] hover:border-[#191817] focus-visible:outline-[#191817]",
    popover:
      "rounded-[14px] border-[#E4E1DA] bg-[#FFFFFF] text-[#191817] shadow-xl",
    headingMuted: "text-[#6B6863]",
    segmentedBg: "rounded-full border-[#EBE9E4] bg-[#FAF9F7]",
    segmentedActive: "rounded-full bg-[#191817] font-semibold text-white",
    segmentedInactive: "text-[#6B6863] hover:text-[#191817]",
    urlBox: "rounded-[10px] border-[#EBE9E4] bg-[#FAF9F7] text-[#191817]",
    primaryBtn:
      "rounded-full bg-[#191817] font-medium text-white hover:bg-[#33312F]",
    secondaryBtn:
      "rounded-full border border-[#DFDBD2] bg-[#FFFFFF] font-medium text-[#191817] hover:border-[#191817]",
    divider: "border-[#EBE9E4]",
  },
};

function subscribePopState(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

export function ShareMenu({
  activeTheme,
  activeThemeTitle,
  businessSlug,
}: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [linkMode, setLinkMode] = useState<ShareLinkMode>("sunum");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [qrSvg, setQrSvg] = useState<string>("");
  const [qrPngDataUrl, setQrPngDataUrl] = useState<string>("");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogTitleId = useId();
  const styles = SHARE_STYLE_MAP[activeTheme];

  const clientHref = useSyncExternalStore(
    subscribePopState,
    () => window.location.href,
    () => ""
  );

  const baseUrl = useMemo(
    () => resolvePresentationBaseUrl(clientHref || undefined, businessSlug),
    [clientHref, businessSlug]
  );

  useEffect(() => {
    if (!open) return;

    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const activeUrl = useMemo(() => {
    if (linkMode === "musteri") {
      return buildCustomerUrl(baseUrl, businessSlug, activeTheme);
    }
    return buildPresentationUrl(baseUrl, activeTheme);
  }, [baseUrl, businessSlug, activeTheme, linkMode]);

  const copied = copiedUrl === activeUrl;

  const isLocalPreview = useMemo(
    () => isLocalOrLoopbackUrl(activeUrl),
    [activeUrl]
  );

  useEffect(() => {
    if (!open || !activeUrl) return;
    let cancelled = false;

    async function renderQrCodes() {
      try {
        const [svgMarkup, pngUrl] = await Promise.all([
          QRCode.toString(activeUrl, {
            type: "svg",
            errorCorrectionLevel: "M",
            margin: 2,
            width: 256,
          }),
          QRCode.toDataURL(activeUrl, {
            errorCorrectionLevel: "M",
            margin: 2,
            width: 1024,
          }),
        ]);

        if (!cancelled) {
          setQrSvg(svgMarkup);
          setQrPngDataUrl(pngUrl);
        }
      } catch {
        if (!cancelled) {
          setQrSvg("");
          setQrPngDataUrl("");
        }
      }
    }

    renderQrCodes();
    return () => {
      cancelled = true;
    };
  }, [open, activeUrl]);

  async function handleCopyUrl() {
    if (!activeUrl) return;
    try {
      await navigator.clipboard.writeText(activeUrl);
      setCopiedUrl(activeUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = activeUrl;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedUrl(activeUrl);
    }
    window.setTimeout(() => {
      setCopiedUrl((prev) => (prev === activeUrl ? null : prev));
    }, 2000);
  }

  function handleDownloadSvg() {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const suffix = isLocalPreview ? "-yerel-test" : "";
    triggerDownload(
      objectUrl,
      `qr-${businessSlug}-${activeTheme}-${linkMode}${suffix}.svg`
    );
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }

  function handleDownloadPng() {
    if (!qrPngDataUrl) return;
    const suffix = isLocalPreview ? "-yerel-test" : "";
    triggerDownload(
      qrPngDataUrl,
      `qr-${businessSlug}-${activeTheme}-${linkMode}${suffix}.png`
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Paylaşım ve QR menüsü"
        className={`inline-flex shrink-0 items-center gap-1.5 border px-2.5 py-1 text-[12px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${styles.trigger}`}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0"
        >
          <rect x="2" y="2" width="4.5" height="4.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="9.5" y="2" width="4.5" height="4.5" stroke="currentColor" strokeWidth="1.25" />
          <rect x="2" y="9.5" width="4.5" height="4.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M9.5 9.5H11.5V11.5H9.5V9.5ZM12 12H14V14H12V12ZM12 9.5H14V10.8M9.5 12.5V14" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        <span>Paylaş</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={dialogTitleId}
          className={`absolute top-full right-0 z-50 mt-1.5 w-[min(336px,calc(100vw-24px))] max-h-[calc(100dvh-56px)] overflow-y-auto overscroll-contain border p-3.5 ${styles.popover}`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                id={dialogTitleId}
                className={`text-[10.5px] font-semibold tracking-[0.08em] uppercase ${styles.headingMuted}`}
              >
                Bağlantı ve QR Paylaşımı
              </p>
              <p className="mt-0.5 text-[13px] font-semibold">
                Seçili tasarım: {activeThemeTitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Paylaş menüsünü kapat"
              className={`rounded-[6px] px-2 py-0.5 text-[11.5px] font-medium ${styles.headingMuted} hover:opacity-80`}
            >
              Kapat
            </button>
          </div>

          {/* Sunum vs Müşteri Bağlantısı Ayrımı */}
          <div
            role="tablist"
            aria-label="Paylaşım bağlantısı türü"
            className={`mt-3 grid grid-cols-2 gap-1 border p-1 ${styles.segmentedBg}`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={linkMode === "sunum"}
              onClick={() => setLinkMode("sunum")}
              className={`px-2 py-1.5 text-[11.5px] leading-tight transition-colors ${
                linkMode === "sunum"
                  ? styles.segmentedActive
                  : styles.segmentedInactive
              }`}
            >
              Sunum Bağlantısı
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={linkMode === "musteri"}
              onClick={() => setLinkMode("musteri")}
              className={`px-2 py-1.5 text-[11.5px] leading-tight transition-colors ${
                linkMode === "musteri"
                  ? styles.segmentedActive
                  : styles.segmentedInactive
              }`}
            >
              Müşteri Bağlantısı
            </button>
          </div>

          <p className={`mt-2 text-[11.5px] leading-[1.4] ${styles.headingMuted}`}>
            {linkMode === "sunum"
              ? "Tasarım seçici görünür; alıcı 6 tasarım arasında geçiş yapabilir."
              : `Tasarım seçici gizlidir; doğrudan yalnızca ${activeThemeTitle} açılır.`}
          </p>

          {/* URL Gösterimi ve Kopyalama */}
          <div className={`mt-2.5 border p-2.5 ${styles.urlBox}`}>
            <p
              data-testid="share-url-preview"
              className="font-mono text-[11px] leading-[1.45] break-all select-all"
            >
              {activeUrl}
            </p>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyUrl}
              className={`px-2.5 py-2 text-[12px] leading-tight transition-colors ${styles.primaryBtn}`}
            >
              {copied ? "Kopyalandı ✓" : "Bağlantıyı kopyala"}
            </button>
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-2.5 py-2 text-center text-[12px] leading-tight transition-colors ${styles.secondaryBtn}`}
            >
              Yeni sekmede aç
            </a>
          </div>

          {/* QR Önizleme & İndirme */}
          <div className={`mt-3 border-t pt-3 ${styles.divider}`}>
            <div className="flex flex-col items-center">
              <div className="flex h-[152px] w-[152px] items-center justify-center rounded-[10px] border border-[#E5E7EB] bg-white p-2">
                {qrSvg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrSvg)}`}
                    alt={`${activeThemeTitle} ${
                      linkMode === "sunum" ? "sunum" : "müşteri"
                    } QR kodu`}
                    className="h-full w-full"
                  />
                ) : (
                  <span className="text-[11px] text-[#6B7280]">
                    QR hazırlanıyor…
                  </span>
                )}
              </div>

              {isLocalPreview ? (
                <p className="mt-2.5 rounded-[8px] border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-[11px] leading-[1.4] text-amber-950">
                  Yerel test adresi algılandı (localhost): Bu QR yalnızca yerel
                  kontrol içindir, baskıya hazır sunum çıktısı değildir.
                </p>
              ) : (
                <p className={`mt-2 text-center text-[11px] ${styles.headingMuted}`}>
                  Aktif alan adı üzerinden doğrudan taramaya hazır QR kod
                </p>
              )}

              <div className="mt-2.5 grid w-full grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  disabled={!qrSvg}
                  className={`px-2.5 py-1.5 text-[11.5px] transition-colors disabled:opacity-45 ${styles.secondaryBtn}`}
                >
                  {isLocalPreview ? "Test SVG İndir" : "SVG İndir"}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={!qrPngDataUrl}
                  className={`px-2.5 py-1.5 text-[11.5px] transition-colors disabled:opacity-45 ${styles.secondaryBtn}`}
                >
                  {isLocalPreview ? "Test PNG İndir" : "PNG İndir"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function triggerDownload(href: string, filename: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
