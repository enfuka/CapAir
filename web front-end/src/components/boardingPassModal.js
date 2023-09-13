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
import {
  Stack,
  TextField,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
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
import Backdrop from "@mui/material/Backdrop";
import Spinner from "../images/spinner";
import BoardingPass from "./boardingPass";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, paddingX: 2, paddingY: 1 }} {...other}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Stack>
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function BoardingPassModal(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const [customer, setCustomer] = useState("");
  const [bookingLink, setBookingLink] = useState("");

  const theme = useTheme();
  const isAboveMD = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = (event) => {
    setCustomer(event.target.value);
  };

  const filterByFlight = (data) => {
    let filteredData = data.filter(
      (element) => element.ticketResponse.flight.flightID === props.flightID
    );
    return filteredData;
  };

  const getBoardingPasses = async () => {
    let request = props.itineraryId;
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/itinerary/board`;
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
          return response.json();
        } else {
          setIsLoading(false);
          throw new Error("No boarding passes found");
        }
      })
      .then((data) => {
        let filteredData = filterByFlight(data);
        return filteredData;
      })
      .then((data) => {
        setData(data);
        setCustomer(data[0].ticketResponse.customer.customerId);
        setIsLoading(false);
        return data;
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("BOARDING PASS REQUEST ERROR", error);
        toast.error("No boarding passes found");
      });
  };

  const handleOpen = () => {
    setIsLoading(true);
    setOpen(true);
    getBoardingPasses();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShareClose = () => {
    setOpenShare(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setOpenShare(true);
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(bookingLink);
    } catch (err) {
      console.log("COPY ERROR", err);
    }
    toast.success("Link copied to clipboard!");
  };

  return open ? (
    isLoading ? (
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Spinner color="inherit" />
      </Backdrop>
    ) : (
      <>
        <BootstrapDialog open={openShare} onClose={handleShareClose}>
          <BootstrapDialogTitle onClose={handleShareClose}>
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
              <img
                alt="Barcode Generator TEC-IT"
                src={`https://barcode.tec-it.com/barcode.ashx?code=MobileQRCode&data=${bookingLink}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/squareQR.gif";
                }}
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
        <BootstrapDialog
          fullScreen={!isAboveMD}
          maxWidth="md"
          onClose={handleClose}
          open={open}
        >
          <BootstrapDialogTitle onClose={handleClose}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AirplaneTicketIcon />
              <Typography variant="h6">Boarding Pass</Typography>
            </Stack>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Stack direction="column" spacing={2} alignItems="center">
              <FormControl fullWidth>
                <InputLabel>Passenger</InputLabel>
                <Select
                  label="Passenger"
                  value={customer}
                  onChange={handleChange}
                  size="small"
                >
                  {data.map((element, index) => (
                    <MenuItem
                      key={index}
                      value={element.ticketResponse.customer.customerId}
                    >
                      {element.ticketResponse.customer.firstName}{" "}
                      {element.ticketResponse.customer.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <BoardingPass
                airports={props.airports}
                data={data.find(
                  (element) =>
                    element.ticketResponse.customer.customerId === customer
                )}
                isAboveMD={isAboveMD}
                setBookingLink={setBookingLink}
              />
            </Stack>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: { xs: "flex-start", sm: "flex-end" },
            }}
          >
            {isAboveMD && (
              <Button onClick={handlePrint} endIcon={<PrintIcon />}>
                Print
              </Button>
            )}
            <Button endIcon={<ShareIcon />} onClick={() => handleShare()}>
              Share
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </>
    )
  ) : (
    <Button
      size={isAboveMD ? "medium" : "small"}
      variant="contained"
      color="yellow"
      sx={{ marginY: "10px" }}
      onClick={handleOpen}
      endIcon={<AirplaneTicketIcon />}
    >
      Boarding Pass
    </Button>
  );
}
