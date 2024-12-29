import Layout from "@/components/layout";
import Image from "next/image";
import { construct } from "@/public/assets/images/index";
import Head from "next/head";
import Container from "../components/container";
import Intro from "../components/intro";

const Tool = () => {
  return (
    <Layout>
      <Head>
        <title>Tools</title>
      </Head>
      <Container>
        <Intro title={"Tools"} />
        <div className="flex h-screen flex-col items-center justify-center">
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
