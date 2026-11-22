import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[820px] flex-col justify-center bg-[var(--menu-bg)] px-4 py-16 text-[var(--menu-text)] md:px-8">
      <div className="border-t-2 border-[var(--menu-border-strong)] pt-6">
        <p className="text-[11.5px] font-semibold tracking-[0.1em] uppercase text-[var(--menu-text-secondary)]">
          404 · Menü Bulunamadı
        </p>
        <h1 className="mt-2 font-display text-[36px] leading-[1] font-bold text-[var(--menu-text)] md:text-[48px]">
          Bu bağlantı için aktif bir menü bulunamadı.
        </h1>
        <p className="mt-3 max-w-[48ch] text-[14.5px] leading-[1.55] text-[var(--menu-text-secondary)]">
          Bağlantıyı kontrol edebilir veya örnek misafir menüsüne dönebilirsiniz.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center border border-[var(--menu-border-strong)] px-4 py-2 text-[13.5px] font-medium text-[var(--menu-text)] transition-colors duration-150 hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]"
        >
          Örnek menüye dön
        </Link>
      </div>
    </main>
  );
}
