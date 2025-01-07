import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function DynamicIntro() {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.set(".head-text", { x: 0, opacity: 1, scale: 1 }).from(
        ".head-text",
        // {
        //   scale: 3,
        //   stagger: 1,
        // },
        {
          scale: 3,
          opacity: 0,
          ease: "power4.inOut",
          delay: 0.3,
          stagger: 1,
        },
      );
    },
    { scope: container },
  );
  return (
    <div ref={container} className="intro-text">
      <h1 className="head-text text-2xl">
        Hello, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Ian
        </span>
      </h1>
    </div>
  );
}
