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
  Alert,
} from "@mui/material";
import { Container, Button, Backdrop } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../images/spinner";
import TableSkeleton from "../components/tableSkeleton";
import MyTripTable from "../components/myTripTable";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-hot-toast";
import TripLookupForm from "../components/tripLookupForm";
import {
  getTripDuration,
  getFlightDuration,
  getLayoverDuration,
} from "../utilities/getDuration";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

export default function MyTripPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [airports, setAirports] = useState([]);
  const navigate = useNavigate();

  const URLparams = useParams();

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
      .catch((error) => console.log("CHECK IN REQUEST ERROR", error));
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

  return (
    <Box
      sx={{ backgroundColor: "white", minHeight: "65vh", marginBottom: "70px" }}
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
              <Grid item container xs={12}>
                <Grid item sm={4} xs={12}>
                  <Typography variant="h4">Trip Details</Typography>
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onClick={() =>
                      navigate(
                        `/checkin/${URLparams.confirmationNumber}/${URLparams.lastName}`
                      )
                    }
                    endIcon={<AirplaneTicketIcon />}
                  >
                    CHECK-IN / BOARDING PASS
                  </Button>
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography color="gray">
                    Confirmation Number: {data.itinerary.itineraryId}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={8}>
                <Paper variant="outlined" sx={{ flexGrow: 1, padding: "15px" }}>
                  {isLoading ? (
                    <TableSkeleton />
                  ) : (
                    <MyTripTable
                      type="OUTBOUND"
                      data={data}
                      airports={airports}
                    />
                  )}
                  {!isLoading && data?.itinerary.isRoundTrip ? (
                    <MyTripTable
                      type="INBOUND"
                      data={data}
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
              <TripLookupForm type="mytrips" />
            </>
          )}
        </Container>
      )}
    </Box>
  );
}
