import dayjs from "dayjs";

export const getTripDuration = (data) => {
  let minutes = dayjs(data.flights[data.flightCount - 1].arrivalTime).diff(
    dayjs(data.flights[0].departureTime),
    "m"
  );
  const hours = Math.floor(minutes / 60);
  minutes = minutes - hours * 60;
  return (hours > 0 ? `${hours}h${"\u00A0"}` : "") + `${minutes}m`;
};

export const getFlightDuration = (flight) => {
  let minutes = dayjs(flight.arrivalTime).diff(
    dayjs(flight.departureTime),
    "m"
  );
  const hours = Math.floor(minutes / 60);
  minutes = minutes - hours * 60;
  return (hours > 0 ? `${hours}h${"\u00A0"}` : "") + `${minutes}m`;
};

export const getLayoverDuration = (data, index) => {
  let minutes = dayjs(data.flights[index].departureTime).diff(
    dayjs(data.flights[index - 1].arrivalTime),
    "m"
  );
  const hours = Math.floor(minutes / 60);
  minutes = minutes - hours * 60;
  return (hours > 0 ? `${hours}h${"\u00A0"}` : "") + `${minutes}m`;
};
