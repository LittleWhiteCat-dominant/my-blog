import { lazy, useState, useEffect } from "react";
import Container from "../components/container";
import Layout from "../components/layout";
import Post from "../interfaces/post";
import Navbar from "../components/overlay/navbar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Sky, Cloud } from "@react-three/drei";
import * as THREE from "three";
import { shallow } from "zustand/shallow";
import { useStore } from "../store/store";

import {
  HiOutlineUsers,
  HiOutlineDesktopComputer,
  HiOutlineBookOpen,
  HiOutlineChip,
  HiOutlineCollection,
} from "react-icons/hi";

// Nav list
const navigation = [
  { title: "Home", icon: <HiOutlineBookOpen />, link: '/' },
  { title: "Blog", icon: <HiOutlineUsers />, link: '/blog' },
  { title: "Tools", icon: <HiOutlineChip />, link: '/tools' },
  { title: "Portfolio", icon: <HiOutlineDesktopComputer />, link: '/portfolio' },
  { title: "Me", icon: <HiOutlineCollection />, link: '/resume' },
];

const GLTFSuspense = lazy(() => import("../components/three/model"));

type Props = {
  allPosts: Post[];
};

type Win = {
  innerWidth: number;
  innerHeight: number;
};

export default function Index() {
  const [windowSize, setWindowSize] = useState<Win>({
    innerWidth: 0,
    innerHeight: 0,
  });

  const [
    navList,
    updateNavList,
    updateActiveNav
  ] = useStore(
    (store) => [
      store.navList,
      store.updateNavList,
      store.updateActiveNav
    ],
    shallow
  );

  useEffect(function mount() {
    const { innerWidth, innerHeight } = window;
    setWindowSize({ innerWidth, innerHeight });
    updateNavList(navigation);
    updateActiveNav('Home');
  }, []);

  return (
    <>
      <Layout isAlert={false}>
        <Container>
          <Canvas
            scene={{
              background: new THREE.Color(0xbfe3dd),
            }}
            camera={{
              position: [5, 2, 8],
              aspect: windowSize.innerWidth / windowSize.innerHeight,
              fov: 40,
              near: 1,
              far: 100
            }}
            gl={{
              antialias: true,
            }}
            onCreated={({ gl }) => {
              gl.setPixelRatio(window.devicePixelRatio);
              gl.setSize(window.innerWidth, window.innerHeight);
            }}
          >
            <hemisphereLight intensity={0.45} />
            <spotLight
              angle={0.4}
              penumbra={1}
              position={[20, 30, 2.5]}
              castShadow
              shadow-bias={-0.00001}
            />
            <directionalLight
              color="red"
              position={[-10, -10, 0]}
              intensity={1.5}
            />
            <Cloud scale={1.5} position={[20, 0, 0]} />
            <Cloud scale={1} position={[-20, 10, 0]} />
            <Environment preset="sunset" />
            <Sky />
            <GLTFSuspense url={"/model/LittlestTokyo.glb"} />
          </Canvas>
          <Navbar navList={ navList } />
        </Container>
      </Layout>
    </>
  );
}
