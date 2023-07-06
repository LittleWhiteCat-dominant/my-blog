import React from "react";
import Link from 'next/link'
import { AnimatePresence } from "framer-motion";

import Navbar from "../../interfaces/navbar";

import {  HiOutlineMusicNote } from "react-icons/hi";

// Mobile Nav
import MobileNav from "./mobile-navbar";

// Sound control
import SoundControl from "./sound-control";

// Store
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";

type Props = {
  navList: Navbar[]
}

const Navbar = ({ navList }: Props) => {
  // Get store values/functions
  const [
    soundLevel,
    soundControlIsVisible,
    toggleSoundControlVisibility,
    activeNav,
    updateActiveNav,
  ] = useStore(
    (store) => [
      store.soundLevel,
      store.soundControlIsVisible,
      store.toggleSoundControlVisibility,
      store.activeNav,
      store.updateActiveNav,
    ],
    shallow
  );

  const handleNavBtnClick = (title) => {
    updateActiveNav(title);
    // 跳转

  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navigation">
          {/* Sections navigation */}
          <ul>
            {navList.map((navItem, index) => (
              <li key={`${index}-navLink`}>
                <button
                  className={`${activeNav === navItem.title && "active"}`}
                  onClick={() =>
                    handleNavBtnClick(navItem.title)
                  }
                >
                  <Link href={navItem.link}>
                    {navItem.title}
                  </Link>
                </button>
              </li>
            ))}
          </ul>

          {/* Theme toggler & Sound Level Control */}
          <ul>
            {/* <li>
              <button aria-label="theme toggler">
                <HiOutlineSun />
              </button>
            </li> */}
            <li>
              <button
                className={`sound_control ${soundLevel == 0 && "no-sound"}`}
                aria-label="sound level control"
                onClick={() =>
                  toggleSoundControlVisibility()
                }
              >
                <HiOutlineMusicNote />
              </button>
            </li>
          </ul>
          {/* Sound Control */}
          <AnimatePresence>
            {soundControlIsVisible && <SoundControl />}
          </AnimatePresence>
        </nav>

        {/* Mobile menu */}
        <MobileNav navList={navList} />
      </div>
    </header>
  );
};

export default Navbar;
