import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import FlightIcon from "@mui/icons-material/Flight";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import CapAirIcon from "../images/capAirIcon";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import BoardingPassModal from "./boardingPassModal";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useState } from "react";
import LoadingDots from "./loadingDots";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TripDetailsTable(props) {
  let data = props.data;
  const rows = [];
  const [checkingIn, setCheckingIn] = useState(false);

  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));

  const getAirportByCode = (code) =>
    props.airports.find((airport) => airport.id === code);

  data.flights.forEach((flight, i) => {
    let from = getAirportByCode(flight.sourceAirport);
    let to = getAirportByCode(flight.destinationAirport);
    let flightRow = {
      flight: `CA${flight.flightID.substr(flight.flightID.length - 3)}`,
      fromAirport: from.name,
      fromCity: `${from.city}, ${from.state}`,
      fromTime: dayjs(flight.departureTime).format("hh:mm A"),
      fromDate: dayjs(flight.departureTime).format("MMM DD"),
      toAirport: to.name,
      toCity: `${to.city}, ${to.state}`,
      toTime: dayjs(flight.arrivalTime).format("hh:mm A"),
      toDate: dayjs(flight.arrivalTime).format("MMM DD"),
      duration: flight.duration,
      airplane: `${
        flight.airplaneType.split(" ").join(`\u00A0`).split("-")[0]
      }`,
      checkin: props.mode === "checkin" && flight.checkInOpen,
      checkedin: props.mode === "checkin" && flight.checkedIn,
      flightID: flight.flightID,
      fromCode: flight.sourceAirport,
      toCode: flight.destinationAirport,
    };
    if (i === 0) {
      rows.push(flightRow);
    } else {
      rows.push({
        index: i,
        layover: "true",
        duration: data.layoverDurations[i],
      });
      rows.push(flightRow);
    }
  });

  const handleCheckInClick = (flightID) => {
    setCheckingIn(true);
    let ticketIds = data.flights.find(
      (flight) => flight.flightID === flightID
    ).ticketIds;
    props.handleCheckIn(ticketIds).then(() => setCheckingIn(false));
  };

  return isAboveSM ? (
    <TableContainer
      sx={{
        flexShrink: 1,
        overflow: "auto",
        borderRadius: "0px 0px 5px 5px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Flight</StyledTableCell>
            <StyledTableCell align="right">From</StyledTableCell>
            <StyledTableCell align="right">To</StyledTableCell>
            <StyledTableCell align="right">Duration</StyledTableCell>
            {props.mode === "checkin" && isAboveSM && (
              <StyledTableCell align="right"></StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) =>
            row.layover ? (
              <StyledTableRow key={row.index}>
                <StyledTableCell component="th" scope="row" colSpan={3}>
                  <Typography fontWeight="bold">Layover</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography
                    fontSize={isAboveSM ? "16px" : "14px"}
                    fontWeight="bold"
                  >
                    {row.duration}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              <StyledTableRow key={row.flight}>
                <StyledTableCell component="th" scope="row">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CapAirIcon color="yellow" />
                      <Typography fontSize="12px" fontWeight="bold">
                        {row.flight}
                      </Typography>
                    </Box>
                    <Typography fontSize="12px">CapAir</Typography>
                    <Typography fontSize="12px" color="gray">
                      {row.airplane}
                    </Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      gap: "10px",
                    }}
                  >
                    <Typography fontSize="13px" color="primary">
                      {row.fromDate}
                    </Typography>
                    <Typography fontSize="15px" color="primary">
                      {row.fromTime}
                    </Typography>
                  </Box>
                  <Typography fontSize="13px" fontWeight="bold">
                    {row.fromCity}
                  </Typography>
                  <Typography fontSize="12px" color="gray">
                    {row.fromAirport} ({row.fromCode})
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      gap: "10px",
                    }}
                  >
                    <Typography fontSize="13px" color="primary">
                      {row.toDate}
                    </Typography>
                    <Typography fontSize="15px" color="primary">
                      {row.toTime}
                    </Typography>
                  </Box>
                  <Typography fontSize="13px" fontWeight="bold">
                    {row.toCity}
                  </Typography>
                  <Typography fontSize="12px" color="gray">
                    {row.toAirport} ({row.toCode})
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography fontSize="16px" fontWeight="bold">
                    {row.duration}
                  </Typography>
                </StyledTableCell>
                {props.mode === "checkin" && isAboveSM && (
                  <StyledTableCell align="center" gap={1}>
                    {row.checkedin ? (
                      <>
                        <Chip
                          label="Checked-in ✔"
                          color="success"
                          size="small"
                        />
                        <BoardingPassModal
                          itineraryId={props.itineraryId}
                          flightID={row.flightID}
                          airports={props.airports}
                        />
                      </>
                    ) : (
                      row.checkin && (
                        <LoadingButton
                          onClick={() => handleCheckInClick(row.flightID)}
                          variant="contained"
                          loading={checkingIn}
                          loadingIndicator={<LoadingDots />}
                          color="success"
                        >
                          <Typography noWrap fontSize="12px" fontWeight="bold">
                            Check-In
                          </Typography>
                        </LoadingButton>
                      )
                    )}
                  </StyledTableCell>
                )}
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <TableContainer>
      <Table>
        <TableBody>
          {rows.map((row) =>
            row.layover ? (
              <StyledTableRow key={row.index}>
                <StyledTableCell component="th" scope="row" colSpan={3}>
                  <Typography fontWeight="bold">Layover</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography fontSize="17px" fontWeight="bold">
                    {row.duration}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              <StyledTableRow key={row.flight}>
                <TableCell colSpan={4} sx={{ padding: "0px!important" }}>
                  <Paper
                    square
                    sx={{
                      backgroundColor: "primary.main",
                      width: "100%",
                      padding: "10px",
                    }}
                  >
                    <Grid container>
                      <Grid
                        container
                        item
                        justifyContent="space-between"
                        alignItems="center"
                        marginBottom="10px"
                      >
                        <Grid item xs={3}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignContent: "space-between",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CapAirIcon color="yellow" />
                              <Typography
                                fontSize="12px"
                                fontWeight="bold"
                                color="white.main"
                              >
                                {row.flight}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: "center" }}>
                          {props.mode === "checkin" &&
                            !isAboveSM &&
                            (row.checkedin ? (
                              <>
                                <Chip
                                  label="Checked-in ✔"
                                  color="success"
                                  size="small"
                                />
                                <BoardingPassModal
                                  itineraryId={props.itineraryId}
                                  flightID={row.flightID}
                                  airports={props.airports}
                                />
                              </>
                            ) : (
                              row.checkin && (
                                <LoadingButton
                                  onClick={() =>
                                    handleCheckInClick(row.flightID)
                                  }
                                  variant="contained"
                                  loading={checkingIn}
                                  loadingIndicator={<LoadingDots />}
                                  color="success"
                                >
                                  <Typography
                                    noWrap
                                    fontSize="12px"
                                    fontWeight="bold"
                                  >
                                    Check-In
                                  </Typography>
                                </LoadingButton>
                              )
                            ))}
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 1,
                          }}
                        >
                          <Typography
                            fontSize="12px"
                            color="white.main"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            <FlightIcon fontSize="12px" /> {row.airplane}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="h7" color="white.main">
                            {row.fromCity}
                          </Typography>
                          <Typography variant="h7" color="white.main">
                            {row.toCity}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography
                            variant="h5"
                            color="white.main"
                            fontWeight="bold"
                            width="50px"
                          >
                            {row.fromCode}
                          </Typography>
                          <FlightIcon
                            sx={{
                              transform: "rotate(90deg)",
                              color: "yellow.main",
                              height: "30px",
                              width: "30px",
                            }}
                          />
                          <Typography
                            variant="h5"
                            color="white.main"
                            fontWeight="bold"
                            width="50px"
                            textAlign="end"
                          >
                            {row.toCode}
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            textAlign="start"
                            fontSize="12px"
                            color="white.main"
                            width="40%"
                          >
                            {row.fromAirport}
                          </Typography>
                          <Typography fontSize="14px" color="yellow.main">
                            {row.duration}
                          </Typography>
                          <Typography
                            textAlign="end"
                            fontSize="12px"
                            color="white.main"
                            width="40%"
                          >
                            {row.toAirport}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item container xs={12}>
                        <Grid item xs={6}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "start",
                              gap: "10px",
                            }}
                          >
                            <Typography fontSize="13px" color="yellow.main">
                              {row.fromDate}
                            </Typography>
                            <Typography fontSize="16px" color="yellow.main">
                              {row.fromTime}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                              gap: "10px",
                            }}
                          >
                            <Typography fontSize="13px" color="yellow.main">
                              {row.toDate}
                            </Typography>
                            <Typography fontSize="16px" color="yellow.main">
                              {row.toTime}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </TableCell>
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
