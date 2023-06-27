import { useGLTF } from "@react-three/drei";
export default function Cheese() {
  const { nodes, materials } = useGLTF("./hamburger.glb");
  return (
    <mesh
      name="cheese"
      castShadow
      receiveShadow
      geometry={nodes.cheese.geometry}
      material={materials.CheeseMaterial}
      position={[0, 3, 0]}
    />
  );
}
