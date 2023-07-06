import { useEffect } from "react";
import Container from '../components/container'
import MoreStories from '../components/post/more-stories'
import HeroPost from '../components/post/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import { useStore } from "../store/store";
import Navbar from "../components/overlay/navbar";
import {
  HiOutlineUsers,
  HiOutlineDesktopComputer,
  HiOutlineBookOpen,
  HiOutlineChip,
  HiOutlineCollection,
} from "react-icons/hi";

// Nav list
const navigation = [
  { title: "Home", icon: <HiOutlineBookOpen />, link: '/' },
  { title: "Blog", icon: <HiOutlineUsers />, link: '/blog' },
  { title: "Tools", icon: <HiOutlineChip />, link: '/tools' },
  { title: "Portfolio", icon: <HiOutlineDesktopComputer />, link: '/portfolio' },
  { title: "Me", icon: <HiOutlineCollection />, link: '/resume' },
];

type Props = {
  allPosts: Post[]
}

export default function Blog({ allPosts }: Props) {
  const [
    posts,
    setPosts,
    navList,
    updateNavList,
    updateActiveNav
  ] = useStore(
    (store) => [
      store.posts,
      store.setPosts,
      store.navList,
      store.updateNavList,
      store.updateActiveNav
    ],
  );

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  useEffect(function mount() {
    if (posts && posts.length === 0) {
      setPosts(allPosts);
    } else {
      allPosts = posts;
    }
  
    if (navList && navList.length === 0) {
      updateNavList(navigation);
      updateActiveNav('Blog');
    }
  }, []);

  return (
    <>
      <Layout>
        <Navbar navList={ navList } />
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
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
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
