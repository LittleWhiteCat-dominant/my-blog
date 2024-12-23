import PostPreview from "./post-preview";
import type Post from "../../interfaces/post";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <h2 className="mb-8 text-4xl md:text-4xl tracking-tighter leading-tight">
        Recent Posts
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-2 md:gap-x-16 lg:grid-cols-3 lg:gap-x-16 gap-y-8 md:gap-y-10 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
