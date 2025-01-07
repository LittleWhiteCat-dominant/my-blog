import React, { use, useEffect } from "react";
// Animation
import { motion } from "framer-motion";
// Store
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";

const index = React.memo(() => {
  // Get store values/functions
  const [
    soundLevel,
    updateSoundLevel,
    soundControlIsVisible,
    toggleSoundControlVisibility,
  ] = useStore(
    (store) => [
      store.soundLevel,
      store.updateSoundLevel,
      store.soundControlIsVisible,
      store.toggleSoundControlVisibility,
    ],
    shallow,
  );

  const lastChange = React.useRef(Date.now());

  const overlayVariants = {
    hidden: {
      y: -24,
      opacity: 0,
    },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
    exit: {
      y: -24,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  useEffect(() => {
    if (soundControlIsVisible) {
      const timeout = setTimeout(() => {
        if (Date.now() - lastChange.current > 5000) {
          toggleSoundControlVisibility();
        }
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [soundControlIsVisible, lastChange.current]);

  return (
    <motion.div
      variants={overlayVariants}
      key="control"
      initial="hidden"
      animate="show"
      exit="exit"
      className="control"
    >
      <input
        type="range"
        min="0"
        max="10"
        value={soundLevel}
        step="1"
        onChange={(e) => {
          updateSoundLevel(Number(e.target.value));
          lastChange.current = Date.now();
        }}
      />
    </motion.div>
  );
});

export default index;
