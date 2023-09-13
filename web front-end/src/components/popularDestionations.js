import Grid from "@mui/material/Grid";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import nycpic from "../images/nycpic.jpeg";
import vegaspic from "../images/Vegas.png";
import houstonpic from "../images/houston2pic.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const PopularDestinations = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const dates = [
    dayjs().format("YYYY-MM-DD HH:mm:ss"),
    dayjs().add(2, "day").format("YYYY-MM-DD HH:mm:ss"),
  ];
  return (
    <div>
      <Container
        display="flex"
        maxWidth="xl"
        sx={{ mt: isAboveSM ? "30px" : "0px", mb: "50px" }}
      >
        <Card style={{ border: "none", boxShadow: "none" }}>
          <Typography
            variant="text.primary"
            color="primary.main"
            fontSize={isAboveSM ? "40px" : "32px"}
            align="center"
          >
            Popular Destinations
          </Typography>
        </Card>

        <Grid container spacing={4} sx={{ mt: "0px", mb: 5 }}>
          <Grid item sm={4} xs={12}>
            <Card sx={{ backgroundColor: "#F6F6F6" }}>
              <CardMedia
                sx={{ height: 300 }}
                image={vegaspic}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="text.primary"
                  fontSize="18px"
                  component="div"
                  align="left"
                  noWrap={true}
                  sx={{ ml: "10px" }}
                >
                  The Ultimate Escape in Glittering Las Vegas
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  align="left"
                  sx={{ ml: "10px" }}
                >
                  Lorem ipsum dolor sit amet consectetur. Nunc eu nam interdum
                  sed elementum malesuada. Vestibulum malesuada ut mauris
                  pharetra turpis condimentum.
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between", alignContent: "center" }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: "10px", mx: "18px" }}
                >
                  Starting at $699*
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ mb: "10px", mr: "10px" }}
                  onClick={() =>
                    navigate(
                      `/flights/search/Round%20Trip/IAD/LAS/${dates[0]}/${dates[1]}/1`
                    )
                  }
                >
                  Search Flights
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Box display="flex">
              <Card sx={{ backgroundColor: "#F6F6F6" }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={nycpic}
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="text.primary"
                    component="div"
                    align="left"
                    fontSize="18px"
                    noWrap={true}
                    sx={{ ml: "10px" }}
                  >
                    Discover New York City's Allure{" "}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    align="left"
                    sx={{ ml: "10px" }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Nunc eu nam interdum
                    sed elementum malesuada. Vestibulum malesuada ut mauris
                    pharetra turpis condimentum.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: "10px", mx: "18px" }}
                  >
                    Starting at $499*
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mb: "10px", mr: "10px" }}
                    onClick={() =>
                      navigate(
                        `/flights/search/Round%20Trip/IAD/JFK/${dates[0]}/${dates[1]}/1`
                      )
                    }
                  >
                    Search Flights
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Card sx={{ backgroundColor: "#F6F6F6" }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={houstonpic}
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="text.primary"
                    component="div"
                    align="left"
                    fontSize="18px"
                    sx={{ ml: "10px" }}
                    noWrap={true}
                  >
                    Discover the Dynamic Charms of Houston, Texas{" "}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    align="left"
                    sx={{ ml: "10px" }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Nunc eu nam interdum
                    sed elementum malesuada. Vestibulum malesuada ut mauris
                    pharetra turpis condimentum.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: "10px", mx: "18px" }}
                  >
                    Starting at $299*
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mb: "10px", mr: "10px" }}
                    onClick={() =>
                      navigate(
                        `/flights/search/Round%20Trip/IAD/IAH/${dates[0]}/${dates[1]}/1`
                      )
                    }
                  >
                    Search Flights
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PopularDestinations;
