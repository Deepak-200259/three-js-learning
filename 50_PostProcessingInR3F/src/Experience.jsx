import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Effect from "./Effect";
export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <Effect />
      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        {/* <meshBasicMaterial color={[10, 2, 1]} toneMapped={false} /> */}
        <meshBasicMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        {/* <meshBasicMaterial color={[1.5, 1, 10]} toneMapped={false} /> */}
        {/* <meshStandardMaterial
          color="purple"
          emissive={"orange"}
          emissiveIntensity={4}
          toneMapped={false}
        /> */}
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" roughness={0} metalness={0} />
      </mesh>
    </>
  );
}
