import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

// Icons
import { HiOutlineMusicNote, HiOutlineX, HiOutlineMenu } from "react-icons/hi";

// Store
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";

const MobileNav = ({ navList }) => {
  const router = useRouter();
  // Get store values/functions
  const [soundLevel, toggleSoundControlVisibility] = useStore(
    (store) => [store.soundLevel, store.toggleSoundControlVisibility],
    shallow,
  );

  const [isVisible, setIsVisible] = useState(false);

  const animatingRef = useRef(false);

  useEffect(() => {
    const mobileNav = document.querySelector(".mobile-nav-overlay");

    if (!mobileNav || animatingRef.current) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          if (mobileNav.style.display === "block" && !animatingRef.current) {
            setIsVisible(true);
          }
        }
      });
    });

    observer.observe(mobileNav, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
    exit: {
      opacity: 0,
      x: "-100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.5,
      },
    },
  };

  const mobilNavVisibilityControl = () => {
    // Get the mobile nav element
    const mobileNav = document.querySelector(".mobile-nav-overlay");
    if (!mobileNav) {
      return;
    }

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
      animatingRef.current = true;
      setIsVisible(false);

      setTimeout(() => {
        mobileNav.style.display = "none";
        const dynamicStyle = document.getElementById("dynamic-style");
        if (dynamicStyle) {
          dynamicStyle.remove();
        }
        animatingRef.current = false;
      }, 500);
    }
  };

  return (
    <>
      <button className="mobile-nav-toggle" onClick={mobilNavVisibilityControl}>
        <HiOutlineMenu />
      </button>
      <motion.div
        key="mobile-nav-overlay"
        className="mobile-nav-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "exit"}
        onClick={(event) => {
          if (event.target.className === "mobile-nav-overlay") {
            mobilNavVisibilityControl();
          }
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
                  onClick={mobilNavVisibilityControl}
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
      </motion.div>
    </>
  );
};

export default MobileNav;
