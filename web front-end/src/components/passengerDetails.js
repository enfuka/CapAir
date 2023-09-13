import { useState, useEffect, useReducer } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {
  Stack,
  TextField,
  Paper,
  Typography,
  LinearProgress,
  Box,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import PersonIcon from "@mui/icons-material/Person";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useIsAuthenticated } from "react-auth-kit";
import { getCookie } from "../utilities/getCookie";

export default function PassengerDetails(props) {
  const isAuthenticated = useIsAuthenticated();
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState("");

  const initialForm = {
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: null,
    travellerID: "",
    email: "",
    phone: "",
    addCustomer: false,
  };

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialForm
  );

  useEffect(() => {
    setTimeout(() => {
      validateForm();
    }, 500);
  }, [formInput]);

  useEffect(() => {
    if (isAuthenticated() && props.index === 0) {
      setIsLoading(true);
      getUserDetails();
      getSavedPassengerDetails();
    }
  }, []);

  const getUserDetails = async () => {
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/user/details`;
    await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: isAuthenticated()
          ? `Bearer ${getCookie("_auth")}`
          : null,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          throw new Error("No user details found.");
        }
      })
      .then((data) => {
        if (data.customerCreated) {
          setFormInput({
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            birthdate: data.birthDate ? dayjs(data.birthDate) : null,
            email: data.email ?? "",
            phone: data.phoneNumber ?? "",
          });
          setCustomer(data.email);
        }
        setIsLoading(false);
        setTimeout(() => {
          validateForm();
        }, 500);
        return data;
      })
      .catch((error) => console.log("USER/DETAILS ERROR", error));
  };

  const getSavedPassengerDetails = async () => {
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/user/passenger`;
    await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: isAuthenticated()
          ? `Bearer ${getCookie("_auth")}`
          : null,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          throw new Error("No user details found.");
        }
      })
      .then((data) => {
        props.savedPassengers.setter(data.customers);
        setIsLoading(false);
        setTimeout(() => {
          validateForm();
        }, 500);
        return data;
      })
      .catch((error) => {
        console.error("USER/PASSENGER ERROR", error);
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    setCustomer(event.target.value);
    let customerDetails = props.savedPassengers.state.find(
      (element) => element.email === event.target.value
    );
    setFormInput({
      firstName: customerDetails.firstName ?? "",
      lastName: customerDetails.lastName ?? "",
      birthdate: customerDetails.birthDate
        ? dayjs(customerDetails.birthDate)
        : null,
      email: customerDetails.email ?? "",
      phone: customerDetails.phoneNumber ?? "",
    });
  };

  const validateForm = () => {
    if (
      props.details.state
        .slice(0, props.passengerCount)
        .every(
          (passenger) =>
            passenger.firstName !== "" &&
            passenger.lastName !== "" &&
            passenger.birthdate !== null &&
            passenger.email !== "" &&
            passenger.phone !== ""
        )
    ) {
      props.setIsPassengerFormsValid(true);
    } else {
      props.setIsPassengerFormsValid(false);
    }
  };

  useEffect(() => {
    props.details.setter({ index: props.index, formInput: formInput });
    setTimeout(() => {
      validateForm();
    }, 500);
  }, [formInput]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Container maxWidth="lg">
      <Paper
        variant="outlined"
        sx={{ marginY: "20px", padding: "15px", flexGrow: 1 }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          rowSpacing={2}
          columnSpacing={2}
          marginBottom={2}
        >
          <Grid item container xs={12} sm={12}>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonIcon />
                <Typography variant="h6">
                  Passenger {props.index + 1}
                </Typography>
              </Stack>
            </Grid>
            {isAuthenticated() &&
              !(props.savedPassengers.state.length === 0) && (
                <>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <FormControl variant="filled" fullWidth>
                        <InputLabel>Saved Passenger</InputLabel>
                        <Select
                          label="Saved Passenger"
                          value={customer}
                          onChange={handleChange}
                          size="small"
                        >
                          {props.savedPassengers.state.map((element, index) => (
                            <MenuItem key={index} value={element.email}>
                              {element.firstName} {element.lastName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </>
              )}
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <TextField
              id="firstName-input"
              label="First Name"
              placeholder="First Name (as shown on ID)"
              value={formInput.firstName}
              onChange={(event) => {
                setFormInput({ firstName: event.target.value });
                setCustomer("");
              }}
              inputProps={{ pattern: "[A-Za-z]{1,}" }}
              sx={{ width: "100%" }}
              required
              error={props.submitted && formInput.firstName === ""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="middleName-input"
              label="Middle Initial (optional)"
              value={formInput.middleName}
              inputProps={{ pattern: "[A-Za-z]{1}" }}
              onChange={(event) => {
                setFormInput({ middleName: event.target.value });
                setCustomer("");
              }}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <TextField
              id="lastName-input"
              label="Last Name"
              value={formInput.lastName}
              onChange={(event) => {
                setFormInput({ lastName: event.target.value });
                setCustomer("");
              }}
              inputProps={{ pattern: "[A-Za-z]{1,}" }}
              sx={{ width: "100%" }}
              required
              error={props.submitted && formInput.lastName === ""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              id="birthday-input"
              label="Date of Birth"
              value={formInput.birthdate}
              onChange={(newValue) => {
                setFormInput({ birthdate: newValue });
                setCustomer("");
              }}
              sx={{ width: "100%" }}
              size="large"
              slotProps={{
                textField: {
                  required: true,
                  variant: "outlined",
                  error: props.submitted && !formInput.birthdate,
                },
              }}
              disableFuture
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="travelerID-input"
              label="Traveler ID (optional)"
              value={formInput.travellerID}
              onChange={(event) => {
                setFormInput({ travellerID: event.target.value });
                setCustomer("");
              }}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="email-input"
              label="Email"
              value={formInput.email}
              onChange={(event) => {
                setFormInput({ email: event.target.value });
                setCustomer("");
              }}
              inputProps={{ type: "email" }}
              sx={{ width: "100%" }}
              required
              error={props.submitted && formInput.email === ""}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="phone-input"
              label="Phone Number"
              placeholder="(10 digits) e.g. 1234567890"
              value={formInput.phone}
              onChange={(event) => {
                setFormInput({ phone: event.target.value });
                setCustomer("");
              }}
              inputProps={{ type: "tel", maxLength: 10, pattern: "[0-9]{10}" }}
              sx={{ width: "100%" }}
              required
              error={props.submitted && formInput.phone === ""}
            />
          </Grid>
          {isAuthenticated() && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", sm: "flex-end" },
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formInput.addCustomer}
                      onChange={(event) => {
                        setFormInput({ addCustomer: event.target.checked });
                        console.log(formInput);
                      }}
                      disabled={!(customer === "")}
                    />
                  }
                  label="Save passenger details"
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}
