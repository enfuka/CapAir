import { Result } from "antd";
import {
  Button,
  Alert,
  Stack,
  Container,
  Link,
  Typography,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import PropTypes from "prop-types";
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
import dayjs from "dayjs";
import PersonIcon from "@mui/icons-material/Person";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-hot-toast";
import { getCookie } from "../utilities/getCookie";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import SearchContext from "../contexts/searchContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

export default function ConfirmationPage(props) {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [open, setOpen] = useState(false);
  const { setPrintExpanded } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  let bookingLink = `${window.location.origin}/mytrips/${props.confirmationNo}/${props.passengers[0].lastName}`;

  const printSummary = () => {
    setPrintExpanded(true);
    setTimeout(() => {
      window.print();
    }, 1000);
    setTimeout(() => {
      setPrintExpanded(false);
    }, 2000);
  };

  const handleShare = () => {
    setOpen(true);
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(bookingLink);
    } catch (err) {
      console.log("COPY ERROR", err);
    }
    toast.success("Link copied to clipboard!");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignIn = () => {
    document.querySelector(".login-button").click();
    toast.custom(
      <Alert severity="warning">
        Please sign in while you are on this page to save your booking to your
        account.
      </Alert>
    );
  };
  return (
    <Container maxWidth="lg" disableGutters className="no-print">
      <BootstrapDialog open={open} onClose={handleClose}>
        <BootstrapDialogTitle onClose={handleClose}>
          Share your booking
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText>
            Share your trip details with your friends and family.
          </DialogContentText>
          <Box
            sx={{
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginY: "10px",
            }}
          >
            {isLoading ? <CircularProgress /> : null}
            <img
              alt="Barcode Generator TEC-IT"
              src={`https://barcode.tec-it.com/barcode.ashx?code=MobileQRCode&data=${bookingLink}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/squareQR.gif";
              }}
              onLoad={() => setIsLoading(false)}
            />
          </Box>
          <TextField
            margin="dense"
            id="name"
            type="email"
            fullWidth
            variant="standard"
            readOnly
            value={bookingLink}
          />
        </DialogContent>
        <DialogActions>
          <Button endIcon={<ContentCopyIcon />} onClick={() => handleCopy()}>
            Copy Link
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Stack direction="column" spacing={2}>
        <Result
          status="success"
          title="Successfully Booked!"
          extra={[
            <Typography
              key="Confirmation Number"
              variant="h6"
              color="text.secondary"
              sx={{ marginBottom: "15px", marginTop: "-10px" }}
            >
              {`Confirmation number: ${props.confirmationNo}`}
            </Typography>,
            <Button
              key="Book Another"
              variant="contained"
              onClick={() => navigate("/flights/search")}
            >
              Book Another Flight
            </Button>,
          ]}
        />
        {isAuthenticated() ? (
          <Alert severity="info">
            You can view your booking details on your{" "}
            {<Link href="/dashboard">dashboard</Link>}. You can also{" "}
            {
              <Link
                href={`/checkin/${props.confirmationNo}/${props.passengers[0].lastName}`}
              >
                check-in
              </Link>
            }{" "}
            online 24 hours before your flight.
          </Alert>
        ) : (
          <Alert severity="warning">
            Before you go, please save your confirmation number or{" "}
            {
              <Link type="button" onClick={() => handleSignIn()}>
                sign in
              </Link>
            }{" "}
            to your account save your booking. You can also{" "}
            {
              <Link
                href={`/checkin/${props.confirmationNo}/${props.passengers[0].lastName}`}
              >
                check-in
              </Link>
            }{" "}
            online 24 hours before your flight.
          </Alert>
        )}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button endIcon={<PrintIcon />} onClick={() => printSummary()}>
            Print
          </Button>
          <Button endIcon={<ShareIcon />} onClick={() => handleShare()}>
            Share
          </Button>
          {isAuthenticated() ? (
            <Button
              endIcon={<PersonIcon />}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          ) : (
            <Button endIcon={<LoginIcon />} onClick={() => handleSignIn()}>
              Sign In
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
