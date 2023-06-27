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
      <TopBun scale={props.scale} />
      <Cheese scale={props.scale} />
      <Meat scale={props.scale} />
      <BottomBun scale={props.scale} />
    </group>
  );
}

useGLTF.preload("/hamburger.glb");
