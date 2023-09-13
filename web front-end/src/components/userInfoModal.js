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

function UserInfoForm({
  formInput,
  setFormInput,
  isSubmitted,
  type,
  editable,
  isLoading,
}) {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      rowSpacing={2}
      columnSpacing={2}
      marginY={1}
    >
      <Grid item xs={12} sm={type === "edit" ? 12 : 6}>
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
          InputProps={{
            readOnly: !editable && type === "edit",
          }}
          disabled={!editable && type === "edit"}
        />
      </Grid>
      <Grid item xs={12} sm={type === "edit" ? 12 : 6}>
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
          InputProps={{
            readOnly: !editable && type === "edit",
          }}
          disabled={!editable && type === "edit"}
        />
      </Grid>
      <Grid item xs={12} sm={type === "edit" ? 12 : 4}>
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
              readOnly: !editable && type === "edit",
            },
          }}
          disabled={!editable && type === "edit"}
          size="large"
          disableFuture
        />
      </Grid>
      <Grid item xs={12} sm={type === "edit" ? 12 : 4}>
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
          InputProps={{
            readOnly: !editable && type === "edit",
          }}
          disabled={!editable && type === "edit"}
        />
      </Grid>
      <Grid item xs={12} sm={type === "edit" ? 12 : 4}>
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
          InputProps={{
            readOnly: !editable && type === "edit",
          }}
          disabled={!editable && type === "edit"}
        />
      </Grid>
      {type === "edit" && editable && (
        <Grid item xs={12} sm={12}>
          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            <span>Save</span>
          </LoadingButton>
        </Grid>
      )}
    </Grid>
  );
}

export default function UserInfoModal(props) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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
    location.state?.logged &&
      setTimeout(() => {
        getUserDetails();
      }, 1000);
  }, [location.state]);

  useEffect(() => {
    getUserDetails();
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
        if (!data.customerCreated) {
          setOpen(true);
        }
        if (props.type === "edit") {
          setFormInput({
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            birthdate: data.birthDate ? dayjs(data.birthDate) : null,
            email: data.email ?? "",
            phone: data.phoneNumber ?? "",
          });
        }
        setIsLoading(false);
        return data;
      })
      .catch((error) => console.log("USER DETAILS REQUEST ERROR", error));
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
          throw new Error("This email is already in use.");
        } else {
          setIsLoading(false);
          throw new Error("No user details found.");
        }
      })
      .then((data) => {
        setIsLoading(false);
        setOpen(false);
        toast.success("Personal information saved!");
        props.setEditDetails && props.setEditDetails(false);
        setTimeout(() => {
          props.getUserDetails && props.getUserDetails();
        }, 2000);
        navigate(location.pathname, {
          replace: true,
          state: { logged: false },
        });
        return data;
      })
      .catch((error) => console.log("USER UPDATE REQUEST ERROR", error));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (
      formInput.firstName !== "" &&
      formInput.lastName !== "" &&
      formInput.birthdate !== null &&
      formInput.email !== ""
    ) {
      setIsLoading(true);
      sendUserDetails();
    }
  };

  if (!isAuthenticated()) {
    return <></>;
  } else if (props.type === "prompt") {
    return (
      <>
        <BootstrapDialog
          onClose={props.mode === "unskippable" ? null : handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <form onSubmit={handleSave}>
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={props.mode === "unskippable" ? null : handleClose}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonIcon sx={{}} />
                <Typography variant="h6" sx={{}}>
                  Personal Information
                </Typography>
              </Stack>
            </BootstrapDialogTitle>
            <DialogContent dividers>
              {props.mode === "unskippable" ? (
                <Alert severity="warning">
                  Please enter passenger details for this account to continue.
                </Alert>
              ) : (
                <Alert severity="info">
                  Save your information to make booking flights easier, faster,
                  and more convenient.
                </Alert>
              )}
              <UserInfoForm
                formInput={formInput}
                setFormInput={setFormInput}
                isSubmitted={isSubmitted}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit">
                {isLoading ? <LoadingDots /> : " Save"}
              </Button>
            </DialogActions>
          </form>
        </BootstrapDialog>
      </>
    );
  } else {
    return (
      <form onSubmit={handleSave}>
        <UserInfoForm
          formInput={formInput}
          setFormInput={setFormInput}
          isSubmitted={isSubmitted}
          type="edit"
          editable={props.editable}
          isLoading={isLoading}
          open={open}
        />
      </form>
    );
  }
}
