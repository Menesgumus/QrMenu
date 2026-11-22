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
import { formatColorModeLabel, getUiDictionary } from "@/lib/i18n";
import {
  buildCustomerUrl,
  buildPresentationUrl,
  isLocalOrLoopbackUrl,
  resolvePresentationBaseUrl,
} from "@/lib/presentation-urls";
import type { ColorMode, MenuLanguage, MenuThemeId } from "@/types/menu";

interface ShareMenuProps {
  activeTheme: MenuThemeId;
  activeThemeTitle: string;
  language: MenuLanguage;
  colorMode: ColorMode;
  businessSlug: string;
}

type ShareLinkMode = "sunum" | "musteri";

function getShareShapeClasses(theme: MenuThemeId) {
  if (theme === "ozel") {
    return {
      trigger:
        "border-[var(--menu-border-strong)] bg-[var(--menu-bg)] text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
      popover:
        "border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] shadow-md",
      segmented:
        "border-[var(--menu-border)] bg-[var(--menu-surface-muted)]",
      segmentedActive:
        "bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)]",
      urlBox:
        "border-[var(--menu-border)] bg-[var(--menu-surface-muted)] text-[var(--menu-text)]",
      primaryBtn:
        "bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]",
      secondaryBtn:
        "border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] font-medium text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
    };
  }
  if (theme === "canli") {
    return {
      trigger:
        "rounded-[8px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-bg)] font-semibold text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
      popover:
        "rounded-[12px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-bg)] text-[var(--menu-text)] shadow-[3px_3px_0_var(--menu-shadow-ink)]",
      segmented:
        "rounded-[9px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-surface-muted)]",
      segmentedActive:
        "rounded-[6px] bg-[var(--menu-accent)] font-bold text-[var(--menu-accent-contrast)]",
      urlBox:
        "rounded-[8px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)]",
      primaryBtn:
        "rounded-[8px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-accent)] font-bold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]",
      secondaryBtn:
        "rounded-[8px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)] font-bold text-[var(--menu-band-text)] hover:border-[var(--menu-accent)]",
    };
  }
  if (theme === "vitrin") {
    return {
      trigger:
        "rounded-full border-[var(--menu-border-strong)] bg-[var(--menu-surface)] font-medium text-[var(--menu-text)] hover:border-[var(--menu-text)]",
      popover:
        "rounded-[14px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] shadow-xl",
      segmented:
        "rounded-full border-[var(--menu-border)] bg-[var(--menu-surface-muted)]",
      segmentedActive:
        "rounded-full bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)]",
      urlBox:
        "rounded-[10px] border-[var(--menu-border)] bg-[var(--menu-surface-muted)] text-[var(--menu-text)]",
      primaryBtn:
        "rounded-full bg-[var(--menu-accent)] font-medium text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]",
      secondaryBtn:
        "rounded-full border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] font-medium text-[var(--menu-text)] hover:border-[var(--menu-accent)]",
    };
  }
  return {
    trigger:
      "rounded-[8px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] font-semibold text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
    popover:
      "rounded-[12px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] shadow-xl",
    segmented:
      "rounded-[8px] border-[var(--menu-border)] bg-[var(--menu-surface-muted)]",
    segmentedActive:
      "rounded-[6px] bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)]",
    urlBox:
      "rounded-[8px] border-[var(--menu-border)] bg-[var(--menu-surface-muted)] text-[var(--menu-text)]",
    primaryBtn:
      "rounded-[8px] bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]",
    secondaryBtn:
      "rounded-[8px] border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] font-semibold text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
  };
}

function subscribePopState(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

export function ShareMenu({
  activeTheme,
  activeThemeTitle,
  language,
  colorMode,
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
  const dict = getUiDictionary(language);
  const shapes = getShareShapeClasses(activeTheme);

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
    const shareOptions = { language, colorMode };
    if (linkMode === "musteri") {
      return buildCustomerUrl(baseUrl, businessSlug, activeTheme, shareOptions);
    }
    return buildPresentationUrl(baseUrl, activeTheme, shareOptions);
  }, [baseUrl, businessSlug, activeTheme, linkMode, language, colorMode]);

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
      `qr-${businessSlug}-${activeTheme}-${language}-${colorMode}-${linkMode}${suffix}.svg`
    );
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }

  function handleDownloadPng() {
    if (!qrPngDataUrl) return;
    const suffix = isLocalPreview ? "-yerel-test" : "";
    triggerDownload(
      qrPngDataUrl,
      `qr-${businessSlug}-${activeTheme}-${language}-${colorMode}-${linkMode}${suffix}.png`
    );
  }

  const langDisplay = language.toUpperCase();
  const modeDisplay = formatColorModeLabel(colorMode, language);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={dict.share.triggerLabel}
        className={`inline-flex h-9 shrink-0 items-center gap-1.5 border px-2.5 text-[12px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${shapes.trigger}`}
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
        <span>{dict.share.triggerButton}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={dialogTitleId}
          className={`absolute top-full right-0 z-50 mt-1.5 max-h-[calc(100dvh-56px)] w-[min(336px,calc(100vw-24px))] overflow-y-auto overscroll-contain border p-3.5 ${shapes.popover}`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                id={dialogTitleId}
                className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[var(--menu-text-secondary)]"
              >
                {dict.share.dialogEyebrow}
              </p>
              <p className="mt-0.5 text-[13px] font-semibold text-[var(--menu-text)]">
                {dict.share.selectedDesign}: {activeThemeTitle}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-[var(--menu-text-secondary)]">
                {dict.share.selectedSettings(langDisplay, modeDisplay)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label={dict.share.closeAria}
              className="rounded-[6px] px-2 py-1 text-[11.5px] font-medium text-[var(--menu-text-secondary)] hover:text-[var(--menu-text)]"
            >
              {dict.nav.close}
            </button>
          </div>

          {/* Sunum vs Müşteri Bağlantısı Ayrımı */}
          <div
            role="tablist"
            aria-label={dict.share.linkTypeAria}
            className={`mt-3 grid grid-cols-2 gap-1 border p-1 ${shapes.segmented}`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={linkMode === "sunum"}
              onClick={() => setLinkMode("sunum")}
              className={`px-2 py-1.5 text-[11.5px] leading-tight transition-colors ${
                linkMode === "sunum"
                  ? shapes.segmentedActive
                  : "text-[var(--menu-text-secondary)] hover:text-[var(--menu-text)]"
              }`}
            >
              {dict.share.presentationTab}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={linkMode === "musteri"}
              onClick={() => setLinkMode("musteri")}
              className={`px-2 py-1.5 text-[11.5px] leading-tight transition-colors ${
                linkMode === "musteri"
                  ? shapes.segmentedActive
                  : "text-[var(--menu-text-secondary)] hover:text-[var(--menu-text)]"
              }`}
            >
              {dict.share.customerTab}
            </button>
          </div>

          <p className="mt-2 text-[11.5px] leading-[1.4] text-[var(--menu-text-secondary)]">
            {linkMode === "sunum"
              ? dict.share.presentationHint
              : dict.share.customerHint(activeThemeTitle)}
          </p>

          {/* URL Gösterimi ve Kopyalama */}
          <div className={`mt-2.5 border p-2.5 ${shapes.urlBox}`}>
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
              className={`px-2.5 py-2 text-[12px] leading-tight transition-colors ${shapes.primaryBtn}`}
            >
              {copied ? dict.share.copied : dict.share.copyLink}
            </button>
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-2.5 py-2 text-center text-[12px] leading-tight transition-colors ${shapes.secondaryBtn}`}
            >
              {dict.share.openNewTab}
            </a>
          </div>

          {/* QR Önizleme & İndirme (taranabilirlik için daima beyaz quiet-zone) */}
          <div className="mt-3 border-t border-[var(--menu-border)] pt-3">
            <div className="flex flex-col items-center">
              <div className="flex h-[152px] w-[152px] items-center justify-center rounded-[10px] border border-[#D4D8DD] bg-white p-2">
                {qrSvg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrSvg)}`}
                    alt={dict.share.qrAlt(activeThemeTitle, linkMode)}
                    className="h-full w-full"
                  />
                ) : (
                  <span className="text-[11px] text-[#5E656E]">
                    {dict.share.qrPreparing}
                  </span>
                )}
              </div>

              {isLocalPreview ? (
                <p className="mt-2.5 rounded-[8px] border border-[#D97706] bg-[#FEF3C7] px-2.5 py-1.5 text-[11px] leading-[1.4] text-[#78350F]">
                  {dict.share.localWarning}
                </p>
              ) : (
                <p className="mt-2 text-center text-[11px] text-[var(--menu-text-secondary)]">
                  {dict.share.readyQrHint}
                </p>
              )}

              <div className="mt-2.5 grid w-full grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  disabled={!qrSvg}
                  className={`px-2.5 py-1.5 text-[11.5px] transition-colors disabled:opacity-45 ${shapes.secondaryBtn}`}
                >
                  {isLocalPreview
                    ? dict.share.downloadSvgTest
                    : dict.share.downloadSvg}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={!qrPngDataUrl}
                  className={`px-2.5 py-1.5 text-[11.5px] transition-colors disabled:opacity-45 ${shapes.secondaryBtn}`}
                >
                  {isLocalPreview
                    ? dict.share.downloadPngTest
                    : dict.share.downloadPng}
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
