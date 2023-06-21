import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import Cheese from "./Hamburger/Cheese";
import BottomBun from "./Hamburger/BottomBun";
import TopBun from "./Hamburger/TopBun";
import Meat from "./Hamburger/Meat";
export default function HamBurger(props) {
  const { nodes, materials } = useGLTF("./hamburger.glb");
  return (
    <group {...props} dispose={null}>
      <TopBun />
      <Cheese />
      <Meat />
      <BottomBun />
    </group>
  );
}

useGLTF.preload("/hamburger.glb");
