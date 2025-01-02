import PostPreview from "./post-preview";
import type Post from "../../interfaces/post";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <h2 className="mb-8 text-4xl leading-tight tracking-tighter md:text-4xl">
        Recent Posts
      </h2>
      <div className="mb-32 grid grid-cols-2 gap-x-8 gap-y-8 md:gap-x-16 md:gap-y-10 lg:grid-cols-3">
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
