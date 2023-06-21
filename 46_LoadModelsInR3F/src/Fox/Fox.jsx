import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
export default function Fox(props) {
  //   const group = useRef();
  //   const { nodes, materials, animations } = useGLTF("./Fox/glTF-Binary/Fox.glb");
  //   const { actions } = useAnimations(animations, group);
  //   return (
  //     <group ref={group} {...props} dispose={null}>
  //       <group>
  //         <group name="root">
  //           <skinnedMesh
  //             name="fox"
  //             geometry={nodes.fox.geometry}
  //             material={materials.fox_material}
  //             skeleton={nodes.fox.skeleton}
  //           />
  //           <primitive object={nodes._rootJoint} />
  //         </group>
  //       </group>
  //     </group>
  //   );
  const fox = useGLTF("./Fox/glTF-Binary/Fox.glb");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationName } = useControls("Fox Animation", {
    animationName: { options: animations.names },
  });
  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };

    // window.setTimeout(() => {
    //   animations.actions.Walk.play();
    //   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
    // }, 2000);

    // window.setTimeout(() => {
    //   animations.actions.Survey.play();
    //   animations.actions.Survey.crossFadeFrom(animations.actions.Walk, 1);
    // }, 3000);
    console.log(action);
  }, [animationName]);
  return (
    <primitive
      object={fox.scene}
      scale={0.02}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
}

useGLTF.preload("./Fox/glTF-Binary/Fox.glb");
