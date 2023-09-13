import {
  Paper,
  Box,
  Grid,
  Typography,
  Divider,
  Stack,
  SvgIcon,
} from "@mui/material";
import { useEffect, useState } from "react";
import CapAirLogo from "../images/capAirLogo";
import dayjs from "dayjs";
import FlightIcon from "@mui/icons-material/Flight";

export default function BoardingPass(props) {
  const getAirportByCode = (code) =>
    props.airports.find((airport) => airport.id === code);

  const boardingPass = {
    itineraryId: props.data.ticketResponse.itinerary.itineraryId,
    sourceAirport: props.data.ticketResponse.flight.sourceAirport,
    sourceAirportCity: getAirportByCode(
      props.data.ticketResponse.flight.sourceAirport
    ).city,
    destinationAirport: props.data.ticketResponse.flight.destinationAirport,
    destinationAirportCity: getAirportByCode(
      props.data.ticketResponse.flight.destinationAirport
    ).city,
    firstName: props.data.ticketResponse.customer.firstName,
    lastName: props.data.ticketResponse.customer.lastName,
    flightID: `CA${props.data.ticketResponse.flight.flightID.substr(
      props.data.ticketResponse.flight.flightID.length - 3
    )}`,
    departureTime: dayjs(props.data.ticketResponse.flight.departureTime).format(
      "hh:mm A"
    ),
    fullDepartureTime: dayjs(
      props.data.ticketResponse.flight.departureTime
    ).format("MMMM D, YYYY hh:mm A"),
    seatSection: props.data.ticketResponse.seatSection,
  };

  useEffect(() => {
    props.setBookingLink(
      `${window.location.origin}/checkin/${boardingPass.itineraryId}/${boardingPass.lastName}`
    );
  }, [boardingPass]);

  const Label = ({ children, ...others }) => (
    <Typography fontSize="14px" fontWeight="bold" color="gray" {...others}>
      {children}
    </Typography>
  );

  return props.isAboveMD ? (
    <Paper
      elevation={3}
      sx={{
        width: "800px",
        height: "300px",
        margin: "auto",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          justifyContent: "center",
          height: "50px",
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            <Box sx={{ display: "flex", alignItems: "center", height: "50px" }}>
              <CapAirLogo
                textfill="#fff"
                sx={{
                  height: "70px",
                  width: "100px",
                  marginLeft: "20px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" color="white.main" fontWeight="bold">
              BOARDING PASS
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color="white.main" sx={{ marginLeft: "10px" }}>
              Confirmation #: {boardingPass.itineraryId}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <img
          alt="Barcode Generator TEC-IT"
          src={`https://barcode.tec-it.com/barcode.ashx?code=PDF417&data=${window.location.origin}/${boardingPass.itineraryId}/${boardingPass.lastName}
              &unit=mils&modulewidth=18&rotation=90`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/barcodeVertical.png";
          }}
          style={{ padding: "5px", paddingRight: "0px" }}
        />
        <Box sx={{ paddingX: "10px", paddingY: "5px" }}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: "300px",
              position: "absolute",
              top: "0",
              right: "25%",
              border: "dashed 1px white",
            }}
          />
          <Grid container justifyContent="center" alignItems="center">
            <Grid
              container
              item
              xs={9}
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={6}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h7" fontWeight="bold" color="gray">
                    FROM:
                  </Typography>
                  <Typography variant="h6">
                    {boardingPass.sourceAirportCity} (
                    {boardingPass.sourceAirport})
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h7" fontWeight="bold" color="gray">
                    TO:
                  </Typography>
                  <Typography variant="h6">
                    {boardingPass.destinationAirportCity} (
                    {boardingPass.destinationAirport})
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Label>Passenger:</Label>
                <Typography variant="h6">
                  {boardingPass.firstName.toUpperCase()}{" "}
                  {boardingPass.lastName.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Label>Flight:</Label>
                <Typography variant="h6">{boardingPass.flightID}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Label>Seat:</Label>
                <Typography variant="h6">{props.data.seatNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Label>Gate:</Label>
                <Typography variant="h6">{props.data.gateNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Label>Seat Section:</Label>
                <Typography variant="h6">
                  {boardingPass.seatSection.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Label>Departure Time:</Label>
                <Typography variant="h6">
                  {boardingPass.fullDepartureTime}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={3}
              alignItems="flex-start"
              rowSpacing="5px"
            >
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5" fontWeight="bold">
                    {boardingPass.sourceAirport}
                  </Typography>
                  <FlightIcon
                    sx={{
                      transform: "rotate(90deg)",
                      color: "primary.main",
                      height: "25px",
                      width: "25px",
                    }}
                  />
                  <Typography variant="h5" fontWeight="bold">
                    {boardingPass.destinationAirport}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  {boardingPass.firstName.toUpperCase()}{" "}
                  {boardingPass.lastName.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Label>Departing:</Label>
                <Typography variant="h6" fontWeight="bold">
                  {boardingPass.departureTime}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Label>Seat:</Label>
                <Typography variant="h6" fontWeight="bold">
                  {props.data.seatNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Label>Gate:</Label>
                <Typography variant="h6" fontWeight="bold">
                  {props.data.gateNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <img
                  alt="Barcode Generator TEC-IT"
                  src={`https://barcode.tec-it.com/barcode.ashx?code=PDF417&data=${window.location.origin}/${boardingPass.itineraryId}/${boardingPass.lastName}
              &unit=Px&modulewidth=3`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/barcodeHorizontal.png";
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Paper>
  ) : (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        padding: "15px",
      }}
    >
      <Grid container alignItems="flex-start" rowSpacing="5px">
        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "15px" }}
        >
          <Grid item xs={9}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "20px",
              }}
            >
              <CapAirLogo
                textfill="#fff"
                sx={{
                  height: "70px",
                  width: "70px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Typography color="white.main" textAlign="end">
              {boardingPass.itineraryId}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h7" color="white.main">
              {boardingPass.sourceAirportCity}
            </Typography>
            <Typography variant="h7" color="white.main">
              {boardingPass.destinationAirportCity}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3" color="white.main" fontWeight="bold">
              {boardingPass.sourceAirport}
            </Typography>
            <FlightIcon
              sx={{
                transform: "rotate(90deg)",
                color: "yellow.main",
                height: "50px",
                width: "50px",
              }}
            />
            <Typography variant="h3" color="white.main" fontWeight="bold">
              {boardingPass.destinationAirport}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="white.main">
            {props.data.ticketResponse.customer.firstName.toUpperCase()}{" "}
            {props.data.ticketResponse.customer.lastName.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Label color="yellow.main">Departing:</Label>
          <Typography variant="h5" fontWeight="bold" color="white.main">
            {boardingPass.departureTime}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Label color="yellow.main">Gate:</Label>
          <Typography variant="h5" fontWeight="bold" color="white.main">
            {props.data.gateNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Label color="yellow.main">Seat:</Label>
          <Typography variant="h5" fontWeight="bold" color="white.main">
            {props.data.seatNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Label color="yellow.main">Seat Section:</Label>
          <Typography variant="h5" fontWeight="bold" color="white.main">
            {boardingPass.seatSection.toUpperCase()}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Paper
            sx={{
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              marginY: "10px",
            }}
          >
            <img
              alt="Barcode Generator TEC-IT"
              src={`https://barcode.tec-it.com/barcode.ashx?code=Aztec&data=${
                window.location.origin
              }/${boardingPass.itineraryId}/${boardingPass.lastName}
              ${JSON.stringify(boardingPass, null, 2)}
              &unit=Px&modulewidth=3`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/squareQR.gif";
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}
