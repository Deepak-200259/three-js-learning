import { useThree, extend } from "@react-three/fiber";
import { useRef } from "react";
import {
  MeshReflectorMaterial,
  Float,
  Text,
  Html,
  PivotControls,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
export default function Experience() {
  const cube = useRef();
  const sphere = useRef();
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={1}
        axisColors={[0x9381ff, 0xff466d, 0x7ae582]}
        fixed={true}
        scale={100}
      >
        <mesh ref={sphere} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            position={[-2, 1, 0]}
            center
            wrapperClass="label"
            distanceFactor={10}
          >
            This is Sphere
          </Html>
        </mesh>
      </PivotControls>
      <Float speed={5} floatIntensity={5} rotationIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          color={"salmon"}
          position-y={3}
          textAlign="center"
        >
          <meshNormalMaterial />I Love R3F
        </Text>
      </Float>

      <mesh ref={cube} position={[2, -0.5, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
        <Html wrapperClass="label" center position={[1, 1, 0]}>
          This is Box
        </Html>
      </mesh>
      {/* <TransformControls object={cube} mode="rotate" /> */}
      {/* <TransformControls object={cube} mode="scale" /> */}
      <TransformControls object={cube} mode="translate" />
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1024, 1024]}
          mixBlur={1}
          mirror={0.75}
          color={"greenyellow"}
        />
      </mesh>
    </>
  );
}
