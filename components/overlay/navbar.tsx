import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
// Store
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";

// Mobile Nav
import MobileNav from "./mobile-navbar";

// Sound control
import SoundControl from "./sound-control";

import {
  HiOutlineUsers,
  HiOutlineDesktopComputer,
  HiOutlineBookOpen,
  HiOutlineChip,
  HiOutlineCollection,
  HiOutlineMusicNote,
} from "react-icons/hi";

const navigation = [
  { title: "Home", icon: <HiOutlineBookOpen />, link: "/" },
  { title: "Blog", icon: <HiOutlineUsers />, link: "/blog" },
  // { title: "Tools", icon: <HiOutlineChip />, link: "/tools" },
  {
    title: "Project",
    icon: <HiOutlineDesktopComputer />,
    link: "/project",
  },
  { title: "Me", icon: <HiOutlineCollection />, link: "/resume" },
];

const Navbar = () => {
  // Get store values/functions
  const [soundLevel, soundControlIsVisible, toggleSoundControlVisibility] =
    useStore(
      (store) => [
        store.soundLevel,
        store.soundControlIsVisible,
        store.toggleSoundControlVisibility,
      ],
      shallow
    );

  const router = useRouter();

  return (
    <header className="header">
      <div className="container">
        <nav className="navigation">
          {/* Sections navigation */}
          <ul>
            {navigation.map((navItem) => (
              <li key={navItem.title}>
                <button
                  className={
                    router.pathname === navItem.link ? "active" : "inactive"
                  }
                >
                  <Link href={navItem.link}>{navItem.title}</Link>
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
                onClick={() => toggleSoundControlVisibility()}
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
        <MobileNav navList={navigation} />
      </div>
    </header>
  );
};

export default Navbar;
