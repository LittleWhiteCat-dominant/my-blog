/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 SpaceShip.gltf 
Author: yanix (https://sketchfab.com/yanix)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/space-ship-356a3acb00164c698d657146caa5ebf3
Title: space ship
*/
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import useStore from "../../store/threeStore";

export default function SpaceShip(props, { onClick }) {
  const { nodes, materials } = useGLTF("/models/fighter_ship.glb");
  const main = useRef(null);
  const timer = useRef(null);

  const mutation = useStore((state) => state.mutation);
  const [active, setActive] = useState(false);
  const { clock, mouse } = mutation;

  const { scale } = useSpring({
    scale: active ? 2 : 1,
    config: config.wobbly,
  });

  // 确定光束位置
  useFrame(() => {
    if (main.current) {
      const tailPosition = new THREE.Vector3(
        main.current.position.x,
        main.current.position.y + 0.5,
        main.current.position.z + 3
      );
      props.setLaserPosition(tailPosition);
    }
  });

  useEffect(() => {
    timer.current = setTimeout(() => {
      setActive(false);
      props.releaseActive(active);
    }, 3000);
    return () => {
      clearTimeout(timer.current);
    };
  }, [active]);

  const onPointerOver = () => {
    // 设置鼠标悬停时的光标样式
    document.body.style.cursor = "grabbing";
  };

  const onPointerOut = () => {
    // 还原鼠标光标样式
    document.body.style.cursor = "auto";
  };

  useFrame(() => {
    if (main.current) {
      main.current.position.z =
        Math.sin(clock.getElapsedTime() * 40) * Math.PI * 0.05;
      main.current.rotation.z +=
        (mouse.x / 500 - main.current.rotation.z) * 0.2;
      main.current.rotation.x +=
        (-mouse.y / 1200 - main.current.rotation.x) * 0.2;
      main.current.rotation.y +=
        (-mouse.x / 1200 - main.current.rotation.y) * 0.2;
      main.current.position.x +=
        (10 + mouse.x / 10 - main.current.position.x) * 0.2;
      main.current.position.y +=
        (10 + -mouse.y / 10 - main.current.position.y) * 0.2;
    }
  });

  return (
    <group ref={main} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 2.5, -1.5]}>
        <animated.group
          rotation={[-Math.PI / 2, -3.2, 0]}
          scale={scale.to((s) => [s, s, s])}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          onClick={(e) => {
            setActive(!active);
            if (onClick) {
              onClick(e);
            }
          }}
        >
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            material={materials.Northstar_L_chi_bang}
          />
          <mesh
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.Northstar_L_bo_li}
          />
          <mesh
            geometry={nodes.defaultMaterial_2.geometry}
            material={materials.Northstar_L_ji_cang}
          />
          <mesh
            geometry={nodes.defaultMaterial_3.geometry}
            material={materials.Northstar_L_ji_shen}
          />
        </animated.group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/fighter_ship.glb");
