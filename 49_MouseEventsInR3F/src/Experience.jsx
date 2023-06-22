import { useFrame } from "@react-three/fiber";
import { OrbitControls, meshBounds, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const hamburger = useGLTF("./hamburger.glb");
  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });
  const eventHandler = (event) => {
    // console.log("---");
    // console.log("distance", event.distance); // Distance between camera and hit point
    // console.log("point", event.point); // Hit point coordinates (in 3D)
    // console.log("uv", event.uv); // UV coordinates on the geometry (in 2D)
    // console.log("object", event.object); // The object that triggered the event
    // console.log("eventObject", event.eventObject); // The object that was listening to the event (useful where there is objects in objects)

    // console.log("---");
    // console.log("x", event.x); // 2D screen coordinates of the pointer
    // console.log("y", event.y); // 2D screen coordinates of the pointer

    // console.log("---");
    // console.log("shiftKey", event.shiftKey); // If the SHIFT key was pressed
    // console.log("ctrlKey", event.ctrlKey); // If the CTRL key was pressed
    // console.log("metaKey", event.metaKey); // If the COMMAND key was pressed

    event.object.material.color.set(`hsl(${Math.random() * 360},100%,75%)`);
  };
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        onClick={(event) => {
          event.stopPropagation();
        }}
        position-x={-2}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        raycast={meshBounds}
        // onPointerEnter={(event) => {
        //   document.body.style.cursor = "pointer";
        // }}
        // onPointerLeave={(event) => {
        //   document.body.style.cursor = "default";
        // }}
        onClick={eventHandler}
        ref={cube}
        position-x={2}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        // onPointerMissed={eventHandler}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        onClick={(event) => {
          event.stopPropagation();
          console.log("Clicked");
        }}
        scale={0.35}
        position={[0, -1, -3]}
      />
    </>
  );
}
