import Trip from "../components/trip";
import { useState, useEffect, useContext, useRef } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Box,
  Button,
  ButtonGroup,
  CardActionArea,
  Chip,
  Grow,
  Paper,
  Slider,
  Stack,
  TableBody,
  useMediaQuery,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Container, Accordion, Backdrop } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Spinner from "../images/spinner";
import TableSkeleton from "../components/tableSkeleton";
import MyTripTable from "../components/myTripTable";
import PersonIcon from "@mui/icons-material/Person";
import CapAirIcon from "../images/capAirIcon";
import { toast } from "react-hot-toast";
import { getCookie } from "../utilities/getCookie";
import UserInfoModal from "../components/userInfoModal";
import {
  getTripDuration,
  getFlightDuration,
  getLayoverDuration,
} from "../utilities/getDuration";
import BoardingPass from "../components/boardingPass";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import SavedPassengers from "../components/savedPassengers";
import SavedPassengerModal from "../components/savedPassengerModal";

export default function DashboardPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [airports, setAirports] = useState([]);
  const [editDetails, setEditDetails] = useState(false);
  const [savedPassengersModalSettings, setSavedPassengersModalSettings] =
    useState({
      open: false,
      type: "add",
      currentPassenger: {},
    });

  useEffect(() => {
    setIsLoading(true);
    getTripData();
  }, []);

  const [data, setData] = useState({});

  const getTripData = async () => {
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/airport`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((error) => console.log("AIRPORT REQUEST ERROR", error));
    url = `${process.env.REACT_APP_PROTOCOL}://${domain}/user/flights`;
    await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("_auth")}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          setIsLoading(false);
          throw new Error("No trips found");
        } else if (response.status === 500) {
          setIsLoading(false);
          throw new Error(response.message);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setData(data);
        return data;
      })
      .then((data) => {
        data.allTrips.forEach((trip) => {
          makeCalculations([trip.outboundTrip]);
          if (trip.inboundTrip) {
            makeCalculations([trip.inboundTrip]);
          }
        });
        return data;
      })
      .then((data) => {
        let filteredData = { upcomingTrips: [], pastTrips: [] };
        filteredData.upcomingTrips = data.allTrips.filter((trip) =>
          filterTrips(trip)
        );
        filteredData.pastTrips = data.allTrips
          .filter((trip) => !filterTrips(trip))
          .reverse();
        return filteredData;
      })
      .then((calcdata) => {
        setData(calcdata);
        setIsLoading(false);
      })
      .catch((error) => console.log("USER/FLIGHTS ERROR", error));
  };

  const makeCalculations = async (data) => {
    await data.forEach((trip) => {
      trip.duration = getTripDuration(trip);
      trip.layoverDurations = trip.flights.map((flight, i) =>
        i > 0 ? getLayoverDuration(trip, i) : null
      );

      trip.flights.forEach((flight) => {
        flight.duration = getFlightDuration(flight);
      });
    });
  };

  const filterTrips = (trip) => {
    if (trip.itinerary.isRoundTrip) {
      return (
        dayjs(
          trip.inboundTrip.flights[trip.inboundTrip.flightCount - 1]
            .departureTime
        ) > dayjs()
      );
    } else {
      return (
        dayjs(
          trip.outboundTrip.flights[trip.outboundTrip.flightCount - 1]
            .departureTime
        ) > dayjs()
      );
    }
  };

  const handleCheckIn = async (ticketIds) => {
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/ticket/check-in`;
    await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketIds),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          setIsLoading(false);
          throw new Error("Check in failed");
        }
      })
      .then((data) => {
        getTripData().then((data) => {
          toast.success("Checked in successfully!");
          return Promise.resolve(data);
        });
      })
      .catch((error) => console.log("CHECK IN ERROR", error));
  };

  return (
    <Box
      sx={{ backgroundColor: "white", minHeight: "70vh", marginBottom: "70px" }}
    >
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Spinner color="inherit" />
      </Backdrop>
      {!isLoading && (
        <Container
          sx={{
            minWidth: {
              xs: "100%",
              sm: "100%",
              md: "900px",
              lg: "1200px",
              xl: "1400px",
            },
            maxWidth: "xl",
            alignSelf: "center",
            marginTop: "20px",
          }}
        >
          <Grid container rowSpacing={{ xs: 2, sm: 3 }} columnSpacing={3}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Dashboard</Typography>
            </Grid>
            <Grid item container xs={12} sm={12} lg={8}>
              <Container
                component={Card}
                variant="outlined"
                sx={{
                  paddingX: "0px!important",
                }}
              >
                <CardHeader
                  disableTypography
                  title={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CapAirIcon cfill="none" />
                      <Typography variant="h6">My Trips</Typography>
                    </Stack>
                  }
                  titleTypographyProps={{ fontSize: "20px" }}
                />
                <Divider />
                <CardContent
                  sx={{
                    maxHeight: "90vh",
                    overflowY: "auto",
                    overflowX: "visible!important",
                    paddingX: { xs: "0px", sm: "10px" },
                  }}
                >
                  {data?.upcomingTrips.length === 0 &&
                  data?.pastTrips.length === 0 ? (
                    <Typography
                      variant="h6"
                      color="gray"
                      sx={{ textAlign: "center" }}
                    >
                      No trips so far!
                    </Typography>
                  ) : (
                    <>
                      <Stack direction="column" spacing={1}>
                        {data.upcomingTrips.length > 0 && (
                          <Box>
                            <Typography
                              variant="h6"
                              color="gray"
                              sx={{ marginBottom: "5px", paddingLeft: "10px" }}
                            >
                              Upcoming:
                            </Typography>
                            {data.upcomingTrips.map((trip, i) => (
                              <Trip
                                key={i}
                                data={trip}
                                airports={airports}
                                isLoading={isLoading}
                                handleCheckIn={handleCheckIn}
                              />
                            ))}
                          </Box>
                        )}
                        {data.pastTrips.length > 0 && (
                          <Box>
                            <Typography
                              variant="h6"
                              color="gray"
                              sx={{ marginY: "5px", paddingLeft: "10px" }}
                            >
                              Past:
                            </Typography>
                            {data.pastTrips.map((trip, i) => (
                              <Trip
                                key={i}
                                data={trip}
                                airports={airports}
                                isLoading={isLoading}
                                handleCheckIn={handleCheckIn}
                              />
                            ))}
                          </Box>
                        )}
                      </Stack>
                    </>
                  )}
                </CardContent>
              </Container>
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              <Card variant="outlined">
                <CardHeader
                  disableTypography
                  title={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PersonIcon />
                      <Typography variant="h6" noWrap>
                        Personal Information
                      </Typography>
                    </Stack>
                  }
                  titleTypographyProps={{ fontSize: "20px" }}
                  action={
                    <Tooltip title="Edit Personal Information">
                      <IconButton onClick={() => setEditDetails(!editDetails)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  }
                />
                <Divider />
                <CardContent sx={{ paddingY: "0px" }}>
                  <UserInfoModal
                    type="edit"
                    editable={editDetails}
                    setEditDetails={setEditDetails}
                  />
                </CardContent>
              </Card>
              <Card variant="outlined" sx={{ marginTop: "20px" }}>
                <CardHeader
                  disableTypography
                  title={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PeopleIcon />
                      <Typography variant="h6" noWrap>
                        Saved Passengers
                      </Typography>
                    </Stack>
                  }
                  titleTypographyProps={{ fontSize: "20px" }}
                  action={
                    <Tooltip title="Add Passenger Details">
                      <IconButton
                        onClick={() =>
                          setSavedPassengersModalSettings({
                            open: true,
                            type: "add",
                          })
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  }
                />
                <Divider />
                <CardContent sx={{ paddingY: "0px" }}>
                  <SavedPassengers
                    settings={{
                      savedPassengersModalSettings,
                      setSavedPassengersModalSettings,
                    }}
                  />
                  <SavedPassengerModal
                    settings={{
                      savedPassengersModalSettings,
                      setSavedPassengersModalSettings,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
}
