import React from "react";
import Link from 'next/link'

// Icons
import { HiOutlineMusicNote } from "react-icons/hi";

// Store
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";

const MobileNav = ( { navList }) => {
  // Get store values/functions
  const [
    soundLevel,
    toggleSoundControlVisibility,
    activeNav,
    updateActiveNav,
  ] = useStore(
    (store) => [
      store.soundLevel,
      store.toggleSoundControlVisibility,
      store.activeNav,
      store.updateActiveNav,
    ],
    shallow
  );

  const handleNavBtnClick = (title, position) => {
    updateActiveNav(title);
    // todo
  };

  return (
    <div className="mobile-nav-overlay">
      <nav className="mobile-nav">
        {/* Sections navigation */}
        <ul>
          {navList.map((navItem, index) => (
            <li key={`${index}-mobileNavLink`}>
              <button
                className={`${activeNav === navItem.title && "active"}`}
                onClick={() =>
                  handleNavBtnClick(navItem.title, navItem.position)
                }
                aria-label={navItem.title}
              >
                <Link href={navItem.link}>
                  {navItem.icon}
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
      </nav>
    </div>
  );
};

export default MobileNav;
