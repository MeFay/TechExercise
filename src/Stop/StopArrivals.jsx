import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

export function StopArrivals({ stopCode, showModal, handleClose }) {
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/http://dev1.opt.pt:25566/arrivals/${stopCode}`
        );

        const data = Array.isArray(response.data) ? response.data : [];

        setArrivals(data);
      } catch (error) {
        console.error("Erro ao aceder aos horários de paragens:", error);
        setArrivals([]);
      }
    };

    if (stopCode) {
      fetchArrivals();
    }
  }, [stopCode]);

  const getTimeColor = (minutes) => {
    if (minutes <= 3) return "red";
    if (minutes > 3 && minutes <= 5) return "orange";
    return "black";
  };

  const calculateMinutesDiff = (arrivalTime) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const arrivalMinutes = arrivalTime;
    return arrivalMinutes - currentMinutes;
  };

  const filteredArrivals = arrivals
    .map((arrival) => {
      const minutesDiff = calculateMinutesDiff(arrival.time);
      return { ...arrival, minutesDiff };
    })
    .filter((arrival) => arrival.minutesDiff >= 0 && arrival.minutesDiff <= 60);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Próximas Passagens</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {filteredArrivals.length === 0 ? (
            <li>Nenhuma passagem encontrada.</li>
          ) : (
            filteredArrivals.map((arrival, index) => {
              const minutesDiff = arrival.minutesDiff;

              return (
                <li key={index} style={{ color: getTimeColor(minutesDiff) }}>
                  {arrival.lineName} - {minutesDiff} minutos
                </li>
              );
            })
          )}
        </ul>
      </Modal.Body>
    </Modal>
  );
}

StopArrivals.propTypes = {
  stopCode: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
