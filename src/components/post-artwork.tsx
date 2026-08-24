import Image from "next/image";

const DEFAULT_COVER = "/cover/default.webp";

function getCoverSrc(cover?: string) {
  if (!cover) {
    return DEFAULT_COVER;
  }

  if (cover.startsWith("http://") || cover.startsWith("https://")) {
    return cover;
  }

  if (cover.startsWith("/")) {
    return cover;
  }

  return `/cover/${cover}`;
}

export function PostArtwork({
  cover,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  cover?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-sm bg-background-2 ${className}`}
    >
      <Image
        src={getCoverSrc(cover)}
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
