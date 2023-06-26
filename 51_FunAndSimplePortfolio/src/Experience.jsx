import {
  useGLTF,
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  PresentationControls,
  Html,
  Text,
} from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
export default function Experience() {
  const model = useGLTF("./model.gltf");
  const pptRef = useRef();
  const {
    global,
    rotation,
    polar,
    azimuth,
    configMass,
    snapMass,
    configTension,
    snapTension,
  } = useControls("Presentation controls", {
    global: true,
    rotation: {
      value: { x: 0.13, y: 0.1, z: 0 },
      min: -1,
      max: 1,
      step: 0.01,
    },
    polar: { value: [-0.4, 0.2], min: -1, max: 1, step: 0.1 },
    azimuth: { value: [-1, 0.75], min: -1, max: 1, step: 0.01 },
    configMass: { value: 2, min: 0, max: 10, step: 1 },
    snapMass: { value: 4, min: 0, max: 10, step: 1 },
    configTension: { value: 400, min: 0, max: 1000, step: 1 },
    snapTension: { value: 400, min: 0, max: 1000, step: 1 },
  });
  return (
    <>
      <Environment preset="city" />
      <color args={["#241a1a"]} attach={"background"} />
      {/* <OrbitControls makeDefault /> */}
      <PresentationControls
        ref={pptRef}
        global={global}
        rotation={[rotation.x, rotation.y, rotation.z]}
        polar={polar}
        azimuth={azimuth}
        config={{ mass: configMass, tension: configTension }}
        snap={{ mass: snapMass, tension: snapTension }}
      >
        <Float rotationIntensity={0.4}>
          <Text
            font="./bangers-v20-latin-regular.woff"
            rotation-y={-1.25}
            position={[2, 0.75, 0.76]}
            children={"Bruno\nSimon"}
            textAlign="center"
          />
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#ff6900"}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={model.scene} position={[0, -1.2, 0]}>
            <Html
              transform
              position={[0, 1.56, -1.4]}
              rotation-x={(-Math.PI / 360) * 30}
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
            >
              <iframe src="https://bruno-simon.com/html/" />
            </Html>
          </primitive>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
