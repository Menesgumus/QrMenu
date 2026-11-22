import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[820px] flex-col justify-center px-4 py-16 md:px-8">
      <div className="border-t-2 border-[#171714] pt-6">
        <p className="text-[11.5px] font-semibold tracking-[0.1em] uppercase text-[#595950]">
          404 · Menü Bulunamadı
        </p>
        <h1 className="mt-2 font-display text-[36px] leading-[1] font-bold text-[#171714] md:text-[48px]">
          Bu bağlantı için aktif bir menü bulunamadı.
        </h1>
        <p className="mt-3 max-w-[48ch] text-[14.5px] leading-[1.55] text-[#595950]">
          Bağlantıyı kontrol edebilir veya örnek misafir menüsüne dönebilirsiniz.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center border border-[#171714] px-4 py-2 text-[13.5px] font-medium text-[#171714] transition-colors duration-150 hover:border-[#2448D8] hover:text-[#2448D8]"
        >
          Örnek menüye dön
        </Link>
      </div>
    </main>
  );
}
