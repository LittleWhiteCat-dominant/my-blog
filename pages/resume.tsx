import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { experiences, skills } from "../components/constants";
import "react-vertical-timeline-component/style.min.css";

import Layout from "../components/layout";
import Navbar from "../components/overlay/navbar";
import Container from "../components/container";
import Link from "next/link";
import Head from "next/head";
import Intro from "../components/intro";

const Resume = () => {
  return (
    <Layout>
      <Navbar />
      <Head>
        <title>My Projects</title>
      </Head>
      <Container>
        <Intro title={"Professional Experience."} />
        <section className="max-container">
          <h1 className="head-text">
            Hello, I'm{" "}
            <span className="blue-gradient_text font-semibold drop-shadow">
              {" "}
              Ian
            </span>{" "}
          </h1>

          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              A Software Engineer currently based in Canada, proficient in a
              variety of programming languages, including Java, JavaScript, and
              Kotlin.
            </p>
            <p>
              My background includes experience in web and mobile development,
              utilizing technologies like ReactJS, ReactNative, NextJS, and
              Android. I am familiar with managing databases such as MySQL and
              MongoDB and use tools like Git, Docker, and Jenkins to support my
              development tasks.
            </p>
            <p>
              I focus on creating reliable applications that enhance user
              satisfaction and streamline operations. I value continuous
              learning and collaboration to keep pace with technological
              advancements and achieve meaningful results.
            </p>
          </div>

          <div className="py-10 flex flex-col">
            <h3 className="subhead-text">My Skills</h3>

            <div className="mt-16 flex flex-wrap gap-12">
              {skills.map((skill) => (
                <div className="block-container w-20 h-20" key={skill.name}>
                  <div className="btn-back rounded-xl" />
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-16">
            <h3 className="subhead-text">Work Experience.</h3>
            <div className="mt-5 flex flex-col gap-3 text-slate-500">
              <p>
                I've worked with all sorts of companies, such as global smartphone company OnePlus, IOT devices and service company Deli Group, leveling up my skills
                and teaming up with smart people. Here's the detailed rundown:
              </p>
            </div>

            <div className="mt-12 flex">
              <VerticalTimeline>
                {experiences.map((experience, index) => (
                  <VerticalTimelineElement
                    key={experience.company_name}
                    date={experience.date}
                    iconStyle={{ background: experience.iconBg }}
                    icon={
                      <div className="flex justify-center items-center w-full h-full">
                        <img
                          src={experience.icon}
                          alt={experience.company_name}
                          className="w-[60%] h-[60%] object-contain"
                        />
                      </div>
                    }
                    contentStyle={{
                      borderBottom: "8px",
                      borderStyle: "solid",
                      borderBottomColor: experience.iconBg,
                      boxShadow: "none",
                    }}
                  >
                    <div>
                      <h3 className="text-black text-xl font-poppins font-semibold">
                        {experience.title}
                      </h3>
                      <p
                        className="text-black-500 font-medium text-base"
                        style={{ margin: 0 }}
                      >
                        {experience.company_name}
                      </p>
                    </div>

                    <ul className="my-5 list-disc ml-5 space-y-2">
                      {experience.points.map((point, index) => (
                        <li
                          key={`experience-point-${index}`}
                          className="text-black-500/50 font-normal pl-1 text-sm"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            </div>
          </div>

          <hr className="border-slate-200" />
        </section>
      </Container>
    </Layout>
  );
};

export default Resume;
