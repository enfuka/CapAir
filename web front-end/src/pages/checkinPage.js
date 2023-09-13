import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  Paper,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Container, Backdrop } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../images/spinner";
import TableSkeleton from "../components/tableSkeleton";
import MyTripTable from "../components/myTripTable";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-hot-toast";
import TripLookupForm from "../components/tripLookupForm";
import { Alert } from "@mui/material";
import {
  getTripDuration,
  getFlightDuration,
  getLayoverDuration,
} from "../utilities/getDuration";

export default function CheckInPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [airports, setAirports] = useState([]);
  let URLparams = useParams();

  useEffect(() => {
    setIsLoading(true);
    getTripData();
  }, [URLparams]);

  const [data, setData] = useState({});

  const getTripData = async () => {
    let request = {
      itineraryId: URLparams.confirmationNumber,
      lastName: URLparams.lastName,
    };
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/airport`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((error) => console.log("AIRPORT REQUEST ERROR", error));
    url = `${process.env.REACT_APP_PROTOCOL}://${domain}/itinerary/check-in`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          toast.error(
            "No flights found for this confirmation number and last name. Please try again."
          );
          throw new Error("No flights found for this confirmation number.");
        }
      })
      .then((data) => {
        setData(data);
        return data;
      })
      .then((data) => {
        makeCalculations([data.outboundTrip]);
        if (data.inboundTrip) {
          makeCalculations([data.inboundTrip]);
        }
        return data;
      })
      .then((calcdata) => {
        setData(calcdata);
        setIsLoading(false);
      })
      .catch((error) => console.log("AIRPORT REQUEST ERROR", error));
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
      sx={{
        backgroundColor: "white",
        minHeight: "65vh",
        marginBottom: "70px",
      }}
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
            },
            maxWidth: "lg",
            alignSelf: "center",
            marginTop: "20px",
          }}
        >
          {data?.itinerary ? (
            <Grid container rowSpacing={{ xs: 1, sm: 2 }} columnSpacing={3}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4">Check-In</Typography>
                <Typography color="gray">
                  Confirmation Number: {data.itinerary.itineraryId}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info">
                  Flights open for check-in 24 hours before departure. You will
                  not be able to see the check-in option until then.
                </Alert>
              </Grid>
              <Grid item container xs={12} sm={8}>
                <Paper variant="outlined" sx={{ flexGrow: 1, padding: "15px" }}>
                  {isLoading ? (
                    <TableSkeleton />
                  ) : data?.outboundTrip?.flights.length === 0 ? (
                    <p>
                      No bookings found for this confirmation number and last
                      name
                    </p>
                  ) : (
                    <MyTripTable
                      type="OUTBOUND"
                      data={data}
                      mode="checkin"
                      handleCheckIn={handleCheckIn}
                      airports={airports}
                    />
                  )}
                  {!isLoading && data?.itinerary.isRoundTrip ? (
                    <MyTripTable
                      type="INBOUND"
                      data={data}
                      mode="checkin"
                      handleCheckIn={handleCheckIn}
                      airports={airports}
                    />
                  ) : null}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardHeader
                    disableTypography
                    title={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PersonIcon sx={{}} />
                        <Typography variant="h6" sx={{}}>
                          Passengers
                        </Typography>
                      </Stack>
                    }
                    titleTypographyProps={{ fontSize: "20px" }}
                  />
                  <Divider />
                  <CardContent>
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                      {data?.customers?.map((customer, i) => {
                        return (
                          <ListItem key={i} disablePadding>
                            <ListItemText
                              primary={`${customer.firstName} ${customer.lastName}`}
                              secondary={`${customer.email}`}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <>
              <Alert severity="error">
                No bookings found for this confirmation number and last name.
                Please try again.
              </Alert>
              <TripLookupForm type="checkin" />
            </>
          )}
        </Container>
      )}
    </Box>
  );
}
