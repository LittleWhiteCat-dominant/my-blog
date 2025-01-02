import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Icons
import { HiOutlineMusicNote, HiOutlineX, HiOutlineMenu } from "react-icons/hi";

// Store
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";
import { m } from "framer-motion";

const MobileNav = ({ navList }) => {
  const router = useRouter();
  // Get store values/functions
  const [soundLevel, toggleSoundControlVisibility] = useStore(
    (store) => [store.soundLevel, store.toggleSoundControlVisibility],
    shallow,
  );

  const mobilNavVisibilityControl = () => {
    // Get the mobile nav element
    const mobileNav = document.querySelector(".mobile-nav-overlay");
    const style = document.createElement("style");
    style.id = "dynamic-style";
    style.innerHTML = `
      .mobile-nav-toggle {
        display: none !important;
      }
    `;
    // Toggle the visibility of the mobile nav
    if (mobileNav.style.display === "none" || mobileNav.style.display === "") {
      mobileNav.style.display = "block";
      document.head.appendChild(style);
    } else {
      mobileNav.style.display = "none";
      const dynamicStyle = document.getElementById("dynamic-style");
      if (dynamicStyle) {
        dynamicStyle.remove();
      }
    }
  };

  return (
    <>
      <button className="mobile-nav-toggle" onClick={mobilNavVisibilityControl}>
        <HiOutlineMenu />
      </button>
      <div
        className="mobile-nav-overlay"
        onClick={(event) => {
          if (event.target.className === "mobile-nav") {
            return;
          }
          mobilNavVisibilityControl();
        }}
      >
        <nav className="mobile-nav">
          <button
            className="mobile-nav-close"
            onClick={mobilNavVisibilityControl}
          >
            <HiOutlineX />
          </button>
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
                  <Link href={navItem.link}>{navItem.title}</Link>
                </button>
              </li>
            ))}
          </ul>

          <div className="divider"></div>
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
    </>
  );
};

export default MobileNav;
