import { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  Grow,
  Popper,
  ClickAwayListener,
  ButtonGroup,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import dayjs from "dayjs";

export default function SortingPanel(props) {
  const [selection, setSelection] = useState("stops");
  const { data, setData } = props.data;
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const options = [
    { id: "stops", label: "Stops" },
    { id: "price-economy", label: "Price: Economy" },
    { id: "price-business", label: "Price: Business" },
    { id: "duration", label: "Duration" },
    { id: "departure-time", label: "Departure Time" },
    { id: "arrival-time", label: "Arrival Time" },
  ];

  const handleSelection = (event, newSelection) => {
    if (newSelection !== null) {
      setSelection(newSelection);
    }
    setOpen(false);
    props.setIsLoading(true);
    switch (newSelection) {
      case "stops":
        sortByStops().then((res) => props.setIsLoading(false));
        break;
      case "price-economy":
        sortByPriceEconomy().then((res) => props.setIsLoading(false));
        break;
      case "price-business":
        sortByPriceBusiness().then((res) => props.setIsLoading(false));
        break;
      case "duration":
        sortByDuration().then((res) => props.setIsLoading(false));
        break;
      case "departure-time":
        sortByDepartureTime().then((res) => props.setIsLoading(false));
        break;
      case "arrival-time":
        sortByArrivalTime().then((res) => props.setIsLoading(false));
        break;
      default:
        props.setIsLoading(false);
        break;
    }
  };

  const sortByStops = async () => {
    await data.outboundTrips.sort((a, b) => a.flightCount - b.flightCount);
    if (data.inboundTrips) {
      await data.inboundTrips.sort((a, b) => a.flightCount - b.flightCount);
    }
  };

  const sortByPriceEconomy = async () => {
    await data.outboundTrips.sort(
      (a, b) => a.totalEconomyCost - b.totalEconomyCost
    );
    if (data.inboundTrips) {
      await data.inboundTrips.sort(
        (a, b) => a.totalEconomyCost - b.totalEconomyCost
      );
    }
  };

  const sortByPriceBusiness = async () => {
    await data.outboundTrips.sort(
      (a, b) => a.totalBusinessCost - b.totalBusinessCost
    );
    if (data.inboundTrips) {
      await data.inboundTrips.sort(
        (a, b) => a.totalBusinessCost - b.totalBusinessCost
      );
    }
  };

  function convertDurationToMinutes(durationString) {
    const [hours = "0", minutes = "0"] = durationString.split(/[hm ]+/);
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);
    const totalMinutes = hoursInt * 60 + minutesInt;
    return totalMinutes;
  }

  const sortByDuration = async () => {
    await data.outboundTrips.sort(
      (a, b) =>
        convertDurationToMinutes(a.duration) -
        convertDurationToMinutes(b.duration)
    );
    if (data.inboundTrips) {
      await data.inboundTrips.sort(
        (a, b) =>
          convertDurationToMinutes(a.duration) -
          convertDurationToMinutes(b.duration)
      );
    }
  };

  const sortByDepartureTime = async () => {
    await data.outboundTrips.sort((a, b) =>
      dayjs(a.flights[0].departureTime).diff(
        dayjs(b.flights[0].departureTime),
        "minute"
      )
    );
    if (data.inboundTrips) {
      await data.inboundTrips.sort((a, b) =>
        dayjs(a.flights[0].departureTime).diff(
          dayjs(b.flights[0].departureTime),
          "minute"
        )
      );
    }
  };

  const sortByArrivalTime = async () => {
    await data.outboundTrips.sort((a, b) =>
      dayjs(a.flights[0].arrivalTime).diff(
        dayjs(b.flights[0].arrivalTime),
        "minute"
      )
    );
    if (data.inboundTrips) {
      await data.inboundTrips.sort((a, b) =>
        dayjs(a.flights[0].arrivalTime).diff(
          dayjs(b.flights[0].arrivalTime),
          "minute"
        )
      );
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return isAboveSM ? (
    <Container maxWidth="lg" sx={{ ...props.sx }}>
      <Grid container alignItems="center" columnSpacing={2} columns={14}>
        <Grid item sm="auto">
          <Typography variant="h6" fontWeight="" color="primary">
            Sort by
          </Typography>
        </Grid>
        <Grid item sm={13}>
          <ToggleButtonGroup
            color="primary"
            value={selection}
            exclusive
            fullWidth
            onChange={handleSelection}
            sx={{
              width: "100%",
              height: "40px",
              "& .MuiToggleButton-root": {
                textTransform: "initial!important",
                fontSize: "15px",
              },
            }}
          >
            <ToggleButton value="stops">Stops</ToggleButton>
            <ToggleButton value="price-economy">Price: Economy</ToggleButton>
            <ToggleButton value="price-business">Price: Business</ToggleButton>
            <ToggleButton value="duration">Duration</ToggleButton>
            <ToggleButton value="departure-time">Departure Time</ToggleButton>
            <ToggleButton value="arrival-time">Arrival Time</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Container
      maxWidth="lg"
      sx={{
        ...props.sx,
        marginTop: "15px!important",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        columnSpacing={1}
        columns={14}
      >
        <Grid item xs="auto" sm={1}>
          <Typography variant="h6" fontWeight="" align="right" color="primary">
            Sort by
          </Typography>
        </Grid>
        <Grid item xs="auto" sm={13}>
          <ButtonGroup
            variant="outlined"
            ref={anchorRef}
            sx={{
              "& .MuiButton-root": {
                textTransform: "initial!important",
                fontSize: "15px",
              },
            }}
          >
            <Button onClick={handleToggle}>
              {options.find((e) => e.id === selection).label}
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Box>
                  <ClickAwayListener onClickAway={handleClose}>
                    <ToggleButtonGroup
                      color="primary"
                      orientation="vertical"
                      value={selection}
                      exclusive
                      fullWidth
                      onChange={handleSelection}
                      sx={{
                        width: "100%",
                        height: "40px",
                        "& .MuiToggleButton-root": {
                          textTransform: "initial!important",
                          fontSize: "15px",
                          backgroundColor: "white.main",
                        },
                        "& .MuiToggleButton-root.Mui-selected": {
                          backgroundColor: "white.main",
                        },
                        "& .MuiToggleButton-root.Mui-selected:hover": {
                          backgroundColor: "secondary.main",
                        },
                        "& .MuiToggleButton-root:hover": {
                          backgroundColor: "secondary.main",
                        },
                      }}
                    >
                      <ToggleButton value="stops">Stops</ToggleButton>
                      <ToggleButton value="price-economy">
                        Price: Economy
                      </ToggleButton>
                      <ToggleButton value="price-business">
                        Price: Business
                      </ToggleButton>
                      <ToggleButton value="duration">Duration</ToggleButton>
                      <ToggleButton value="departure-time">
                        Departure Time
                      </ToggleButton>
                      <ToggleButton value="arrival-time">
                        Arrival Time
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </ClickAwayListener>
                </Box>
              </Grow>
            )}
          </Popper>
        </Grid>
      </Grid>
    </Container>
  );
}
