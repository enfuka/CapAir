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
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

export default function PasswordChangeModal(props) {
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [currentPasswordValid, setCurrentPasswordValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const { open, setOpen } = props.openPasswordModal;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setFormInput({ currentPassword: "", password: "", passwordAgain: "" });
    setCurrentPasswordValid(false);
    setIsSubmitted(false);
    setIsLoading(false);
    setShowPassword(false);
  }, [open]);

  const changePassword = async () => {
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/user/change-password`;
    await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: isAuthenticated()
          ? `Bearer ${getCookie("_auth")}`
          : null,
      },
      body: JSON.stringify({
        oldPassword: formInput.currentPassword,
        newPassword: formInput.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Password changed successfully");
          setOpen(false);
          return response.text();
        } else if (response.status === 400) {
          toast.error("Current password is incorrect");
          setIsLoading(false);
          setCurrentPasswordValid(false);
          return response.text();
        } else {
          setIsLoading(false);
          toast.error("Something went wrong");
          return response.text();
        }
      })
      .then((data) => {
        if (data === "Successfully changed password") {
          return Promise.resolve(data);
        } else {
          return Promise.reject(data);
        }
      })
      .catch((error) => console.error("USER/CHANGE-PASSWORD ERROR", error));
  };

  const handleSubmit = (event) => {
    setIsSubmitted(true);
    event.preventDefault();
    if (passwordMatch && passwordValid) {
      setIsLoading(true);
      changePassword().then((res) => setIsLoading(false));
    }
  };
  const initialForm = {
    currentPassword: "",
    password: "",
    passwordAgain: "",
  };

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialForm
  );

  useEffect(() => {
    formInput.password.length >= 8
      ? setPasswordValid(true)
      : setPasswordValid(false);
    formInput.password === formInput.passwordAgain &&
    formInput.password.length >= 8
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
    setCurrentPasswordValid(true);
  }, [formInput]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BootstrapDialog onClose={handleClose} open={open}>
        <form onSubmit={handleSubmit}>
          <BootstrapDialogTitle onClose={handleClose}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonIcon />
              <Typography variant="h6" sx={{}}>
                Change Password
              </Typography>
            </Stack>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Alert severity="info">
              Password must be at least 8 characters long.
            </Alert>
            <Grid container rowSpacing={2} marginY={1}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  label="Current Password"
                  placeholder="Current Password"
                  required
                  disabled={isLoading}
                  value={formInput.currentPassword}
                  onChange={(event) => {
                    setFormInput({ currentPassword: event.target.value });
                  }}
                  inputProps={{ type: showPassword ? "text" : "password" }}
                  sx={{ width: "100%" }}
                  error={
                    isSubmitted &&
                    (formInput.currentPassword === "" || !currentPasswordValid)
                  }
                  helperText={
                    isSubmitted &&
                    (formInput.currentPassword === "" || !currentPasswordValid)
                      ? "Incorrect password"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex="-1"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  placeholder="New Password"
                  required
                  disabled={isLoading}
                  value={formInput.password}
                  onChange={(event) => {
                    setFormInput({ password: event.target.value });
                  }}
                  inputProps={{ type: showPassword ? "text" : "password" }}
                  sx={{ width: "100%" }}
                  error={
                    (isSubmitted && formInput.password === "") ||
                    (formInput.password.length >= 1 && !passwordValid)
                  }
                  helperText={
                    (isSubmitted && formInput.password === "") ||
                    (formInput.password.length >= 1 && !passwordValid)
                      ? "Minumum 8 characters"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex="-1"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  required
                  disabled={isLoading}
                  value={formInput.passwordAgain}
                  onChange={(event) => {
                    setFormInput({ passwordAgain: event.target.value });
                  }}
                  inputProps={{ type: showPassword ? "text" : "password" }}
                  sx={{ width: "100%" }}
                  error={
                    (isSubmitted && formInput.password === "") ||
                    (formInput.passwordAgain.length >= 1 && !passwordMatch)
                  }
                  helperText={
                    (isSubmitted && formInput.password === "") ||
                    (formInput.passwordAgain.length >= 1 && !passwordMatch)
                      ? "Passwords do not match"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex="-1"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              type="submit"
              loading={isLoading}
              loadingPosition="end"
              endIcon={<SaveIcon />}
              size="large"
            >
              Change
            </LoadingButton>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
}
