import {
  Grid,
  Typography,
  CardActionArea,
  CardContent,
  Collapse,
  useTheme,
  useMediaQuery,
  Chip,
  Box,
  Paper,
} from "@mui/material";
import Slider, { SliderThumb, SliderMark } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import TripDetailsTable from "./tripDetailsTable";
import PropTypes from "prop-types";
import { icons } from "../images/Icons.js";
import { useContext } from "react";
import SearchContext from "../contexts/searchContext";
import FlightIcon from "@mui/icons-material/Flight";
import SimpleMap from "./map";
import { useLocation } from "react-router-dom";

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: "#005EB8!important",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-mark": {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    borderRadius: "50%",
    marginLeft: -5,
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-markLabel": {
    color: theme.palette.text.primary,
    fontSize: 15,
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#005EB8!important",
  },
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    background: "transparent!important",
    ":before": {
      boxShadow: "none",
    },
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <ExpandMoreIcon {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CustomMark(props) {
  const { children, ...other } = props;
  return (
    <SliderMark {...other}>
      {children}
      <Typography sx={{ marginTop: "-15px" }} fontSize="15px" color="gray">
        adsfasdf
      </Typography>
    </SliderMark>
  );
}

CustomMark.propTypes = {
  children: PropTypes.node,
};

function CustomThumb(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <FlightIcon
        sx={{
          transform: "rotate(90deg)",
          color: "primary.main",
          height: "20px",
          width: "20px",
        }}
      />
    </SliderThumb>
  );
}

CustomThumb.propTypes = {
  children: PropTypes.node,
};

export default function TripMap(props) {
  const { expanded, handleExpandClick } = props.expanded;
  const { printExpanded } = useContext(SearchContext);
  const location = useLocation();

  let marks = [
    ...props.data?.flights?.map((flight, i) => {
      return {
        value: i * (100 / props.data.flightCount),
        label: flight.sourceAirport,
      };
    }),
    {
      value: 100,
      label:
        props.data.flights[props.data.flights.length - 1].destinationAirport,
    },
  ];
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isAboveLG = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <CardActionArea
        className={`${props.type}-panel`}
        onClick={() => {
          handleExpandClick(`${props.type}-panel-${props.index}`);
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "116px",
          textAlign: "center",
        }}
      >
        <Grid
          container
          sx={{
            paddingX: { xs: "4px", sm: "10px" },
          }}
        >
          <Grid item xs={12}>
            <Typography fontSize="16px">{props.data.duration}</Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            xs={12}
          >
            <Grid item>
              <Typography width="70px" fontSize="16px" fontWeight="bold">
                {dayjs(props.data.flights[0].departureTime).format("h:mm A")}
              </Typography>
            </Grid>
            {props.data.layoverDurations &&
              props.data.layoverDurations.map((layover, i) =>
                i > 0 ? (
                  <Grid item key={i}>
                    <Typography width="70px" fontSize="15px" color="gray">
                      {layover}
                    </Typography>
                  </Grid>
                ) : null
              )}
            <Grid item>
              <Typography width="70px" fontSize="16px" fontWeight="bold">
                {dayjs(
                  props.data.flights[props.data.flightCount - 1].arrivalTime
                ).format("h:mm A")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ paddingX: "30px", marginTop: "-10px" }}>
            <IOSSlider
              disabled
              track="normal"
              slots={{ thumb: CustomThumb }}
              defaultValue={props.data?.flights?.map((flight, i) => {
                return (
                  i * (100 / props.data.flightCount) +
                  100 / (props.data.flightCount * 2)
                );
              })}
              marks={marks}
            />
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center">
          <Grid item container xs={4} direction="row" alignItems="center">
            <ExpandMore
              expand={expanded === `${props.type}-panel-${props.index}`}
            />
            <Typography
              fontWeight="bold"
              fontSize="14px"
              textAlign="end"
              color={
                props.data.flights.some(
                  (flight) => flight.checkInOpen && !flight.checkedIn
                )
                  ? "green"
                  : ""
              }
            >
              {props.mode !== "checkin"
                ? "Details"
                : isAboveSM
                ? "Details / Check-in"
                : "Check-in"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              fontSize="15px"
              color="gray"
              sx={{ marginTop: "-20px" }}
            >
              {props.data.flightCount > 1
                ? `${props.data.flightCount - 1}  Stop${
                    props.data.flightCount - 1 > 1 ? "s" : ""
                  }`
                : "Nonstop"}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "end" }}>
            {(props.type === "summary" || props.showSection) &&
            props.data?.flights[0].seatSection ? (
              <Chip
                label={props.data?.flights[0].seatSection}
                color="secondary"
                size="small"
                sx={{ marginTop: "-10px" }}
              />
            ) : props.type === "summary" && props.data?.selection ? (
              <Chip
                label={
                  props.data?.selection.charAt(0).toUpperCase() +
                  props.data?.selection.slice(1)
                }
                color="secondary"
                size="small"
                sx={{ marginTop: "-10px" }}
              />
            ) : null}
          </Grid>
        </Grid>
      </CardActionArea>
      <Collapse
        in={expanded === `${props.type}-panel-${props.index}` || printExpanded}
        timeout={50}
        unmountOnExit
        sx={{
          position: "relative",
        }}
      >
        <CardContent sx={{ padding: "0px!important" }}>
          <TripDetailsTable
            data={props.data}
            airports={props.airports}
            mode={props.mode}
            handleCheckIn={props.handleCheckIn}
            itineraryId={props.itineraryId}
          />
        </CardContent>
        {isAboveLG && location.pathname.startsWith("/flights/search") && (
          <Paper
            sx={{
              height: "97%",
              position: "absolute",
              bottom: "0",
              right: "-393px",
              zIndex: "30",
              borderRadius: "5px 5px 5px 5px!important",
              overflow: "hidden",
            }}
          >
            <SimpleMap marks={marks} />
          </Paper>
        )}
      </Collapse>
    </>
  );
}
