import { useMatcapTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();
export default function Donuts(index) {
  const [MatcapTexture] = useMatcapTexture("36C8FA_176ACB_24A7EF_1D93EC", 256);
  useEffect(() => {
    MatcapTexture.encoding = THREE.sRGBEncoding;
    MatcapTexture.needsUpdate = true;
    material.matcap = MatcapTexture;
    material.needsUpdate = true;
  }, []);
  return (
    <>
      <mesh
        key={index}
        geometry={torusGeometry}
        material={material}
        position={[
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
        ]}
        scale={0.2 + Math.random() * 0.2}
        rotation={[
          Math.PI * Math.random(),
          Math.PI * Math.random(),
          Math.PI * Math.random(),
        ]}
      />
      {/* <torusGeometry args={[1, 0.6, 16, 32]} />
        <meshMatcapMaterial matcap={MatcapTexture} />
      </mesh> */}
    </>
  );
}
