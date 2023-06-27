import { useGLTF } from "@react-three/drei";
export default function Meat() {
  const { nodes, materials } = useGLTF("./hamburger.glb");
  return (
    <mesh
      name="meat"
      castShadow
      receiveShadow
      geometry={nodes.meat.geometry}
      material={materials.SteakMaterial}
      position={[0, 2.8, 0]}
    />
  );
}
