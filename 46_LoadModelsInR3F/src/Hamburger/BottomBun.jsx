import { useGLTF } from "@react-three/drei";
export default function BottomBun() {
  const { nodes, materials } = useGLTF("./hamburger.glb");
  return (
    <mesh
      name="bottomBun"
      castShadow
      receiveShadow
      geometry={nodes.bottomBun.geometry}
      material={materials.BunMaterial}
    />
  );
}
