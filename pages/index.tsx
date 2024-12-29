import { useState, useEffect } from "react";
import Head from "next/head";

import Home from "@/components/home";

type Win = {
  innerWidth: number;
  innerHeight: number;
};

export default function Index() {
  const [windowSize, setWindowSize] = useState<Win>({
    innerWidth: 0,
    innerHeight: 0,
  });

  useEffect(function mount() {
    const { innerWidth, innerHeight } = window;
    setWindowSize({ innerWidth, innerHeight });
  }, []);

  return (
    <>
      <main>
        <Head>
          <title>Ian's Portfolio</title>
        </Head>
        <Home />
      </main>
    </>
  );
}
