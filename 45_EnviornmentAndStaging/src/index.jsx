import "./style.css";
import * as THREE from "three";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";

const root = ReactDOM.createRoot(document.querySelector("#root"));
// const created = ({ scene, gl }) => {
//   console.log(gl);
//   state.gl.setClearColor("#ff0000");
//   console.log(scene);
//   state.scene.background = new THREE.Color(0xff0000);
// };
root.render(
  <>
    <Leva collapsed />
    <Canvas
      shadows={false}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      // onCreated={created}
    >
      <Experience />
    </Canvas>
  </>
);
