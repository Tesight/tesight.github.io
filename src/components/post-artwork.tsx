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

export function PostArtwork({ cover }: { cover?: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-background-2">
      <Image
        src={getCoverSrc(cover)}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
