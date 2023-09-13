import {
  Box,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useIsAuthenticated } from "react-auth-kit";
import { getCookie } from "../utilities/getCookie";
import { Typography } from "antd";

export default function SavedPassengers(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    getSavedPassengerDetails();
  }, []);

  useEffect(() => {
    getSavedPassengerDetails();
  }, [props.settings.savedPassengersModalSettings.open]);

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
        setPassengerDetails(data.customers);
        setIsLoading(false);
        return data;
      })
      .catch((error) => console.error("USER/PASSENGER ERROR", error));
  };

  const handleEdit = (passenger) => {
    props.settings.setSavedPassengersModalSettings({
      open: true,
      type: "edit",
      currentPassenger: passenger,
    });
  };

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <List dense>
      {passengerDetails.map((passenger, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <Tooltip title="Edit Passenger Details">
              <IconButton edge="end" onClick={() => handleEdit(passenger)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          }
        >
          <ListItemButton onClick={() => handleEdit(passenger)}>
            {`${passenger.firstName} ${passenger.lastName}`}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
