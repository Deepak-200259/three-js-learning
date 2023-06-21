import { useGLTF } from "@react-three/drei";
export default function TopBun() {
  const { nodes, materials } = useGLTF("./hamburger.glb");
  return (
    <mesh
      name="topBun"
      castShadow
      receiveShadow
      geometry={nodes.topBun.geometry}
      material={materials.BunMaterial}
      position={[0, 1.8, 0]}
    />
  );
}
