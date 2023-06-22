import {
  shaderMaterial,
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

const portalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);
extend({ PortalMaterial: portalMaterial });
export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  console.log(nodes);
  const texture = useTexture("./model/baked.jpg");
  const portalRef = useRef();

  useFrame((state, delta) => {
    portalRef.current.uTime += delta * 2;
  });
  return (
    <>
      <color args={["#030202"]} attach={"background"} />
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={texture} map-flipY={false} />
        </mesh>
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
          scale={nodes.portalLight.scale}
        >
          <portalMaterial ref={portalRef} />
        </mesh>
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.4}
          count={40}
        />
      </Center>
    </>
  );
}
