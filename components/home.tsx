import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerformanceMonitor,
} from "@react-three/drei";
import { LoadingProvider } from "@/hooks/LoadingContext";
import useStore from "../store/threeStore";
import MilkySky from "../components/three/MilkySky";
import Loader from "./loader";
import Scene from "./three/Scene";
import HomeInfo from "./home-info";
import * as THREE from "three";
import { Globals } from "@react-spring/shared";
import round from "lodash/round";

// Globals.assign({
//   frameLoop: "demand",
// });

type Win = {
  innerWidth: number;
  innerHeight: number;
};

export default function Home() {
  const { fov } = useStore((state) => state.mutation);
  const actions = useStore((state) => state.actions);
  const [currentInfo, setCurrentInfo] = useState(1);
  const [dpr, setDpr] = useState(1.5);
  const [windowSize, setWindowSize] = useState<Win>({
    innerWidth: 0,
    innerHeight: 0,
  });
  const [overlayState, setOverlayState] = useState({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  });

  useEffect(function mount() {
    const { innerWidth, innerHeight } = window;
    setWindowSize({ innerWidth, innerHeight });
  }, []);

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentInfo && (
          <HomeInfo currentStage={currentInfo} overlayState={overlayState} />
        )}
      </div>
      <LoadingProvider>
        <Loader />
        <Canvas
          className={"w-full h-screen bg-transparent"}
          dpr={dpr}
          camera={{ near: 0.01, far: 1000 }}
          gl={{ antialias: false }}
          onCreated={({ gl, camera }) => {
            actions.init(camera);
            gl.toneMapping = THREE.LinearToneMapping;
            gl.setClearColor(new THREE.Color("#020209"));
          }}
        >
          <PerformanceMonitor
            onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))}
          >
            <Suspense fallback={null}>
              <fog attach="fog" args={["#070710", 100, 700]} />
              <ambientLight intensity={0.25} />
              <OrbitControls enableZoom={false} enableRotate={false} />
              <MilkySky modelId={"sky"} />
              <Scene setOverlayState={setOverlayState} />
              <Environment preset="sunset" />
            </Suspense>
          </PerformanceMonitor>
        </Canvas>
      </LoadingProvider>
    </section>
  );
}
