import Image from "next/image";

export function PostArtwork() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[4px] bg-background-2">
      <Image
        src="/default-cover.webp"
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
