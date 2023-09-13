import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useContext, useReducer, useRef } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Stack, TextField, Paper, Typography, Alert } from "@mui/material";
import dayjs from "dayjs";
import PersonIcon from "@mui/icons-material/Person";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-hot-toast";
import { useIsAuthenticated } from "react-auth-kit";
import { getCookie } from "../utilities/getCookie";
import LoadingDots from "./loadingDots";
import { useLocation, useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function UserInfoForm({ formInput, setFormInput, isSubmitted }) {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      rowSpacing={2}
      columnSpacing={2}
      marginY={1}
    >
      <Grid item xs={12} sm={6}>
        <TextField
          id="firstName-input"
          label="First Name"
          placeholder="First Name (as shown on ID)"
          value={formInput.firstName}
          onChange={(event) => {
            setFormInput({ firstName: event.target.value });
          }}
          sx={{ width: "100%" }}
          error={isSubmitted && formInput.firstName === ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="lastName-input"
          label="Last Name"
          placeholder="Last Name (as shown on ID)"
          value={formInput.lastName}
          onChange={(event) => {
            setFormInput({ lastName: event.target.value });
          }}
          sx={{ width: "100%" }}
          error={isSubmitted && formInput.lastName === ""}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <DatePicker
          id="birthday-input"
          label="Date of Birth"
          placeholder="Date of Birth"
          value={formInput.birthdate}
          onChange={(newValue) => {
            setFormInput({ birthdate: newValue });
          }}
          sx={{ width: "100%" }}
          slotProps={{
            textField: {
              variant: "outlined",
              error: isSubmitted && !formInput.birthdate,
            },
          }}
          size="large"
          disableFuture
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          id="email-input"
          label="Email"
          value={formInput.email}
          onChange={(event) => {
            setFormInput({ email: event.target.value });
          }}
          inputProps={{ type: "email" }}
          sx={{ width: "100%" }}
          error={isSubmitted && formInput.email === ""}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="phone-input"
          label="Phone Number"
          value={formInput.phone}
          onChange={(event) => {
            setFormInput({ phone: event.target.value });
          }}
          inputProps={{ type: "tel" }}
          sx={{ width: "100%" }}
          error={isSubmitted && formInput.phone === ""}
        />
      </Grid>
    </Grid>
  );
}

export default function SavedPassengerModal(props) {
  const { savedPassengersModalSettings, setSavedPassengersModalSettings } =
    props.settings;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const initialForm = {
    firstName: "",
    lastName: "",
    birthdate: null,
    email: "",
    phone: "",
  };

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialForm
  );

  useEffect(() => {
    if (savedPassengersModalSettings.type === "edit") {
      setCurrentUserDetails(savedPassengersModalSettings.currentPassenger);
    } else {
      setFormInput(initialForm);
    }
  }, [savedPassengersModalSettings]);

  const setCurrentUserDetails = (details) => {
    setFormInput({
      firstName: details.firstName,
      lastName: details.lastName,
      birthdate: dayjs(details.birthDate),
      email: details.email,
      phone: details.phoneNumber,
    });
  };

  const addUserDetails = async () => {
    let request = {
      firstName: formInput.firstName,
      lastName: formInput.lastName,
      birthDate: dayjs(formInput.birthdate).format("YYYY-MM-DD"),
      email: formInput.email,
      phoneNumber: formInput.phone,
      addCustomer: true,
    };
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/user/passenger`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: isAuthenticated()
          ? `Bearer ${getCookie("_auth")}`
          : null,
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          setIsLoading(false);
          throw new Error("Could not add user.");
        }
      })
      .then((data) => {
        setIsLoading(false);
        setSavedPassengersModalSettings({
          ...savedPassengersModalSettings,
          open: false,
        });
        toast.success("Personal information saved!");
        return data;
      })
      .catch((error) => {
        console.error("USER/PASSENGER REQUEST ERROR", error);
        toast.error("Could not add passenger.");
        setIsLoading(false);
      });
  };

  const sendUserDetails = async () => {
    let request = {
      firstName: formInput.firstName,
      lastName: formInput.lastName,
      birthDate: dayjs(formInput.birthdate).format("YYYY-MM-DD"),
      email: formInput.email,
      phoneNumber: formInput.phone,
    };
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/user/update`;
    await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: isAuthenticated()
          ? `Bearer ${getCookie("_auth")}`
          : null,
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else if (response.status === 400) {
          setIsLoading(false);
          toast.error(
            "This email is already in use. Please use a different one."
          );
        } else {
          setIsLoading(false);
          throw new Error("Could not add user.");
        }
      })
      .then((data) => {
        setIsLoading(false);
        setSavedPassengersModalSettings({
          ...savedPassengersModalSettings,
          open: false,
        });
        toast.success("Personal information saved!");
        return data;
      })
      .catch((error) => {
        console.error("USER/PASSENGER REQUEST ERROR", error);
        toast.error("Could not add passenger.");
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    setSavedPassengersModalSettings({
      ...savedPassengersModalSettings,
      open: false,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (
      formInput.firstName !== "" &&
      formInput.lastName !== "" &&
      formInput.birthdate !== null &&
      formInput.email !== ""
    ) {
      setIsLoading(true);
      setIsSubmitted(false);
      if (savedPassengersModalSettings.type === "edit") {
        sendUserDetails();
      } else {
        addUserDetails();
      }
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        open={savedPassengersModalSettings.open}
      >
        <form onSubmit={handleSubmit}>
          <BootstrapDialogTitle onClose={handleClose}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonIcon />
              <Typography variant="h6" sx={{}}>
                {savedPassengersModalSettings.type === "edit" ? "Edit" : "Add"}{" "}
                Passenger Details
              </Typography>
            </Stack>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <UserInfoForm
              formInput={formInput}
              setFormInput={setFormInput}
              isSubmitted={isSubmitted}
            />
          </DialogContent>
          <DialogActions>
            <LoadingButton
              type="submit"
              loading={isLoading}
              loadingPosition="end"
              endIcon={<SaveIcon />}
              size="large"
            >
              <span>
                {savedPassengersModalSettings.type === "edit" ? "Save" : "Add"}
              </span>
            </LoadingButton>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
}
