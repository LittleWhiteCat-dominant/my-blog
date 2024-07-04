import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import ColonizationShip from "./colonizationShip";
import Rig from "./Rig";
import LaserBeam from "./LaserBeam";
import SpaceShip from "./SpaceShip";

function Scene({ setOverlayState }) {
  const { gl, camera } = useThree();
  const [spaceShipPosition, setSpaceShipPosition] = useState();
  const [spaceShipScale, setSpaceShipScale] = useState();
  const [laserPosition, setLaserPosition] = useState([0, 0, 0]);

  useEffect(function mount() {
    const { innerWidth } = window;

    const adjustSpaceShipForScreenSize = () => {
      let screenScale, screenPosition;
      if (innerWidth < 768) {
        screenScale = [6.9, 6.9, 6.9];
        screenPosition = [0, -6.5, -43.4];
      } else {
        screenScale = [2, 2, 2];
        screenPosition = [0, -6.5, -43.4];
      }

      return [screenScale, screenPosition];
    };
    const [spaceShipScale, spaceShipPosition] = adjustSpaceShipForScreenSize();
    setSpaceShipPosition(spaceShipPosition);
    setSpaceShipScale(spaceShipScale);
  }, []);

  return (
    <group>
      <Rig>
        <SpaceShip
          position={spaceShipPosition}
          rotation={[0.2, 5, 0]}
          scale={spaceShipScale}
          setLaserPosition={setLaserPosition}
          releaseActive={() => {
            setOverlayState({ active: false });
          }}
          onClick={(e) => {
            console.log("Model was clicked: " + e.x + " " + e.y);
            const vector = new THREE.Vector3(e.point.x, e.point.y, e.point.z);
            vector.project(camera);
            const x = (vector.x * 0.5 + 0.5) * gl.domElement.clientWidth;
            const y =
              -(vector.y * 0.5 - 0.5) * (gl.domElement.clientHeight - 400);
            const distance = vector.distanceTo(camera.position);
            console.log("Distance: " + distance);
            const scale = Math.max(0.5, 1 - distance / 100);
            const opacity = Math.max(0.7, 1 - distance / 100);
            setOverlayState({ x, y, scale, opacity, active: true });
          }}
        />
        <LaserBeam position={laserPosition} scale={3} />
      </Rig>
      <ColonizationShip scale={[2, 2, 2]} />
    </group>
  );
}

export default Scene;
