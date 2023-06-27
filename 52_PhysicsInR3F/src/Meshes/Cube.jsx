import PropTypes from "prop-types";
export default function Cube(props) {
  return (
    <mesh
      position={props.position}
      rotation={props.rotation}
      castShadow
      receiveShadow
    >
      <boxGeometry args={props.size} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  );
}

Cube.prototype = {
  position: PropTypes.array,
  rotation: PropTypes.array,
  size: PropTypes.array,
  color: PropTypes.string,
};

Cube.defaultProps = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  size: [1, 1, 1],
  color: "#ffffff",
};
