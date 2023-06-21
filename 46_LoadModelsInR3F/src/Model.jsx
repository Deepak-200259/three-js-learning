// import { Clone, useGLTF } from "@react-three/drei";
import Fox from "./Fox/Fox.jsx";
import HamBurger from "./HamBurger";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
export default function Model() {
  //   const FlightHelmetModel = useLoader(
  //     GLTFLoader,
  //     "/FlightHelmet/glTF/FlightHelmet.gltf",
  //     (loader) => {
  //       const dracoLoader = new DRACOLoader();
  //       dracoLoader.setDecoderPath("./draco/");
  //       loader.setDRACOLoader(dracoLoader);
  //     }
  //   );
  //   const hamBurgerModel = useLoader(GLTFLoader, "/hamburger.glb");

  //   const hamBurgerModel = useGLTF("./hamburger-draco.glb");
  return (
    <>
      {/* <primitive object={FlightHelmetModel.scene} scale={5} position-y={-1} />
      <Clone object={hamBurgerModel.scene} scale={0.35} position-y={0} />
      <Clone object={hamBurgerModel.scene} scale={0.35} position-y={1.9} />
      <Clone object={hamBurgerModel.scene} scale={0.35} position-y={3.8} /> */}

      <HamBurger scale={0.2} position={[2, -1, 0]} />
      <Fox scale={0.03} position={[-2, -1, 0]} />
    </>
  );
}
