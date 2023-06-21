import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";
import {
  Stage,
  Lightformer,
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  BakeShadows,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";

export default function Experience() {
  const { color, opacity, blur } = useControls("Contact Shadows", {
    color: "#000000",
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    blur: { value: 10, min: 0, max: 10, step: 0.01 },
  });

  const { sunPosition } = useControls("Sky", {
    sunPosition: { value: [1, 2, 3], step: 1 },
  });
  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("Environment Maps", {
      envMapIntensity: { value: 3.5, min: 0, max: 12, step: 0.01 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 20, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });
  const cube = useRef();
  const directionalLight = useRef();
  //   useHelper(directionalLight, THREE.DirectionalLightHelper, 0.5);
  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      {/* <Environment
        background
        files={[
          "./environmentMaps/3/px.jpg",
          "./environmentMaps/3/nx.jpg",
          "./environmentMaps/3/py.jpg",
          "./environmentMaps/3/ny.jpg",
          "./environmentMaps/3/pz.jpg",
          "./environmentMaps/3/nz.jpg",
        ]}
        ground={{
          height: 7,
          radius: 28,
          scale: 100,
        }}
      /> */}

      {/* <Environment
        background
        files={"./environmentMaps/the_sky_is_on_fire_2k.hdr"}
        
      > */}
      {/* <color args={["black"]} attach="background" />
        <Lightformer
          position-z={-5}
          scale={10}
          color={"cyan"}
          intensity={2}
          form={"ring"}
        /> */}
      {/* <color args={[0, 0, 0]} attach="background" /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[20, 0, 0]} />
        </mesh> */}
      {/* </Environment> */}

      {/* <Sky sunPosition={sunPosition} /> */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={128}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows>
      <SoftShadows
        frustum={3.75}
        size={0.005}
        near={9.5}
        samples={17}
        rings={11}
      /> */}

      {/* <BakeShadows /> */}
      {/* <color attach="background" args={["ivory"]} /> */}
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} /> */}

      {/* <mesh position-x={-2} position-y={1} castShadow>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}

      {/* <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}

      {/* <mesh
        position-y={0}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        // receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}

      <Stage shadows={{ type: "contact", opacity: 0.2, blur: 3 }}>
        <mesh position-x={-2} position-y={1} castShadow>
          <sphereGeometry />
          <meshStandardMaterial
            color="orange"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
        <mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>
    </>
  );
}
