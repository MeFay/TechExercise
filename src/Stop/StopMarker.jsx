import PropTypes from "prop-types";
import Marker from "./icons/marker.png";

export function StopMarker({ stop, onClick }) {
  return (
    <div className="marker" onClick={() => onClick(stop)}>
      <img src={Marker} alt="Paragem" />
    </div>
  );
}

StopMarker.propTypes = {
  stop: PropTypes.shape({
    code: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
