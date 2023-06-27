import PropTypes from "prop-types";
export default function Torus(props) {
  return (
    <mesh position={props.position} rotation={props.rotation} castShadow>
      <torusGeometry args={props.size} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  );
}

Torus.prototype = {
  position: PropTypes.array,
  rotation: PropTypes.array,
  size: PropTypes.array,
  color: PropTypes.string,
};

Torus.defaultProps = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  size: [10, 3, 16, 100],
  color: "#ffffff",
};
