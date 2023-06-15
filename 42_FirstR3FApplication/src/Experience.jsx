import { extend, useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CustomObject from "./CustomObject.jsx";
extend({ OrbitControls: OrbitControls });

export default function Experience() {
  const { camera, gl, clock } = useThree();
  console.log(camera, gl);
  const groupRef = useRef();
  const cubeRef = useRef();
  const sphereRef = useRef();
  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    cubeRef.current.rotation.y += delta;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <ambientLight intensity={0.3} />
      <directionalLight position-z={1} intensity={1} color={"white"} />
      <group ref={groupRef}>
        <mesh ref={sphereRef} position={[-2, 0.3, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh ref={cubeRef} position-x={2} rotation-y={Math.PI * 0.25}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color="yellowgreen" />
      </mesh>
      <CustomObject />
    </>
  );
}
