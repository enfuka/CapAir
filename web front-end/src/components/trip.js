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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { Container, Backdrop } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Spinner from "../images/spinner";
import TableSkeleton from "../components/tableSkeleton";
import MyTripTable from "../components/myTripTable";
import PersonIcon from "@mui/icons-material/Person";
import { icons } from "../images/Icons";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import NotesIcon from "@mui/icons-material/Notes";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Trip(props) {
  const [checkInOpen, setCheckInOpen] = useState(false);

  useEffect(() => {
    findCheckInOpen();
  }, []);

  const findCheckInOpen = () => {
    if (props.data.itinerary.isRoundTrip) {
      if (
        props.data.outboundTrip.flights.find(
          (flight) => flight.checkInOpen && !flight.checkedIn
        ) ||
        props.data.inboundTrip.flights.find(
          (flight) => flight.checkInOpen && !flight.checkedIn
        )
      ) {
        setCheckInOpen(true);
      }
    } else if (
      props.data.outboundTrip.flights.find(
        (flight) => flight.checkInOpen && !flight.checkedIn
      )
    ) {
      setCheckInOpen(true);
    }
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Typography>{props.data.itinerary.srcAirport}</Typography>
            {props.data.itinerary.isRoundTrip ? (
              <MultipleStopIcon />
            ) : (
              <ArrowRightAltIcon />
            )}
            <Typography>{props.data.itinerary.destAirport}</Typography>
            <Typography fontSize="13px" alignSelf="center" ml="20px!important">
              {dayjs(props.data.outboundTrip.flights[0].departureTime).format(
                "MMMM D, YYYY"
              )}
            </Typography>
          </Stack>
          {checkInOpen ? (
            <Chip label="Check-in Open" color="success" size="small" />
          ) : null}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {props.isLoading ? (
          <TableSkeleton />
        ) : props.data?.outboundTrip?.flights.length === 0 ? (
          <p>No bookings found for this confirmation number and last name</p>
        ) : (
          <MyTripTable
            type="OUTBOUND"
            data={props.data}
            mode="checkin"
            handleCheckIn={props.handleCheckIn}
            airports={props.airports}
            showSection={true}
          />
        )}
        {!props.isLoading && props.data?.itinerary.isRoundTrip ? (
          <MyTripTable
            type="INBOUND"
            data={props.data}
            mode="checkin"
            handleCheckIn={props.handleCheckIn}
            airports={props.airports}
            showSection={true}
          />
        ) : null}
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardHeader
                disableTypography
                title={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon />
                    <Typography variant="h7" sx={{}}>
                      Passengers
                    </Typography>
                  </Stack>
                }
                titleTypographyProps={{ fontSize: "20px" }}
                sx={{ paddingY: "10px!important" }}
              />
              <Divider />
              <CardContent sx={{ paddingY: "0px!important" }}>
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {props.data?.customers?.map((customer, i) => (
                    <ListItem key={i} disablePadding disableGutters>
                      <Typography variant="body2" color="text.secondary">
                        {customer.firstName} {customer.lastName}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardHeader
                disableTypography
                title={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <NotesIcon />
                    <Typography variant="h7" sx={{}}>
                      Details
                    </Typography>
                  </Stack>
                }
                titleTypographyProps={{ fontSize: "20px" }}
                sx={{ paddingY: "10px!important" }}
              />
              <Divider />
              <CardContent sx={{ paddingY: "0px!important" }}>
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  <ListItem disablePadding disableGutters>
                    <Typography variant="body2" color="text.secondary">
                      {props.data?.itinerary?.isRoundTrip
                        ? "Round Trip"
                        : "One Way Trip"}
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding disableGutters>
                    <Typography variant="body2" color="text.secondary">
                      Confirmation number: {props.data?.itinerary?.itineraryId}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
