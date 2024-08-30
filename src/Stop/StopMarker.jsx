import PropTypes from "prop-types";

export function StopMarker({ stop, onClick }) {
  const handleClick = () => {
    onClick(stop);
  };

  return <div className="marker" onClick={handleClick}></div>;
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
