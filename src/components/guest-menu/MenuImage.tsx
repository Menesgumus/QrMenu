import type { CSSProperties } from "react";
import { resolveMenuImageSource, type MenuImagePreset } from "@/lib/menu-images";

interface MenuImageProps {
  src: string;
  alt: string;
  preset: MenuImagePreset;
  sizes: string;
  fill?: boolean;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders a pre-generated responsive WebP <img> backed by verified content-hashed URLs.
 * Uses native `srcSet` + `sizes` (never bypassed by Next's `unoptimized`) and reserves
 * container/element geometry so CLS stays 0.
 */
export function MenuImage({
  src,
  alt,
  preset,
  sizes,
  fill = false,
  width,
  height,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
  className,
  style,
}: MenuImageProps) {
  const resolved = resolveMenuImageSource(src, preset);

  const combinedClassName = fill
    ? ["absolute inset-0 h-full w-full", className].filter(Boolean).join(" ")
    : className;

  const imgWidth = width ?? resolved.width;
  const imgHeight = height ?? resolved.height;

  // React 19 Fizz hoists <link rel="preload" as="image"> into <head> before <link rel="stylesheet">
  // for non-lazy <img> elements unless wrapped in <picture>. Reserve head preloads strictly
  // for explicit `fetchPriority="high"` LCP images so eager visible siblings don't starve CSS.
  const imgElement = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved.src}
      srcSet={resolved.srcSet}
      sizes={sizes}
      alt={alt}
      width={fill ? undefined : imgWidth}
      height={fill ? undefined : imgHeight}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      className={combinedClassName}
      style={style}
    />
  );

  if (loading === "eager" && fetchPriority !== "high") {
    return <picture className="contents">{imgElement}</picture>;
  }

  return imgElement;
}
