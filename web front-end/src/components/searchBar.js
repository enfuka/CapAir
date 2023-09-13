import { useState, useEffect, useReducer } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CapAirIcon from "../images/capAirIcon.js";
import PersonIcon from "@mui/icons-material/Person";
import InputAdornment from "@mui/material/InputAdornment";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DatePicker, Segmented } from "antd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

const { RangePicker } = DatePicker;

export default function SearchBar(props) {
  const [airports, setAirports] = useState([]);
  const navigate = useNavigate();

  let urlParams = useParams();
  useEffect(() => {
    getAirports();
  }, []);

  useEffect(() => {
    if (props.type === "horizontal") {
      setShrinkFrom(true);
      setShrinkTo(true);
      setInputsFromURL();
    }
  }, [airports, urlParams]);

  const initialSearch = {
    tripType: "Round Trip",
    source: null,
    destination: null,
    date: dayjs(),
    dates: [dayjs(), dayjs().add(2, "day")],
    passengerCount: 1,
  };

  const [searchInput, setSearchInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialSearch
  );

  const getAirports = async () => {
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/airport`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAirports(data);
      })
      .catch((error) => console.log("AIRPORT REQUEST ERROR", error));
  };

  const getAirportByCode = (code) =>
    airports.find((airport) => airport.id === code);

  const setInputsFromURL = () => {
    setSearchInput({
      tripType: urlParams.type,
      source: getAirportByCode(urlParams.source),
      destination: getAirportByCode(urlParams.destination),
      date: dayjs(urlParams.departureDate),
      dates: [
        dayjs(urlParams.departureDate),
        dayjs(urlParams.returnDate)
          ? dayjs(urlParams.returnDate)
          : dayjs(urlParams.departureDate).add(2, "day"),
      ],
      passengerCount: parseInt(urlParams.passengers),
    });
  };

  const handleSwap = () => {
    const temp = searchInput.source;
    setSearchInput({ source: searchInput.destination });
    setSearchInput({ destination: temp });
  };

  const handleIncrement = () => {
    setSearchInput({ passengerCount: searchInput.passengerCount + 1 });
  };
  const handleDecrement = () => {
    setSearchInput({ passengerCount: searchInput.passengerCount - 1 });
  };
  const displayDecrement = searchInput.passengerCount > 1;
  const displayIncrement = searchInput.passengerCount < 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (searchInput.source && searchInput.destination) {
      console.log("SEARCH INPUT", searchInput);
      navigate(
        `/flights/search/${searchInput.tripType}/${searchInput.source.id}/${
          searchInput.destination.id
        }/${
          searchInput.tripType === "Round Trip"
            ? searchInput.dates[0].format("YYYY-MM-DD HH:mm:ss")
            : searchInput.date.format("YYYY-MM-DD HH:mm:ss")
        }/${
          searchInput.tripType === "Round Trip"
            ? searchInput.dates[1].format("YYYY-MM-DD HH:mm:ss")
            : dayjs(searchInput.date)
                .add(2, "day")
                .format("YYYY-MM-DD HH:mm:ss")
        }/${searchInput.passengerCount}`
      );
    }
  };

  const [shrinkFrom, setShrinkFrom] = useState(false);
  const [shrinkTo, setShrinkTo] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isAboveMD = useMediaQuery(theme.breakpoints.up("md"));

  return props.type === "horizontal" ? (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "primary.main",
        paddingY: "15px",
      }}
    >
      <Container maxWidth="lg" sx={{ paddingX: { lg: "0!important" } }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            rowSpacing={1}
            columnSpacing={1}
            columns={24}
            sx={{ height: isAboveMD ? "130px" : "100%" }}
          >
            <Grid item xs={24} sm={24} md={24}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <br></br>
                <Segmented
                  options={["Round Trip", "One-way"]}
                  value={searchInput.tripType}
                  onChange={(value) => setSearchInput({ tripType: value })}
                />
              </Stack>
            </Grid>
            <Grid item xs={24} sm={24} md={5}>
              <Box>
                <Autocomplete
                  id="source-select"
                  options={airports}
                  value={searchInput.source}
                  onChange={(event, newValue) => {
                    setSearchInput({ source: newValue });
                  }}
                  autoHighlight
                  forcePopupIcon={false}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  getOptionLabel={(option) =>
                    `${option.city}, ${option.state} (${option.id})`
                  }
                  renderOption={(props, option) => (
                    <Box component="li" sx={{}} {...props}>
                      {option.city}, {option.state} ({option.id})
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="From"
                      onFocus={() => setShrinkFrom(true)}
                      onBlur={(e) => setShrinkFrom(!!e.target.value)}
                      InputLabelProps={{
                        sx: { ml: 4.5 },
                        shrink: shrinkFrom,
                      }}
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
                        "& .MuiInputBase-root": {
                          backgroundColor: "white!important",
                        },
                      })}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlightTakeoffIcon sx={{ marginTop: "-35px" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={isSubmitted && !searchInput.source}
                      helperText={
                        isSubmitted && !searchInput.source
                          ? "Please select a location"
                          : ""
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
            {isAboveSM && (
              <Grid item sx={{ display: { sm: "none", md: "flex" } }} xs={1}>
                <IconButton onClick={() => handleSwap()} color="white">
                  <SyncAltIcon />
                </IconButton>
              </Grid>
            )}
            <Grid item xs={24} sm={24} md={5}>
              <Box>
                <Autocomplete
                  id="destination-select"
                  options={airports}
                  value={searchInput.destination}
                  onChange={(event, newValue) => {
                    setSearchInput({ destination: newValue });
                  }}
                  autoHighlight
                  forcePopupIcon={false}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  getOptionLabel={(option) =>
                    `${option.city}, ${option.state} (${option.id})`
                  }
                  renderOption={(props, option) => (
                    <Box component="li" sx={{}} {...props}>
                      {option.city}, {option.state} ({option.id})
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="To"
                      onFocus={() => setShrinkTo(true)}
                      onBlur={(e) => setShrinkTo(!!e.target.value)}
                      InputLabelProps={{ sx: { ml: 4.5 }, shrink: shrinkTo }}
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
                        "& .MuiFilledInput-root": {
                          background: "white!important",
                          borderRadius: "5px",
                        },
                      })}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlightLandIcon sx={{ marginTop: "-35px" }} />
                          </InputAdornment>
                        ),
                      }}
                      error={isSubmitted && !searchInput.destination}
                      helperText={
                        isSubmitted && !searchInput.destination
                          ? "Please select a location"
                          : ""
                      }
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={24} sm={24} md={5}>
              {searchInput.tripType === "Round Trip" ? (
                <RangePicker
                  size="large"
                  onChange={(value) => setSearchInput({ dates: value })}
                  value={searchInput.dates}
                  style={{
                    height: "56px",
                    width: "100%",
                    backgroundColor: "white",
                  }}
                  suffixIcon={<CalendarMonthIcon />}
                  allowClear={false}
                  disabledDate={(current) => {
                    return current < dayjs().add(-1, "day");
                  }}
                  format={(value) => `${value.format("MMM D")}`}
                />
              ) : (
                <DatePicker
                  size="large"
                  onChange={(value) => setSearchInput({ date: value })}
                  value={searchInput.date}
                  style={{
                    height: "56px",
                    width: "100%",
                    backgroundColor: "white",
                  }}
                  suffixIcon={<CalendarMonthIcon />}
                  allowClear={false}
                  disabledDate={(current) => {
                    return current < dayjs().add(-1, "day");
                  }}
                  format={(value) => `${value.format("MMM D")}`}
                />
              )}
            </Grid>
            <Grid item xs={24} sm={24} md={5}>
              <Box
                sx={{
                  backgroundColor: "rgb(255, 255,255,255)",
                  borderRadius: "5px",
                }}
              >
                <TextField
                  id="passengerCount-input"
                  label="Passengers"
                  value={`${searchInput.passengerCount} Passenger${
                    searchInput.passengerCount > 1 ? "s" : ""
                  }`}
                  InputLabelProps={{ sx: { ml: 4.5 }, shrink: true }}
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
                    "& .MuiFilledInput-root": {
                      background: "white!important",
                      borderRadius: "5px",
                    },
                  })}
                  variant="filled"
                  fullWidth
                  readOnly
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <ButtonGroup size="small">
                          {displayDecrement && (
                            <Button
                              variant="outlined"
                              onClick={handleDecrement}
                            >
                              <RemoveIcon
                                fontSize="inherit"
                                sx={{ height: "20px" }}
                              />
                            </Button>
                          )}
                          {displayIncrement && (
                            <Button
                              variant="contained"
                              onClick={handleIncrement}
                            >
                              <AddIcon
                                fontSize="inherit"
                                sx={{ height: "20px" }}
                              />
                            </Button>
                          )}
                        </ButtonGroup>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ marginTop: "-20px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={24} sm={24} md={3}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    type="submit"
                    color="white"
                    sx={{ height: "56px" }}
                  >
                    Search
                    <CapAirIcon
                      cfill="none"
                      sx={{ ml: 1, alignContent: "center", mt: "-5px" }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  ) : (
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
          >
            <Grid item xs={12} sm={12}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <br></br>
                <Segmented
                  options={["Round Trip", "One-way"]}
                  value={searchInput.tripType}
                  onChange={(value) => setSearchInput({ tripType: value })}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={5.5}>
              <Autocomplete
                id="source-select"
                options={airports}
                value={searchInput.source}
                onChange={(event, newValue) => {
                  setSearchInput({ source: newValue });
                }}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id
                }
                autoHighlight
                forcePopupIcon={false}
                getOptionLabel={(option) =>
                  `${option.city}, ${option.state} (${option.id})`
                }
                renderOption={(props, option) => (
                  <Box component="li" sx={{}} {...props}>
                    {option.city}, {option.state} ({option.id})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="From"
                    onFocus={() => setShrinkFrom(true)}
                    onBlur={(e) => setShrinkFrom(!!e.target.value)}
                    InputLabelProps={{
                      sx: { ml: 4.5 },
                      shrink: shrinkFrom,
                    }}
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
                      ...params.inputProps,
                      autoComplete: "off",
                    }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlightTakeoffIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={isSubmitted && !searchInput.source}
                    helperText={
                      isSubmitted && !searchInput.source
                        ? "Please select a location"
                        : ""
                    }
                  />
                )}
              />
            </Grid>
            {isAboveSM && (
              <Grid item xs={12} sm="auto">
                <IconButton onClick={() => handleSwap()} color="primary">
                  <SyncAltIcon />
                </IconButton>
              </Grid>
            )}
            <Grid item xs={12} sm={5.5}>
              <Autocomplete
                id="destination-select"
                options={airports}
                value={searchInput.destination}
                onChange={(event, newValue) => {
                  setSearchInput({ destination: newValue });
                }}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id
                }
                autoHighlight
                forcePopupIcon={false}
                getOptionLabel={(option) =>
                  `${option.city}, ${option.state} (${option.id})`
                }
                renderOption={(props, option) => (
                  <Box component="li" sx={{}} {...props}>
                    {option.city}, {option.state} ({option.id})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="To"
                    onFocus={() => setShrinkTo(true)}
                    onBlur={(e) => setShrinkTo(!!e.target.value)}
                    InputLabelProps={{ sx: { ml: 4.5 }, shrink: shrinkTo }}
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
                      ...params.inputProps,
                      autoComplete: "off",
                    }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlightLandIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={isSubmitted && !searchInput.destination}
                    helperText={
                      isSubmitted && !searchInput.destination
                        ? "Please select a location"
                        : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={5.5}>
              {searchInput.tripType === "Round Trip" ? (
                <RangePicker
                  size="large"
                  onChange={(value) => setSearchInput({ dates: value })}
                  value={searchInput.dates}
                  style={{
                    height: "56px",
                    width: "100%",
                    textAlign: "center",
                  }}
                  suffixIcon={<CalendarMonthIcon />}
                  allowClear={false}
                  disabledDate={(current) => {
                    return current < dayjs().add(-1, "day");
                  }}
                  format={(value) => `${value.format("MMM D")}`}
                />
              ) : (
                <DatePicker
                  size="large"
                  onChange={(value) => setSearchInput({ date: value })}
                  value={searchInput.date}
                  style={{
                    height: "56px",
                    width: "100%",
                  }}
                  suffixIcon={<CalendarMonthIcon />}
                  allowClear={false}
                  disabledDate={(current) => {
                    return current < dayjs().add(-1, "day");
                  }}
                  format={(value) => `${value.format("MMM D")}`}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={5.5}>
              <TextField
                id="passengerCount-input"
                label="Passengers"
                value={`${searchInput.passengerCount} Passenger${
                  searchInput.passengerCount > 1 ? "s" : ""
                }`}
                InputLabelProps={{ sx: { ml: 4.5 }, shrink: true }}
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
                variant="outlined"
                fullWidth
                readOnly
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <ButtonGroup size="small">
                        {displayDecrement && (
                          <Button variant="outlined" onClick={handleDecrement}>
                            <RemoveIcon
                              fontSize="inherit"
                              sx={{ height: "20px" }}
                            />
                          </Button>
                        )}
                        {displayIncrement && (
                          <Button variant="contained" onClick={handleIncrement}>
                            <AddIcon
                              fontSize="inherit"
                              sx={{ height: "20px" }}
                            />
                          </Button>
                        )}
                      </ButtonGroup>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} mb={2}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" type="submit">
                    Find Flights
                    <CapAirIcon cfill="none" sx={{ ml: 1 }} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
