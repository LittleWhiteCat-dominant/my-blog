import { useEffect } from "react";
import Container from "../components/container";
import MoreStories from "../components/post/more-stories";
import HeroPost from "../components/post/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";
import { useStore } from "../store/store";
import Navbar from "../components/overlay/navbar";

type Props = {
  allPosts: Post[];
};

export default function Blog({ allPosts }: Props) {
  const [posts, setPosts] = useStore((store) => [store.posts, store.setPosts]);

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  useEffect(function mount() {
    if (posts && posts.length === 0) {
      setPosts(allPosts);
    } else {
      allPosts = posts;
    }
  }, []);

  return (
    <>
      <Layout>
        <Navbar />
        <Head>
          <title>Ian's Blog</title>
        </Head>
        <Container>
          <Intro title={"Blog."} />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tags",
  ]);

  return {
    props: { allPosts },
  };
};
