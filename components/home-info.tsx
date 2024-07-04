import React from "react";
import { arrow } from "../public/assets/icons/index";
import Link from "next/link";

const HomeInfo = ({ currentStage, overlayState }) => {
  console.log("overlayState: ", overlayState);
  const { x, y, scale, opacity, active } = overlayState;
  const style: React.CSSProperties = {
    position: "absolute",
    visibility: `${active ? "visible" : "hidden"}`,
    left: `${x}px`,
    top: `${y}px`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    opacity: opacity,
    transition: "transform 0.1s, opacity 0.1s",
  };

  if (currentStage === 1)
    return (
      <div style={style}>
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
          Hi, I'm
          <span className="font-semibold mx-2 text-white">Ian</span>
          👋
          <br />
          Do you need a ride?
        </h1>
      </div>
    );

  if (currentStage === 2) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Worked with many companies <br /> and picked up many skills along the
          way
        </p>

        <Link href="/about" className="neo-brutalism-white neo-btn">
          Learn more
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className="info-box">
        <p className="font-medium text-center sm:text-xl">
          Led multiple projects to success over the years. <br /> Curious about
          the impact?
        </p>

        <Link href="/projects" className="neo-brutalism-white neo-btn">
          Visit my portfolio
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Need a project done or looking for a dev? <br /> I'm just a few
          keystrokes away
        </p>

        <Link href="/contact" className="neo-brutalism-white neo-btn">
          Let's talk
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
