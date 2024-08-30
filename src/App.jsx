import { useEffect, useState } from "react";
import { Map } from "./Map/Map";
import "mapbox-gl/dist/mapbox-gl.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

export function App() {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await axios.get("/api/stops");
        setStops(response.data);
      } catch (error) {
        console.error("Erro ao aceder às paragens de autocarro:", error);
      }
    };

    fetchStops();
  }, []);

  return (
    <div className="App">
      <Map stops={stops} />
    </div>
  );
}
