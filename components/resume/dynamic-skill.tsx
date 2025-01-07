"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DynamicSkill = () => {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".skill-row",
          start: "top center",
          end: "bottom center",
          scrub: 4,
        },
      });

      tl.set(".skill-row", { scale: 1 }).fromTo(
        ".skill-row",
        {
          scale: 1,
          stagger: 0.5,
        },
        {
          scale: 2,
          opacity: 1,
          ease: "power4.inOut",
          delay: 0.3,
          stagger: 0.5,
        },
        "<0.1",
      );
    },
    { scope: container },
  );

  return (
    <div ref={container} className="flex flex-col py-10">
      <h3 className="subhead-text">My Skills</h3>
      <div className="relative mt-16 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="skill-row block-container h-20 w-20"
            style={{
              position: "relative",
              zIndex: 10 + index,
              margin: 0,
            }}
            aria-label={skill.name || ""}
          >
            <div className="btn-back rounded-xl" />
            <div className="btn-front flex items-center justify-center rounded-xl">
              <img
                src={skill.imageUrl}
                alt={skill.name}
                className="skill-row-image h-1/2 w-1/2 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicSkill;
