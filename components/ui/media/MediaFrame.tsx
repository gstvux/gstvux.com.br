import Image from "next/image";
import type { CSSProperties } from "react";

type MediaFrameProps = {
  imageSrc: string;
  imageAlt: string;
  frameWidth?: string | number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function MediaFrame({
  imageSrc,
  imageAlt,
  frameWidth = "clamp(16rem, 42vw, 22rem)",
  sizes = "(min-width: 1024px) 22rem, 42vw",
  priority = false,
  className,
}: MediaFrameProps) {
  const style = {
    "--media-frame-width":
      typeof frameWidth === "number" ? `${frameWidth}px` : frameWidth,
  } as CSSProperties;

  return (
    <div
      className={["media-frame", className].filter(Boolean).join(" ")}
      style={style}
    >
      <div className="media-frame__image-layer">
        <div className="media-frame__content-box">
          <Image
            className="media-frame__image"
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            sizes={sizes}
          />
        </div>
      </div>
    </div>
  );
}