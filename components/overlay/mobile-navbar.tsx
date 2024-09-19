import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Icons
import { HiOutlineMusicNote } from "react-icons/hi";

// Store
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";

const MobileNav = ({ navList }) => {
  const router = useRouter();
  // Get store values/functions
  const [soundLevel, toggleSoundControlVisibility] = useStore(
    (store) => [store.soundLevel, store.toggleSoundControlVisibility],
    shallow
  );

  return (
    <div className="mobile-nav-overlay">
      <nav className="mobile-nav">
        {/* Sections navigation */}
        <ul>
          {navList.map((navItem) => (
            <li key={navItem.title}>
              <button
                className={
                  router.pathname === navItem.link ? "active" : "inactive"
                }
                aria-label={navItem.title}
              >
                <Link href={navItem.link}>{navItem.icon}</Link>
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
      </nav>
    </div>
  );
};

export default MobileNav;
