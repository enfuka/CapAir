import { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import {
  Box,
  Button,
  CardActionArea,
  Chip,
  TableBody,
  useMediaQuery,
  useTheme,
  Tooltip,
  Stack,
} from "@mui/material";
import { Container, Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import dayjs from "dayjs";
import TripMap from "./tripMap";
import DaySkipper from "./daySkipper";
import executeScrollWithOffset from "../utilities/executeScrollWithOffset";
import SectionDetails from "./sectionDetails";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function TripTable(props) {
  const [expanded, setExpanded] = useState(false);
  const [selection, setSelection] = useState(props.selection);
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const tableRef = useRef(null);
  const [lowestPrice, setLowestPrice] = useState(999999);

  useEffect(() => {
    findTheCheapestPrice();
    setTimeout(() => {
      setHeader();
    }, 300);
    !isAboveSM &&
      setTimeout(() => {
        props.expanded.state && executeScrollWithOffset(tableRef, 60);
      }, 1000);
  }, [props.expanded.state]);

  const getAirportByCode = (code) =>
    props.airports.find((airport) => airport.id === code);

  const handleExpandClick = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };

  const [headerWidth, setheaderWidth] = useState(undefined);
  const [stickyHeaderTop, setstickyHeaderTop] = useState(undefined);

  const setHeader = () => {
    try {
      const headerElement = document
        .querySelector(".stickyHeader")
        .getBoundingClientRect();
      setheaderWidth(headerElement.width);
      setstickyHeaderTop(headerElement.top);
    } catch (error) {
      console.error("STICKY HEADER", error);
    }
  };

  useEffect(() => {
    if (!stickyHeaderTop) return;

    window.addEventListener("scroll", isSticky);
    window.addEventListener("resize", isResize);
    return () => {
      window.removeEventListener("scroll", isSticky);
      window.removeEventListener("resize", isResize);
    };
  }, [stickyHeaderTop]);

  const isResize = (e) => {
    try {
      setheaderWidth(
        document.querySelector(".top-title-cell").getBoundingClientRect().width
      );
    } catch (error) {
      console.error("STICKY HEADER", error);
    }
  };

  const isSticky = (e) => {
    try {
      const headerElement = document.querySelector(".stickyHeader");
      const scrollTop = window.scrollY;
      if (scrollTop >= stickyHeaderTop + 20) {
        headerElement.classList.add("is-sticky");
      } else {
        headerElement.classList.remove("is-sticky");
      }
    } catch (error) {
      console.error("STICKY HEADER", error);
    }
  };

  const findTheCheapestPrice = () => {
    let cheapestPrice = 999999;
    try {
      props.data.forEach((data) => {
        if (data.totalEconomyCost < cheapestPrice) {
          cheapestPrice = data.totalEconomyCost;
        }
      });
    } catch (error) {
      console.error("CHEAPEST PRICE", error);
    }
    setLowestPrice(cheapestPrice);
  };

  return (
    <Container
      ref={tableRef}
      maxWidth="lg"
      sx={{
        marginTop: "2vh",
        flexGrow: 1,
        alignSelf: "center",
        paddingX: { xs: "0px" },
      }}
    >
      <Accordion
        expanded={props.expanded.state}
        variant={props.expanded.state ? "outlined" : "elevation"}
        sx={{
          padding: "15px",
          backgroundColor: "white",
        }}
        TransitionProps={{ unmountOnExit: true }}
      >
        {!props.expanded.state && (
          <AccordionSummary
            sx={{
              display: "flex",
              padding: 0,
            }}
          >
            <Grid id="summary-grid" container>
              <Grid
                container
                item
                direction="row"
                justifyContent="space-between"
                xs={12}
              >
                <Typography
                  alignSelf="center"
                  justifySelf="start"
                  marginLeft={1}
                  fontSize={{ xs: "17px", sm: "20px" }}
                >
                  {props.type === "OUTBOUND"
                    ? `${getAirportByCode(props.urlParams.source).city} to ${
                        getAirportByCode(props.urlParams.destination).city
                      } on 
                          ${dayjs(props.urlParams.departureDate).format(
                            "MMMM D"
                          )}`
                    : `${
                        getAirportByCode(props.urlParams.destination).city
                      } to ${getAirportByCode(props.urlParams.source).city} on 
                      ${dayjs(props.urlParams.returnDate).format("MMMM D")}`}
                </Typography>
                <Chip
                  label={props.type}
                  color={props.type === "OUTBOUND" ? "error" : "success"}
                  size="small"
                />
              </Grid>
              <Grid item xs={props.confirmed ? 12 : 10}>
                <Card elevation={0} sx={{}}>
                  {selection && (
                    <TripMap
                      data={selection}
                      type={"summary"}
                      expanded={{ expanded, handleExpandClick }}
                      airports={props.airports}
                    />
                  )}
                </Card>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                xs={2}
              >
                {!props.confirmed && (
                  <Button
                    variant="contained"
                    startIcon={<EditIcon sx={{ marginLeft: { xs: "10px" } }} />}
                    onClick={() => {
                      props.expanded.setter(true);
                      props.activeStep.setter(0);
                    }}
                  >
                    {isAboveSM ? "Change Flight" : ""}
                  </Button>
                )}
              </Grid>
            </Grid>
          </AccordionSummary>
        )}
        <AccordionDetails sx={{ padding: "0px" }}>
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                padding: "0px",
                paddingY: "10px",
              },
              [`& .${tableCellClasses.head}`]: {
                borderBottom: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  className="title-cell top-title-cell"
                  sx={{ paddingBottom: "10px!important" }}
                >
                  <Grid container columnSpacing={1} columns={12}>
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
                          marginLeft={1}
                          fontSize={{ xs: "17px", sm: "20px" }}
                        >
                          {props.type === "OUTBOUND"
                            ? `${
                                getAirportByCode(props.urlParams.source).city
                              } to ${
                                getAirportByCode(props.urlParams.destination)
                                  .city
                              } on 
                          ${dayjs(props.urlParams.departureDate).format(
                            "MMMM D"
                          )}`
                            : `${
                                getAirportByCode(props.urlParams.destination)
                                  .city
                              } to ${
                                getAirportByCode(props.urlParams.source).city
                              } on 
                      ${dayjs(props.urlParams.returnDate).format("MMMM D")}`}
                        </Typography>
                      </Card>
                      <DaySkipper
                        urlParams={props.urlParams}
                        type={props.type}
                      />
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
              {isAboveSM && (
                <TableRow>
                  <TableCell
                    className="stickyHeader title-cell"
                    sx={{ paddingBottom: "0px", width: headerWidth }}
                  >
                    <Grid
                      container
                      sx={{}}
                      columnSpacing={1}
                      rowSpacing={1}
                      columns={12}
                    >
                      <Grid item sm={8} xs={12}></Grid>
                      <Grid item sm={2} xs={6}>
                        <Card
                          sx={{
                            backgroundColor: "primary.main",
                            height: "40px",
                            display: "grid",
                            alignItems: "center",
                            justifyItems: "center",
                            borderRadius: "4px 4px 0px 0px",
                          }}
                        >
                          <Typography
                            align="center"
                            fontSize="22px"
                            color="#FFFFFF"
                            sx={{}}
                          >
                            Economy
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item sm={2} xs={6}>
                        <Card
                          sx={{
                            backgroundColor: "primary.main",
                            height: "40px",
                            display: "grid",
                            alignItems: "center",
                            justifyItems: "center",
                            borderRadius: "4px 4px 0px 0px",
                          }}
                        >
                          <Typography
                            align="center"
                            fontSize="22px"
                            color="#FFFFFF"
                            sx={{}}
                          >
                            Business
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {props.data &&
                props.data.map((data, index) => (
                  <TableRow key={index} sx={{ width: "100%" }} hover>
                    <TableCell>
                      <Grid
                        container
                        sx={{ marginBottom: "5px" }}
                        columnSpacing={1}
                        rowSpacing={0}
                        columns={12}
                      >
                        <Grid item sm={8} xs={12}>
                          <Card
                            sx={{
                              borderRadius: {
                                xs: "4px 4px 0px 0px",
                                sm: "4px 4px 4px 4px",
                              },
                              overflow: "visible!important",
                            }}
                          >
                            <TripMap
                              data={data}
                              type={props.type}
                              expanded={{ expanded, handleExpandClick }}
                              index={index}
                              airports={props.airports}
                            />
                          </Card>
                        </Grid>
                        <Grid item sm={2} xs={6}>
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              alignItems: "center",
                              borderRadius: {
                                xs: "0px 0px 4px 4px",
                                sm: "4px 4px 4px 4px",
                              },
                              "& .MuiButtonBase-root:hover": {
                                outline: "1px solid",
                                outlineColor: "primary.main",
                                outlineOffset: "-1px",
                              },
                              "& button:disabled": {
                                opacity: "0.5",
                              },
                            }}
                          >
                            {!isAboveSM && (
                              <Box
                                sx={{
                                  backgroundColor: "primary.main",
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography fontSize="12px" color="white.main">
                                  Economy
                                </Typography>
                              </Box>
                            )}

                            <CardActionArea
                              onClick={() => {
                                handleExpandClick(`${index}-econ`);
                              }}
                              disabled={
                                data.availableSeats.economy <
                                parseInt(props.urlParams.passengers)
                              }
                              disableRipple
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "start",
                                paddingX: "20px",
                                paddingY: "10px",
                                minHeight: "120px",
                              }}
                            >
                              <Box>
                                <Typography fontSize="12px" color="gray">
                                  Per passenger:
                                </Typography>
                                <Typography fontWeight="bold" fontSize="25px">
                                  ${data.totalEconomyCost}
                                </Typography>
                              </Box>
                              {data.totalEconomyCost === lowestPrice && (
                                <div className="ribbon-horizontal">
                                  <span>Lowest Price</span>
                                </div>
                              )}
                              <Typography fontSize="12px" color="red">
                                {data.availableSeats.economy === 0
                                  ? "No seats left"
                                  : `${data.availableSeats.economy} seat${
                                      data.availableSeats.economy > 1 ? "s" : ""
                                    } left`}
                              </Typography>
                            </CardActionArea>
                            <Collapse
                              in={expanded === `${index}-econ`}
                              timeout={50}
                              sx={{
                                width: "100%",
                              }}
                            >
                              <CardContent
                                sx={{
                                  padding: "0px",
                                  direction: "column",
                                  display: "grid",
                                  gap: "10px",
                                }}
                              >
                                <Box sx={{ paddingLeft: "20px" }}>
                                  <SectionDetails />
                                </Box>
                                <Button
                                  sx={{
                                    paddingX: "30px",
                                    maxWidth: "60%",
                                    justifySelf: "center",
                                  }}
                                  size="small"
                                  variant="contained"
                                  onClick={() => {
                                    data.selection = "economy";
                                    setSelection(data);
                                    props.handleSelect(data);
                                  }}
                                >
                                  Select
                                </Button>
                              </CardContent>
                            </Collapse>
                          </Card>
                        </Grid>
                        <Grid item sm={2} xs={6}>
                          <Card
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              alignItems: "center",
                              borderRadius: {
                                xs: "0px 0px 4px 4px",
                                sm: "4px 4px 4px 4px",
                              },
                              "& .MuiButtonBase-root:hover": {
                                outline: "1px solid",
                                outlineColor: "primary.main",
                                outlineOffset: "-1px",
                              },
                              "& button:disabled": {
                                opacity: "0.5",
                              },
                            }}
                          >
                            {!isAboveSM && (
                              <Box
                                sx={{
                                  backgroundColor: "primary.main",
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography fontSize="12px" color="white.main">
                                  Business
                                </Typography>
                              </Box>
                            )}
                            <CardActionArea
                              onClick={() => {
                                handleExpandClick(`${index}-bus`);
                              }}
                              disabled={
                                data.availableSeats.business <
                                parseInt(props.urlParams.passengers)
                              }
                              disableRipple
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "start",
                                paddingX: "20px",
                                paddingY: "10px",
                                minHeight: "120px",
                              }}
                            >
                              <Box>
                                <Typography fontSize="12px" color="gray">
                                  Per passenger:
                                </Typography>
                                <Typography fontWeight="bold" fontSize="25px">
                                  ${data.totalBusinessCost}
                                </Typography>
                              </Box>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <FlightClassIcon fontSize="12px" />
                                <Typography fontSize="12px">
                                  Maximum comfort
                                </Typography>
                              </Stack>
                              <Typography fontSize="12px" color="red">
                                {data.availableSeats.business === 0
                                  ? "No seats left"
                                  : `${data.availableSeats.business} seat${
                                      data.availableSeats.business > 1
                                        ? "s"
                                        : ""
                                    } left`}
                              </Typography>
                            </CardActionArea>
                            <Collapse
                              in={expanded === `${index}-bus`}
                              timeout={50}
                              sx={{
                                width: "100%",
                              }}
                            >
                              <CardContent
                                sx={{
                                  padding: "0px",
                                  direction: "column",
                                  display: "grid",
                                  gap: "10px",
                                }}
                              >
                                <Box sx={{ paddingLeft: "20px" }}>
                                  <SectionDetails type="business" />
                                </Box>
                                <Button
                                  sx={{
                                    paddingX: "30px",
                                    maxWidth: "60%",
                                    justifySelf: "center",
                                  }}
                                  size="small"
                                  variant="contained"
                                  onClick={() => {
                                    data.selection = "business";
                                    setSelection(data);
                                    props.handleSelect(data);
                                  }}
                                >
                                  Select
                                </Button>
                              </CardContent>
                            </Collapse>
                          </Card>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
