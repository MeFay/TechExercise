import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export function StopArrivals({ stopCode }) {
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const response = await axios.get(`/api/arrivals/${stopCode}`);
        setArrivals(response.data);
      } catch (error) {
        console.error("Erro ao aceder aos horários de paragens:", error);
      }
    };

    fetchArrivals();
  }, [stopCode]);

  const getTimeColor = (minutes) => {
    if (minutes <= 3) return "red";
    if (minutes > 3 && minutes <= 5) return "orange";
    return "black";
  };

  return (
    <div>
      <h4>Próximas Passagens:</h4>
      <ul>
        {arrivals.map((arrival, index) => {
          const now = new Date();
          const currentMinutes = now.getHours() * 60 + now.getMinutes();
          const minutesDiff = arrival.time - currentMinutes;

          if (minutesDiff >= 0 && minutesDiff <= 60) {
            return (
              <li key={index} style={{ color: getTimeColor(minutesDiff) }}>
                {arrival.lineName} - {minutesDiff} minutos
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

StopArrivals.propTypes = {
  stopCode: PropTypes.string.isRequired,
};
