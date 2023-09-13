import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TableBody } from "@mui/material";
import { Container } from "@mui/material";
import dayjs from "dayjs";
import TripMap from "./tripMap";
import {
  CardHeader,
  CardContent,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation } from "react-router-dom";

export default function MyTripTable(props) {
  const [expanded, setExpanded] = useState(false);
  const tableRef = useRef(null);
  let location = useLocation();

  let trip =
    props.type === "OUTBOUND"
      ? props.data.outboundTrip
      : props.data.inboundTrip;

  let index = props.type === "OUTBOUND" ? 0 : 1;

  useEffect(() => {
    handleExpandClick(`${props.type}-panel-${index}`);
    if (location.pathname === "/dashboard") {
      setExpanded(false);
    }
  }, []);

  const getAirportByCode = (code) =>
    props.airports.find((airport) => airport.id === code);

  const handleExpandClick = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };

  return (
    <Container
      ref={tableRef}
      maxWidth="lg"
      sx={{
        flexGrow: 1,
        alignSelf: "center",
        paddingX: { xs: "0px" },
      }}
    >
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            padding: "0px",
            paddingY: "10px",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell className="title-cell" sx={{ paddingBottom: "0px" }}>
              <Grid container sx={{}} columnSpacing={1} columns={12}>
                <Grid item container sm={12} xs={12}>
                  <Card
                    elevation={0}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.0)",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    <Typography
                      alignSelf="center"
                      justifySelf="start"
                      fontSize={{ xs: "16px", sm: "20px" }}
                    >
                      {props.type === "OUTBOUND"
                        ? `${
                            getAirportByCode(props.data.itinerary.srcAirport)
                              .city
                          } to ${
                            getAirportByCode(props.data.itinerary.destAirport)
                              .city
                          } on 
                          ${dayjs(trip.flights[0].departureTime).format(
                            "MMMM D, YYYY"
                          )} :`
                        : `${
                            getAirportByCode(props.data.itinerary.destAirport)
                              .city
                          } to ${
                            getAirportByCode(props.data.itinerary.srcAirport)
                              .city
                          } on 
                      ${dayjs(trip.flights[0].departureTime).format(
                        "MMMM D, YYYY"
                      )} :`}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ width: "100%" }}>
            <TableCell>
              <Grid
                container
                sx={{ marginBottom: "5px" }}
                columnSpacing={1}
                rowSpacing={0}
                columns={12}
              >
                <Grid item sm={12} xs={12}>
                  <TripMap
                    data={trip}
                    itineraryId={props.data.itinerary.itineraryId}
                    type={props.type}
                    mode={props.mode}
                    handleCheckIn={props.handleCheckIn}
                    expanded={{ expanded, handleExpandClick }}
                    index={index}
                    airports={props.airports}
                    showSection={true}
                  />
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}
