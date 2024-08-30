import { useState, useCallback } from "react";
import { StopArrivals } from "../Stop/StopArrivals";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import PropTypes from "prop-types";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import { StopMarker } from "../Stop/StopMarker";

const MAPBOX_TOKEN =
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
    width: "100%",
    height: "100%",
  });

  const handleMove = useCallback((event) => {
    setViewport(event.viewState);
  }, []);

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={handleMove}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {stops.map((stop) => (
          <Marker
            key={stop.code}
            latitude={stop.latitude}
            longitude={stop.longitude}
          >
            <StopMarker stop={stop} onClick={handleMarker} />
          </Marker>
        ))}

        {selectedStop && (
          <Popup
            latitude={selectedStop.latitude}
            longitude={selectedStop.longitude}
            onClose={() => setSelectedStop(null)}
            className="popup-content"
          >
            <div>
              <h3>{selectedStop.name}</h3>
              <StopArrivals stopCode={selectedStop.code} />
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
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
