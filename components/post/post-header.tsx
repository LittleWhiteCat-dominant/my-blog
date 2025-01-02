import Avatar from "../avatar";
import Tag from "../tag";
import DateFormatter from "../date-formatter";
import CoverImage from "../cover-image";
import PostTitle from "./post-title";
import type Author from "../../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  tags: string[];
};

const PostHeader = ({ title, coverImage, date, author, tags }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <section className="flex w-full flex-row place-content-between items-center gap-4 md:mb-4">
        <div className="hidden md:block">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="flex flex-col items-start md:items-end">
          <div className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <DateFormatter dateString={date} />
          </div>
          <div className="grid auto-cols-auto grid-flow-col gap-x-4">
            {tags?.map((tag) => <Tag key={tag} name={tag} />)}
          </div>
        </div>
      </section>
      <div className="border-t-2">
        <div className="mx-auto my-8 w-3/4 md:w-full lg:w-11/12 xl:w-3/4">
          <CoverImage
            title={title}
            src={coverImage}
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
