import { projects } from "../components/constants";
import { arrow } from "@/public/assets/icons/index";
import Layout from "../components/layout";
import Container from "../components/container";
import Link from "next/link";
import Head from "next/head";
import Intro from "../components/intro";

export default function Project() {
  return (
    <Layout>
      <Head>
        <title>Ian's Projects</title>
      </Head>
      <Container>
        <Intro title={"Professional Experience."} />
        <section className="mx-auto mb-8 p-10 shadow-lg">
          <p className="mt-2 leading-relaxed text-slate-500">
            In my project work, I've led and contributed to a range of
            initiatives that focus on practical and scalable solutions. I
            developed a mobile application for inkjet printing in collaboration
            with Huawei, which involved leading a team to create a
            cross-platform app supporting LAN and cloud printing. This app now
            serves millions of users. Another key project was the Deli EPlus
            Android application, a platform I established from scratch and
            enhanced over three years to support over 30 million users,
            effectively managing office devices connected to a cloud-based
            system.
          </p>
          <p className="mt-2 leading-relaxed text-slate-500">
            Additionally, I've implemented a web and mini-program for Deli
            Printing aimed at providing a swift and convenient printing
            experience for users. My technical efforts have consistently focused
            on optimizing application performance, improving memory usage,
            speed, power consumption, and user interaction across various
            software solutions. These projects not only strengthened my
            technical skills but also honed my ability to lead teams and manage
            large-scale software developments effectively.
          </p>

          <div className="my-20 flex flex-wrap gap-16">
            {projects.map((project) => (
              <div className="w-full lg:w-[400px]" key={project.name}>
                <div className="block-container h-12 w-12">
                  <div className={`btn-back rounded-xl ${project.theme}`} />
                  <div className="btn-front flex items-center justify-center rounded-xl">
                    <img
                      src={project.iconUrl}
                      alt="threads"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col">
                  <h4 className="font-poppins text-2xl font-semibold">
                    {project.name}
                  </h4>
                  <p className="mt-2 text-slate-500">{project.description}</p>
                  <div className="font-poppins mt-5 flex items-center gap-2">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600"
                    >
                      Link
                    </Link>
                    <img
                      src={arrow}
                      alt="arrow"
                      className="h-4 w-4 object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-slate-200" />
        </section>
      </Container>
    </Layout>
  );
}
