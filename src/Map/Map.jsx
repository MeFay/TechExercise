import { useState, useCallback } from "react";
import { StopArrivals } from "../Stop/StopArrivals";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import PropTypes from "prop-types";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

const TOKEN_MAPBOX =
  "pk.eyJ1IjoidGhpYWdvc29icmFsIiwiYSI6ImNseTF3Y3Y1djB6MW8yaXI2Z255bjk1Y2oifQ.CvNetOTQhag4--2DUS8_Pg";

export function Map({ stops }) {
  const [selectedStop, setSelectedStop] = useState(null);

  const handleMarker = useCallback((stop) => {
    setSelectedStop(stop);
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 41.1579,
    longitude: -8.6291,
    zoom: 12,
    width: "100vw",
    height: "100vh",
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={TOKEN_MAPBOX}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {stops.map((stop) => (
        <Marker
          key={stop.code}
          latitude={stop.latitude}
          longitude={stop.longitude}
        >
          <div onClick={() => handleMarker(stop)}>
            <img src="marker-icon.png" alt="Paragem autocarro" />
          </div>
        </Marker>
      ))}

      {selectedStop && (
        <Popup
          latitude={selectedStop.latitude}
          longitude={selectedStop.longitude}
          onClose={() => setSelectedStop(null)}
        >
          <div>
            <h3>{selectedStop.name}</h3>
            <StopArrivals stopCode={selectedStop.code} />
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

Map.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
