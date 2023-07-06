import React, { Suspense, useEffect, useRef } from 'react';
import { useGLTF, useAnimations, Stage, PresentationControls } from '@react-three/drei';

const Model = (props) => {
  const group = useRef();
  const { scene, animations } = useGLTF(props.url, '/draco/gltf/');
  const { actions } = useAnimations(animations, scene);

  // for(let key in actions["Take 001"]) {
  //   console.log('key:' + key)
  // }
  useEffect(() => {
    actions["Take 001"].play();
    // scene.traverse((obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true))
  }, [actions, scene])

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  )
}

const GLTFSuspense = (props) => {
  useGLTF.preload(props.url)
  return (
    <Suspense fallback={null}>
      <PresentationControls
        enabled={true} // the controls can be disabled by setting this to false
        global={false} // Spin globally or by dragging the model
        cursor={true} // Whether to toggle cursor style on drag
        snap={false} // Snap-back to center (can also be a spring config)
        speed={1} // Speed factor
        zoom={1} // Zoom factor when half the polar-max is reached
        rotation={[0, 0, 0]} // Default rotation
        polar={[0, Math.PI / 2]} // Vertical limits
        azimuth={[-Infinity, Infinity]} // Horizontal limits
        config={{ mass: 1, tension: 170, friction: 26 }}>
        <Stage shadows={'contact'}>
          <Model {...props} />
        </Stage>
      </PresentationControls>
    </Suspense>
  );
};

export default GLTFSuspense;