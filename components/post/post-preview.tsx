import Avatar from "../avatar";
import DateFormatter from "../date-formatter";
import CoverImage from "../cover-image";
import Tag from "../tag";
import Link from "next/link";
import type Author from "../../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  tags: string[];
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
}: Props) => {
  return (
    <div className="block rounded-lg bg-transparent duration-500 ease-in-out hover:scale-105">
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          width="100%"
          height="150px"
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-semibold">
          <DateFormatter dateString={date} />
        </div>
        <Tag name={tags !== undefined ? tags[0] : ""} />
      </div>
      <h3 className="mb-3 text-2xl font-bold leading-snug md:text-xl">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <p className="mb-4 text-sm leading-relaxed tracking-wider text-gray-600">
        {excerpt}
      </p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
};

export default PostPreview;
