import {
  Physics,
  RigidBody,
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Sphere from "./Meshes/Sphere";
import Cube from "./Meshes/Cube";
import HamBurger from "./HamBurger";
export default function Physcis() {
  const rigidCube = useRef();
  const grinder = useRef();

  const [hitSound] = useState(() => new Audio("./hit.mp3"));

  const cubeJump = (event) => {
    const cubeMass = rigidCube.current.mass();
    rigidCube.current.applyImpulse({ x: 0, y: 5 * cubeMass, z: 0 });
    rigidCube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    grinder.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    grinder.current.setNextKinematicTranslation({
      x: Math.sin(angle) * 3,
      y: -0.8,
      z: Math.cos(angle) * 3,
    });
  });

  const meshesCount = 1000;
  // const cubeRef = useRef();
  // useEffect(() => {
  //   for (let i = 0; i < meshesCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(Math.random() * 3, 4, Math.random() * 3),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubeRef.current.setMatrixAt(i, matrix);
  //   }
  // }, []);

  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < meshesCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [0, 0, 0],
      });
    }
    return instances;
  }, []);

  //Collision Detection
  const collisionStarted = () => {
    console.log("Collision Started");
    hitSound.play();
  };
  return (
    <>
      <Physics gravity={[0, -9.81, 0]}>
        <RigidBody colliders="ball" restitution={0} friction={0.7}>
          <Sphere color="yellow" position={[-2, 4, 0]} size={[1, 32, 32]} />
        </RigidBody>

        <RigidBody
          ref={rigidCube}
          friction={0.7}
          restitution={0}
          position={[2, 2, 0]}
          rotation-x={Math.PI / 2}
          colliders={false}
          onCollisionEnter={collisionStarted}
          onCollisionExit={() => console.log("Exit")}
          onSleep={() => console.log("Sleeping")}
          onWake={() => console.log("Waked up")}
        >
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={1} />
          <mesh onClick={cubeJump}>
            <boxGeometry />
            <meshBasicMaterial color={"mediumpurple"} />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={grinder}
          friction={0}
          position={[0, -0.8, 0]}
          rotation={[0, Math.PI / 2, 0]}
          type="kinematicPosition"
        >
          <mesh castShadow>
            <boxGeometry args={[3, 0.5, 0.5]} />
            <meshBasicMaterial color={"#ff0000"} />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 3, 0]}>
          <HamBurger position={[0, -0.6, 0]} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider
            name="Left Collider"
            position={[6, 1.5, 0]}
            args={[5, 3, 1]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <CuboidCollider
            name="Right Collider"
            position={[-6, 1.5, 0]}
            args={[5, 3, 1]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <CuboidCollider
            name="Top Collider"
            position={[0, 1.5, 6]}
            args={[5, 3, 1]}
            rotation={[0, 0, 0]}
          />
          <CuboidCollider
            name="Down Collider"
            position={[0, 1.5, -6]}
            args={[5, 3, 1]}
            rotation={[0, 0, 0]}
          />
        </RigidBody>

        <RigidBody type="fixed">
          <Cube
            position={[0, -1.25, 0]}
            size={[10, 0.5, 10]}
            color="greenyellow"
          />
        </RigidBody>
        <InstancedRigidBodies instances={instances}>
          <instancedMesh castShadow args={[null, null, meshesCount]}>
            <boxGeometry />
            <meshBasicMaterial color={"tomato"} />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
