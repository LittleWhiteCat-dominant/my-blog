import Layout from "@/components/layout";
import Image from "next/image";
import { construct } from "@/public/assets/images/index";
import Head from "next/head";
import Navbar from "../components/overlay/navbar";
import Container from "../components/container";
import Intro from "../components/intro";

const Tool = () => {
  return (
    <Layout>
      <Navbar />
      <Head>
        <title>Tools</title>
      </Head>
      <Container>
        <Intro title={"Tools"} />
        <div className="flex flex-col items-center justify-center h-screen">
          <Image
            src={construct}
            alt="under construction"
            width={800}
            height={430}
            priority={true}
          />
        </div>
      </Container>
    </Layout>
  );
};

export default Tool;
