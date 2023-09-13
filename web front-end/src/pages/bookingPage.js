import * as React from "react";
import { useState, useEffect, useRef, useReducer, useContext } from "react";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Alert,
  Box,
  Fab,
  Stack,
  List,
  ListItem,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import { Accordion, Backdrop } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FlightIcon from "@mui/icons-material/Flight";
import Spinner from "../images/spinner";
import { useParams } from "react-router-dom";
import TripTable from "../components/tripTable";
import SearchBar from "../components/searchBar";
import { toast } from "react-hot-toast";
import ColoredStepper from "../components/stepper";
import TableSkeleton from "../components/tableSkeleton";
import dayjs from "dayjs";
import PassengerDetails from "../components/passengerDetails";
import PersonIcon from "@mui/icons-material/Person";
import PaymentCard from "../components/paymentCard";
import TotalCard from "../components/totalCard";
import { useNavigate, Outlet } from "react-router-dom";
import ConfirmationPage from "./confirmationPage";
import SortingPanel from "../components/sortingPanel";
import { useIsAuthenticated } from "react-auth-kit";
import { getCookie } from "../utilities/getCookie";
import {
  getTripDuration,
  getFlightDuration,
  getLayoverDuration,
} from "../utilities/getDuration";
import executeScrollWithOffset from "../utilities/executeScrollWithOffset";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CapAirLogo from "../images/capAirLogo";
import SearchContext from "../contexts/searchContext";
import BaggagePolicyCard from "../components/baggagePolicyCard";
import { Couple } from "../images/couple";
import DaySkipper from "../components/daySkipper";

export default function BookingPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [summaryExpanded, setSummaryExpanded] = useState("summary");
  const [passengersExpanded, setPassengersExpanded] = useState("passengers");
  const [outboundExpanded, setOutboundExpanded] = useState(true);
  const [inboundExpanded, setInboundExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [airports, setAirports] = useState([]);
  const [selectionDone, setSelectionDone] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isPassengerFormsValid, setIsPassengerFormsValid] = useState(false);
  const [selection, setSelection] = useState({ outbound: null, inbound: null });
  const summaryRef = useRef(null);
  const passengersRef = useRef(null);
  const stepperRef = useRef(null);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationNo, setConfirmationNo] = useState("1234567890");
  const [data, setData] = useState();
  const [savedPassengers, setSavedPassengers] = useState([]);

  const navigate = useNavigate();
  const { search, setSearch } = useContext(SearchContext);
  let urlParams = useParams();
  const [passengerCount, setPassengerCount] = useState(
    parseInt(urlParams.passengers)
  );
  const isAuthenticated = useIsAuthenticated();
  const isAboveSM = useMediaQuery(useTheme().breakpoints.up("sm"));

  useEffect(() => {
    setIsLoading(true);
    handleChange("summary")(null, false);
    getFlightResults();
    setInboundExpanded(false);
    setSelectionDone(false);
    setSelection({ outbound: null, inbound: null });
    setActiveStep(0);
    validateForms();
  }, [urlParams]);

  useEffect(() => {
    setIsPassengerFormsValid(false);
    setPassengerCount(parseInt(urlParams.passengers));
    validateForms();
  }, [urlParams.passengers, activeStep]);

  const getFlightResults = async () => {
    const request = {
      sourceAirport: urlParams.source,
      destinationAirport: urlParams.destination,
      departureTime: urlParams.departureDate,
      arrivalTime:
        urlParams.type === "Round Trip" ? urlParams.returnDate : null,
      numPassengers: urlParams.passengers,
      isRoundTrip: urlParams.type === "Round Trip",
    };

    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/airport`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((error) => console.log("AIRPORT REQUEST ERROR", error));
    url = `${process.env.REACT_APP_PROTOCOL}://${domain}/flight/search`;
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
        } else if (response.status === 404) {
          toast.error(
            "No flights found for the given search criteria, please try different dates or airports"
          );
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .then((data) => {
        setData(data);
        return data;
      })
      .then((data) => {
        makeCalculations(data.outboundTrips);
        if (data.inboundTrips) {
          makeCalculations(data.inboundTrips);
        }
        return data;
      })
      .then((data) => {
        setIsLoading(false);
        setOutboundExpanded(true);
        toast.dismiss();
        toast.custom(
          <Alert severity="info">
            Select {urlParams.type === "Round Trip" ? "first" : ""} flight
          </Alert>
        );
        return data;
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const makeBookingRequest = async () => {
    const bookingRequest = {
      outboundTrip: {
        flightIds: selection.outbound.flights.map((flight) => flight.flightID),
        seatSection:
          selection.outbound.selection.charAt(0).toUpperCase() +
          selection.outbound.selection.slice(1),
      },
      inboundTrip: selection.inbound
        ? {
            flightIds: selection.inbound.flights.map(
              (flight) => flight.flightID
            ),
            seatSection:
              selection.inbound.selection.charAt(0).toUpperCase() +
              selection.inbound.selection.slice(1),
          }
        : null,
      passengers: passengers.map((passenger) => ({
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        birthDate: dayjs(passenger.birthdate).format("YYYY-MM-DD"),
        email: passenger.email,
        phoneNumber: passenger.phone,
        addCustomer: passenger.addCustomer,
      })),
    };

    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/flight/book`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: isAuthenticated()
          ? `Bearer ${getCookie("_auth")}`
          : null,
      },
      body: JSON.stringify(bookingRequest),
    })
      .then((response) => {
        if (response.ok) {
          setConfirmed(true);
          setIsLoading(false);
          toast.custom(<Alert severity="success">Booking Successful</Alert>);
          handleChange("summary")(null, true);
          window.scrollTo(0, 0);
        } else if (response.status === 400) {
          toast.custom(<Alert severity="error">Flight is full</Alert>);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.custom(<Alert severity="error">Booking Failed</Alert>);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.log("BOOKING REQUEST ERROR", data.message);
        } else {
          setConfirmationNo(data);
          setSearch(data);
          console.log("CONF NUMBER", data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("BOOKING REQUEST ERROR", error);
      });
  };

  let initialForm = [...Array(passengerCount).keys()].map((i) => ({
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: null,
    travellerID: "",
    email: "",
    phone: "",
    addCustomer: false,
  }));

  function reducer(state, newState) {
    state[newState.index] = {
      ...newState.formInput,
    };
    return state;
  }

  const [passengers, setPassengers] = useReducer(reducer, initialForm);

  const makeCalculations = async (data) => {
    await data.forEach((trip) => {
      trip.duration = getTripDuration(trip);
      trip.layoverDurations = trip.flights.map((flight, i) =>
        i > 0 ? getLayoverDuration(trip, i) : null
      );

      trip.flights.forEach((flight) => {
        flight.duration = getFlightDuration(flight);
      });

      trip.availableSeats = {
        economy: trip.flights.reduce((prev, cur) =>
          prev.econSeatsAvailable < cur.econSeatsAvailable ? prev : cur
        ).econSeatsAvailable,
        business: trip.flights.reduce((prev, cur) =>
          prev.busSeatsAvailable < cur.busSeatsAvailable ? prev : cur
        ).busSeatsAvailable,
      };
    });
  };

  const scrollToError = () => {
    setTimeout(() => {
      try {
        window.scrollTo({
          behavior: "smooth",
          top:
            document.querySelector(".Mui-error").getBoundingClientRect().top -
            document.body.getBoundingClientRect().top -
            200,
        });
      } catch (error) {
        console.error("ERROR SCROLLING TO ERROR", error);
      }
    }, 500);
  };

  const validateForms = async () => {
    (await passengers) &&
    passengers
      .slice(0, passengerCount)
      .every(
        (passenger) =>
          passenger.firstName !== "" &&
          passenger.lastName !== "" &&
          passenger.birthdate !== null &&
          passenger.email !== "" &&
          passenger.phone !== ""
      )
      ? setIsPassengerFormsValid(true)
      : setIsPassengerFormsValid(false);
  };

  const handleOutboundSelect = (trip) => {
    toast.dismiss();
    validateForms();
    setOutboundExpanded(false);
    setSelection({ ...selection, outbound: trip });
    if (urlParams.type === "Round Trip") {
      if (!selection.inbound) {
        setInboundExpanded(true);
        toast.custom(<Alert severity="success">Select return flight</Alert>);
        isAboveSM &&
          setTimeout(() => {
            executeScrollWithOffset(stepperRef, 60);
          }, 300);
      }
    } else {
      setSelectionDone(true);
      handleChange("summary")(null, true);
      !isAboveSM &&
        setTimeout(() => {
          executeScrollWithOffset(stepperRef, 60);
        }, 300);
    }
  };

  const handleInboundSelect = (trip) => {
    toast.dismiss();
    validateForms();
    setInboundExpanded(false);
    setSelection({ ...selection, inbound: trip });
    setSelectionDone(true);
    handleChange("summary")(null, true);
    !isAboveSM &&
      setTimeout(() => {
        executeScrollWithOffset(stepperRef, 60);
      }, 300);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setSummaryExpanded(isExpanded ? panel : false);
    setPassengersExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = () => {
    if (document.getElementById("passenger-form").checkValidity()) {
      handleFormSubmit();
    } else {
      handleChange("passengers")(null, true);
      setTimeout(() => {
        document.getElementById("passenger-form").reportValidity();
      }, 1000);
      toast.custom(
        <Alert severity="error">
          Please fill out all form fields correctly
        </Alert>
      );
    }
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    validateForms().then(() => {
      if (isPassengerFormsValid && selectionDone) {
        makeBookingRequest();
      } else {
        scrollToError();
        toast.custom(<Alert severity="error">Please fill out all forms</Alert>);
        setPassengersExpanded("passengers");
        setIsLoading(false);
      }
    });
  };

  const handleContinue = () => {
    toast.dismiss();
    validateForms().then(() => {
      setSummaryExpanded(false);
      switch (activeStep) {
        case 0:
          if (selectionDone) {
            handleChange("passengers")(null, true);
            setActiveStep(activeStep + 1);
          }
          break;
        case 1:
          if (
            isPassengerFormsValid &&
            document.getElementById("passenger-form").checkValidity()
          ) {
            handleChange("passengers")(null, false);
            !isAboveSM &&
              setTimeout(() => {
                executeScrollWithOffset(stepperRef, 60);
              }, 500);
            setActiveStep(activeStep + 1);
          } else {
            document.getElementById("passenger-form").reportValidity();
            toast.custom(
              <Alert severity="error">
                Please fill out all required fields
              </Alert>
            );
            scrollToError();
            setSubmitted(true);
          }
          break;
        default:
          break;
      }
    });
  };

  return (
    <Box sx={{ backgroundColor: "white", paddingBottom: "70px" }}>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Spinner color="inherit" />
      </Backdrop>
      <Stack spacing={{ xs: 1, sm: 2 }}>
        {confirmed ? (
          <ConfirmationPage
            confirmationNo={confirmationNo}
            selection={selection}
            passengers={passengers}
          />
        ) : (
          <>
            <SearchBar type="horizontal" />
            <ColoredStepper activeStep={activeStep} reference={stepperRef} />
          </>
        )}
        {outboundExpanded || inboundExpanded ? (
          <SortingPanel
            className="no-print"
            setIsLoading={setIsLoading}
            data={{ data, setData }}
            sx={{ alignSelf: "center" }}
          />
        ) : null}
        <Box className="print" sx={{ display: "none" }}>
          <Box
            sx={{
              height: "50px",
              width: "100%",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CapAirLogo
              textfill="#fff"
              sx={{ height: "85px", width: "100px" }}
            />
          </Box>
          <Typography variant="h6" textAlign="center">
            Confirmation Number: {confirmationNo}
          </Typography>
        </Box>
        <Accordion
          className="print"
          ref={summaryRef}
          expanded={summaryExpanded === "summary"}
          onChange={handleChange("summary")}
          TransitionProps={{ unmountOnExit: true }}
          sx={
            !(outboundExpanded || inboundExpanded)
              ? {
                  minWidth: {
                    xs: "100%",
                    sm: "100%",
                    md: "900px",
                    lg: "1200px",
                  },
                  maxWidth: "lg",
                  alignSelf: "center",
                }
              : {}
          }
        >
          {!isLoading && !(outboundExpanded || inboundExpanded) && (
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <FlightIcon />
              <Typography
                fontSize="16px"
                sx={{ marginLeft: "10px", flexShrink: 0 }}
              >
                Trip Summary
              </Typography>
            </AccordionSummary>
          )}
          <AccordionDetails sx={{ padding: { xs: "0px", sm: "15px" } }}>
            {(outboundExpanded || inboundExpanded) && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Alert
                  severity="info"
                  sx={{ maxWidth: "lg", width: "100%", justifySelf: "center" }}
                >
                  Prices are one-way, per passenger and exclude all taxes.
                </Alert>
              </Box>
            )}
            {isLoading && activeStep < 2 ? (
              <TableSkeleton />
            ) : data?.outboundTrips?.length === 0 || !data ? (
              <Stack direction="column" alignItems="center" gap={4}>
                <Typography variant="h5" textAlign="center">
                  No Flights Found
                </Typography>
                <Typography variant="body1" textAlign="center">
                  Outbound Flight Date:{" "}
                  {dayjs(urlParams.departureDate).format("MMMM DD, YYYY")}
                </Typography>
                <DaySkipper
                  urlParams={urlParams}
                  type="OUTBOUND"
                  mode="noflights"
                />
                <Typography variant="body1" textAlign="center">
                  Inbound Flight Date:{" "}
                  {dayjs(urlParams.returnDate).format("MMMM DD, YYYY")}
                </Typography>
                <DaySkipper
                  urlParams={urlParams}
                  type="INBOUND"
                  mode="noflights"
                />
              </Stack>
            ) : (
              <TripTable
                type="OUTBOUND"
                data={data?.outboundTrips}
                urlParams={urlParams}
                expanded={{
                  state: outboundExpanded,
                  setter: setOutboundExpanded,
                }}
                activeStep={{ state: activeStep, setter: setActiveStep }}
                airports={airports}
                handleSelect={handleOutboundSelect}
                selection={selection.outbound}
                confirmed={confirmed}
              />
            )}
            {!isLoading &&
            !outboundExpanded &&
            data?.inboundTrips?.length !== 0 &&
            urlParams.type === "Round Trip" ? (
              <TripTable
                type="INBOUND"
                data={data?.inboundTrips}
                urlParams={urlParams}
                expanded={{
                  state: inboundExpanded,
                  setter: setInboundExpanded,
                }}
                activeStep={{ state: activeStep, setter: setActiveStep }}
                airports={airports}
                handleSelect={handleInboundSelect}
                selection={selection.inbound}
                confirmed={confirmed}
              />
            ) : null}
            {confirmed ? (
              <Grid container spacing={2} sx={{ marginTop: "30px" }}>
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardHeader
                      disableTypography
                      title={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <PersonIcon />
                          <Typography variant="h7" sx={{}}>
                            Passengers:
                          </Typography>
                        </Stack>
                      }
                      titleTypographyProps={{ fontSize: "20px" }}
                      sx={{ paddingY: "10px!important" }}
                    />
                    <Divider />
                    <CardContent>
                      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        {passengers?.map((customer, i) => (
                          <ListItem key={i} disablePadding disableGutters>
                            <Typography variant="body2">
                              {customer.firstName} {customer.lastName}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BaggagePolicyCard />
                </Grid>
              </Grid>
            ) : null}
          </AccordionDetails>
        </Accordion>
        {!confirmed && (
          <>
            {activeStep > 0 && (
              <Accordion
                ref={passengersRef}
                expanded={passengersExpanded === "passengers"}
                onChange={handleChange("passengers")}
                sx={{
                  minWidth: {
                    xs: "100%",
                    sm: "100%",
                    md: "900px",
                    lg: "1200px",
                  },
                  maxWidth: "lg",
                  alignSelf: "center",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <PersonIcon />
                  <Typography
                    fontSize="16px"
                    sx={{ marginLeft: "10px", flexShrink: 0 }}
                  >
                    Passenger Details
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ paddingX: { xs: "0px", sm: "15px" } }}>
                  <form id="passenger-form" name="passenger-form">
                    {[...Array(parseInt(urlParams.passengers)).keys()].map(
                      (i) => (
                        <PassengerDetails
                          key={i}
                          index={i}
                          details={{ state: passengers, setter: setPassengers }}
                          submitted={submitted}
                          setIsPassengerFormsValid={setIsPassengerFormsValid}
                          passengerCount={passengerCount}
                          savedPassengers={{
                            state: savedPassengers,
                            setter: setSavedPassengers,
                          }}
                        />
                      )
                    )}
                  </form>
                </AccordionDetails>
              </Accordion>
            )}
            {activeStep === 2 && (
              <>
                <PaymentCard
                  sx={{ alignSelf: "center", paddingX: "0px!important" }}
                />
                <TotalCard
                  sx={{
                    alignSelf: "center",
                    marginTop: "0px!important",
                    paddingX: "0px!important",
                  }}
                  selection={selection}
                  handleSubmit={handleSubmit}
                />
              </>
            )}
          </>
        )}
      </Stack>
      {!(outboundExpanded || inboundExpanded) &
      selectionDone &
      (activeStep !== 2) ? (
        <Fab
          onClick={() => {
            handleContinue();
          }}
          variant="extended"
          color="primary"
          sx={{
            position: "sticky",
            maxWidth: "40vw",
            width: "100%",
            right: "30%",
            left: "30%",
            bottom: "20px",
            margin: "0 auto",
            marginTop: "40px",
            borderRadius: "5px",
          }}
        >
          Continue
          <NavigateNextIcon sx={{ borderRadius: "5px" }} />
        </Fab>
      ) : null}
      {/* <Couple
        style={{
          position: "absolute",
          bottom: "-20",
          right: "0",
          overflow: "hidden",
        }}
      /> */}
    </Box>
  );
}
