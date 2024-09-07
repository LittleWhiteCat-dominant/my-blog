import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
  width?: string;
  height?: string;
};

const CoverImage = ({ title, src, width, height, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm rounded-lg opacity-80", {
        "ease-in-out hover:scale-105 hover:opacity-100 hover:shadow-lg transition-shadow duration-700":
          slug,
      })}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width, height }}
      priority={true}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
