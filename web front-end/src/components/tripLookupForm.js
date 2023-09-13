import { useState, useReducer } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Button, TextField } from "@mui/material";
import CapAirIcon from "../images/capAirIcon.js";
import InputAdornment from "@mui/material/InputAdornment";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BadgeIcon from "@mui/icons-material/Badge";
import { useParams } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

export default function TripLookupForm(props) {
  const navigate = useNavigate();
  const URLparams = useParams();
  const isAuthenticated = useIsAuthenticated();

  const initialSearch = {
    confirmationNumber: "",
    lastName: "",
  };

  const [searchInput, setSearchInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialSearch
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (searchInput.confirmationNumber && searchInput.lastName) {
      console.log("SEARCH INPUT", searchInput);
      navigate(
        props.type === "checkin"
          ? `/checkin/${searchInput.confirmationNumber}/${searchInput.lastName}`
          : `/mytrips/${searchInput.confirmationNumber}/${searchInput.lastName}`
      );
    }
  };

  const [shrinkLastName, setShrinkLastName] = useState(false);
  const [shrinkConfNumber, setConfNumber] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            rowSpacing={2}
            columnSpacing={0}
            marginBottom={2}
            padding={2}
          >
            <Grid item xs={12}>
              {props.type === "mytrips" ? (
                <Typography>Search for your upcoming trip details:</Typography>
              ) : (
                <Typography>Check-in for your upcoming trip:</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="confirmationNumber-input"
                label="Confirmation Number"
                value={searchInput.confirmationNumber}
                onChange={(event, newValue) => {
                  setSearchInput({ confirmationNumber: event.target.value });
                }}
                fullWidth
                onFocus={() => setConfNumber(true)}
                onBlur={(e) => setConfNumber(!!e.target.value)}
                InputLabelProps={{ sx: { ml: 4.5 }, shrink: shrinkConfNumber }}
                sx={(theme) => ({
                  "& .Mui-focused .MuiInputAdornment-root": {
                    color: theme.palette.primary.main,
                  },
                  "& .Mui-error .MuiInputAdornment-root": {
                    color: theme.palette.error.main,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    px: 5.5,
                  },
                })}
                inputProps={{
                  autoComplete: "off",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ConfirmationNumberIcon />
                    </InputAdornment>
                  ),
                }}
                error={isSubmitted && searchInput.confirmationNumber === ""}
                helperText={
                  isSubmitted && searchInput.confirmationNumber === ""
                    ? "Please enter a confirmation number"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lastName-input"
                label="Last Name"
                value={searchInput.lastName}
                onChange={(event, newValue) => {
                  setSearchInput({ lastName: event.target.value });
                }}
                fullWidth
                onFocus={() => setShrinkLastName(true)}
                onBlur={(e) => setShrinkLastName(!!e.target.value)}
                InputLabelProps={{ sx: { ml: 4.5 }, shrink: shrinkLastName }}
                sx={(theme) => ({
                  "& .Mui-focused .MuiInputAdornment-root": {
                    color: theme.palette.primary.main,
                  },
                  "& .Mui-error .MuiInputAdornment-root": {
                    color: theme.palette.error.main,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    px: 5.5,
                  },
                })}
                inputProps={{
                  autoComplete: "off",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
                error={isSubmitted && searchInput.lastName === ""}
                helperText={
                  isSubmitted && searchInput.lastName === ""
                    ? "Please enter a last name"
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" type="submit">
                    Search
                    <CapAirIcon cfill="none" sx={{ ml: 1 }} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {props.type === "mytrips" && (
              <Grid item xs={12} mb={2}>
                <Typography variant="caption" color="textSecondary">
                  Looking for past trips?{" "}
                  {isAuthenticated() ? (
                    <a href="/dashboard">Go to your Dashboard</a>
                  ) : (
                    <a href="/login">Sign in</a>
                  )}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
