import { useEffect, useReducer } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Stack, TextField, Paper, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function PaymentCard(props) {
  const initialForm = {
    cardNumber: "",
    expration: null,
    cvv: "",
    birthdate: null,
    name: "",
  };

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialForm
  );

  useEffect(() => {
    console.log("CARD INPUT", formInput);
  }, [formInput]);

  return (
    <Container maxWidth="lg" {...props}>
      <Paper
        variant="outlined"
        sx={{
          marginTop: "20px",
          marginBottom: { xs: "0px", sm: "20px" },
          padding: "15px",
          flexGrow: 1,
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          rowSpacing={2}
          columnSpacing={2}
          marginBottom={2}
        >
          <Grid item xs={12} sm={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CreditCardIcon />
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                Payment
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              id="cardNo-input"
              label="Card Number"
              placeholder="Card Number"
              value={formInput.cardNumber}
              onChange={(event) => {
                setFormInput({ cardNumber: event.target.value });
              }}
              inputProps={{
                type: "tel",
                inputMode: "numeric",
                pattern: "[0-9s]{13,19}",
                autoComplete: "cc-number",
                maxength: "19",
                placeholder: "xxxx xxxx xxxx xxxx",
              }}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <DatePicker
              id="expration-input"
              label="Expration Date"
              format="MM/YY"
              value={formInput.expration}
              onChange={(newValue) => {
                setFormInput({ expration: newValue });
              }}
              sx={{ width: "100%" }}
              size="large"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="ccv-input"
              label="CCV"
              value={formInput.ccv}
              onChange={(event) => {
                setFormInput({ ccv: event.target.value });
              }}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={10} sm={10}>
            <TextField
              id="name-input"
              label="Name on Card"
              value={formInput.name}
              onChange={(event) => {
                setFormInput({ name: event.target.value });
              }}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid
            item
            xs={2}
            sm={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <img
              src={require("../images/visa-mastercard.png")}
              alt="cardlogos"
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
