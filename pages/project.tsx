import { projects } from "../components/constants";
import Layout from "../components/layout";
import Navbar from "../components/overlay/navbar";
import Container from "../components/container";
import Link from "next/link";
import Head from "next/head";
import Intro from "../components/intro";

export default function Project() {
  return (
    <Layout>
      <Navbar />
      <Head>
        <title>My Projects</title>
      </Head>
      <Container>
        <Intro title={"Professional Experience."} />
        <section className="p-10 mb-8 shadow-lg mx-auto">
          <p className="text-slate-500 mt-2 leading-relaxed">
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
          <p className="text-slate-500 mt-2 leading-relaxed">
            Additionally, I've implemented a web and mini-program for Deli
            Printing aimed at providing a swift and convenient printing
            experience for users. My technical efforts have consistently focused
            on optimizing application performance, improving memory usage,
            speed, power consumption, and user interaction across various
            software solutions. These projects not only strengthened my
            technical skills but also honed my ability to lead teams and manage
            large-scale software developments effectively.
          </p>

          <div className="flex flex-wrap my-20 gap-16">
            {projects.map((project) => (
              <div className="lg:w-[400px] w-full" key={project.name}>
                <div className="block-container w-12 h-12">
                  <div className={`btn-back rounded-xl ${project.theme}`} />
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img
                      src={project.iconUrl}
                      alt="threads"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col">
                  <h4 className="text-2xl font-poppins font-semibold">
                    {project.name}
                  </h4>
                  <p className="mt-2 text-slate-500">{project.description}</p>
                  <div className="mt-5 flex items-center gap-2 font-poppins">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600"
                    >
                      Link
                    </Link>
                    <img
                      src="/assets/icons/arrow.svg"
                      alt="arrow"
                      className="w-4 h-4 object-contain"
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
