import PropTypes from "prop-types";
export default function Sphere(props) {
  return (
    <mesh position={props.position} rotation={props.rotation} castShadow>
      <sphereGeometry args={props.size} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  );
}

Sphere.prototype = {
  position: PropTypes.array,
  rotation: PropTypes.array,
  size: PropTypes.array,
  color: PropTypes.string,
};

Sphere.defaultProps = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  size: [1, 32, 16],
  color: "#ffffff",
};
