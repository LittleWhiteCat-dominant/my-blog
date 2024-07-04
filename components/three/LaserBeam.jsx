import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LaserBeam({ position, scale }) {
  const meshRef = useRef();

  // 模拟喷射效果
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y += 0.1; // 动态增长长度
      if (meshRef.current.scale.y > 5) {
        meshRef.current.scale.y = scale; // 重置效果
      }
    }
  });

  return (
    <mesh
      position={position}
      scale={[scale, scale, scale]}
      ref={meshRef}
      rotation={new THREE.Euler(-Math.PI / 2, 0, 0)} // 根据需要调整光束方向
    >
      <dodecahedronGeometry args={[0.1, 0]} />
      <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
      <meshBasicMaterial color="lightblue" />
    </mesh>
  );
}
