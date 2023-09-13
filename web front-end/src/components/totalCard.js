import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Stack, Box, Paper, Typography, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";

export default function TotalCard(props) {
  let urlParams = useParams();
  const [total, setTotal] = useState({ flightTotal: 0, tax: 0, total: 0 });
  let passengerCount = parseInt(urlParams.passengers);

  useEffect(() => {
    calculateTotal();
  }, []);

  const calculateTotal = () => {
    let total = 0;

    props.selection.outbound.flights.forEach((flight) => {
      if (props.selection.outbound.selection === "economy") {
        total += flight.economyPrice;
      } else if (props.selection.outbound.selection === "business") {
        total += flight.businessPrice;
      }
    });
    if (props.selection.inbound) {
      props.selection.inbound.flights.forEach((flight) => {
        if (props.selection.inbound.selection === "economy") {
          total += flight.economyPrice;
        } else if (props.selection.inbound.selection === "business") {
          total += flight.businessPrice;
        }
      });
    }
    setTotal({
      flightTotal: total,
      tax: total * passengerCount * 0.1,
      total: total * passengerCount * 1.1,
    });
  };

  return (
    <Container maxWidth="lg" sx={props.sx}>
      <Paper
        variant="outlined"
        sx={{
          marginY: { xs: "0px", sm: "20px" },
          padding: "15px",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          columnSpacing={2}
          rowSpacing={1}
          columns={14}
        >
          <Grid item xs={14} sm={2}>
            <Stack direction="column" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold" sx={{}}>
                Trip Total
              </Typography>
              <Typography>{urlParams.passengers} passengers</Typography>
            </Stack>
          </Grid>
          <Grid item xs={14} sm={3}>
            <Paper
              variant="outlined"
              sx={{ paddingX: "8px", paddingY: "12px" }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography>Flights</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>
                    ${total.flightTotal.toFixed(2)} x {passengerCount}{" "}
                  </Typography>
                  <PersonIcon />
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={14} sm={3}>
            <Paper
              variant="outlined"
              sx={{ paddingX: "8px", paddingY: "12px" }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography>Taxes & Fees</Typography>
                <Typography>${total.tax.toFixed(2)}</Typography>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={14} sm={3}>
            <Paper
              variant="outlined"
              sx={{ paddingX: "8px", paddingY: "12px" }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="bold">Amount Due</Typography>
                <Typography fontWeight="bold" sx={{}}>
                  ${total.total.toFixed(2)}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={14} sm={3}>
            <Button
              onClick={props.handleSubmit}
              variant="contained"
              size="large"
              sx={{ width: "100%" }}
            >
              COMPLETE BOOKING
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
