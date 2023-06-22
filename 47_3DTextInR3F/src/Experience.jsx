import {
  useMatcapTexture,
  Text3D,
  OrbitControls,
  Center,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import Donuts from "./Donuts";
import { Group } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Experience() {
  const donutsGroup = useRef();
  useFrame((state, delta) => {
    for (const donut of donutsGroup.current.children) donut.rotation.y += delta;
  });
  const [MatcapTexture] = useMatcapTexture("3F3D52_CCCED9_AFB0C6_8D8CAC", 256);
  const fontSettings = useControls("Font Settings", {
    fontSize: { value: 0.75, min: 0, max: 10, step: 0.01 },
    fontHeight: { value: 0.2, min: 0, max: 5, step: 0.01 },
    letterSpacing: { value: 0.05, min: 0, max: 1, step: 0.01 },
    lineHeight: { value: 3, min: 1, max: 10, step: 0.01 },
    curveSegments: { value: 12, min: 0, max: 20, step: 1 },
    bevelEnabled: true,
    bevelThickness: { value: 0.02, min: 0, max: 5, step: 0.01 },
    bevelSize: { value: 0.02, min: 0, max: 5, step: 0.01 },
    bevelOffset: { value: 0, min: 0, max: 10, step: 0.1 },
    bevelSegments: { value: 5, min: 0, max: 10, step: 1 },
  });
  const donutsCount = 500;
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font={"./fonts/helvetiker_regular.typeface.json"}
          size={fontSettings.fontSize}
          height={fontSettings.fontHeight}
          letterSpacing={fontSettings.letterSpacing}
          // lineHeight={letterSpacing}
          curveSegments={fontSettings.curveSegments}
          bevelEnabled={fontSettings.bevelEnabled}
          bevelThickness={fontSettings.bevelThickness}
          bevelSize={fontSettings.bevelSize}
          bevelOffset={fontSettings.bevelOffset}
          bevelSegments={fontSettings.bevelSegments}
        >
          Hello R3F
          <meshMatcapMaterial matcap={MatcapTexture} />
        </Text3D>
      </Center>
      <group ref={donutsGroup}>
        {[...Array(donutsCount)].map((value, index) => Donuts(index))}
      </group>
    </>
  );
}
