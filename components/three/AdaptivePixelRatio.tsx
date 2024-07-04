import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export default function AdaptivePixelRatio() {
  const current = useThree((state) => state.performance.current);
  const setPixelRatio = useThree((state) => state.setDpr);
  useEffect(() => {
    setPixelRatio(window.devicePixelRatio * current);
  }, [current]);
  return null;
}
