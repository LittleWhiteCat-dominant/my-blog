import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, AdditiveBlending } from "three";
import * as THREE from "three";

function Flame({ position, scale }) {
  const texture = useLoader(TextureLoader, "/assets/images/blue_fire.png"); // 确保这是适当的火焰纹理
  const pointsRef = useRef();

  const { positions, count } = useMemo(() => {
    const positions = [];
    const count = 500;
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;
      positions.push(x, y, z);
    }
    return { positions, count };
  }, []);

  useFrame(() => {
    if (
      pointsRef.current &&
      pointsRef.current.geometry &&
      pointsRef.current.geometry.attributes.position
    ) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count * 3; i += 3) {
        positions[i + 1] += 0.02; // 粒子上升
        if (positions[i + 1] > 1) {
          // 当粒子上升超过一定高度，重置位置
          positions[i + 1] = Math.random() * 2 - 1;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true; // 更新位置
    }
  });

  return (
    <points
      ref={pointsRef}
      position={position}
      scale={[scale, scale, scale]}
      rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
    >
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={count}
          array={new Float32Array(positions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        map={texture}
        size={0.1}
        blending={AdditiveBlending}
        depthWrite={false}
        transparent={false}
        opacity={1}
        color="lightblue"
      />
    </points>
  );
}

export default Flame;
