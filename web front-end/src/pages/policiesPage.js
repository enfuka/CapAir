import Grid from "@mui/material/Grid";
import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Container, Backdrop, Grow } from "@mui/material";
import pets from "../images/pets.jpeg";
import changing from "../images/changing.jpg";
import baggage from "../images/baggage.jpg";
import delays from "../images/delays.jpg";
import cancellations from "../images/cancellations.jpg";
import documentation from "../images/documentation.jpg";
import children from "../images/children.jpg";
import amenities from "../images/amenities.jpg";
import medical from "../images/medical.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, Suspense, useState, useReducer } from "react";
import blurpets from "../images/blurpets.png";
import blurbaggage from "../images/blurbaggage.png";
import blurchanging from "../images/blurchange.png";
import Spinner from "../images/spinner";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { checkImagesLoaded } from "../utilities/checkImagesLoaded";

const PolicyCard = (props) => {
  const secondStyle = {
    objectFit: "cover",
    objectPosition: "top left",
    height: "100%",
    width: "100%",
    maxHeight: "450px",
    filter: "brightness(30%)",
  };

  return (
    <Grid item xl={4} lg={4} md={6} xs={12} data-aos="fade-up">
      <Card>
        <Box sx={{ height: "350px" }}>
          <img
            src={props.image}
            alt="background"
            style={secondStyle}
            effect="blur"
            height="350px"
            width="400px"
          />
          <Box
            align="left"
            sx={{
              position: "relative",
              top: "-75%",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <Typography variant="text.primary" color="#FFFFFF" fontSize="30px">
              {props.title}
            </Typography>
            <Card
              sx={{
                color: "#FFFFFF",
                width: "100px",
                height: "1px",
                mt: "15px",
                ml: "3px",
              }}
            ></Card>
            <Box sx={{ mt: "30px" }}>
              <Typography
                variant="text.primary"
                color="#FFFFFF"
                fontSize="16px"
              >
                {props.body}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default function Policies() {
  const [isLoading, setIsLoading] = useState(true);
  const titles = [
    "Travel with Pets",
    "Baggage",
    "Changing Flights",
    "Delays",
    "Cancellations",
    "Documentation",
    "Children",
    "Medical Care",
    "Flight Amenities",
  ];
  const images = [
    pets,
    baggage,
    changing,
    delays,
    cancellations,
    documentation,
    children,
    medical,
    amenities,
  ];

  const slideStyle = {
    objectFit: "cover",
    objectPosition: "center",
    height: "100%",
    width: "100%",
    maxHeight: "450px",
    borderRadius: "5px",
    filter: "brightness(30%)",
  };

  const secondStyle = {
    objectFit: "cover",
    objectPosition: "top left",
    height: "100%",
    width: "100%",
    maxHeight: "450px",
    filter: "brightness(30%)",
  };

  const smallStyle = {
    objectFit: "contain",
    objectPosition: "top center",
    height: "100%",
    width: "100%",
    maxHeight: "450px",
    borderRadius: "5px",
  };

  useEffect(() => {
    Aos.init({ duration: 800 });
    checkImagesLoaded().then((res) => setIsLoading(false));
  }, []);

  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Spinner color="inherit" />
      </Backdrop>
      <Grow in={!isLoading}>
        <Container
          maxWidth="xl"
          sx={{
            marginBottom: "50px",
            visibility: isLoading ? "hidden" : "visible",
          }}
        >
          <Box align="center" sx={{ mt: "70px" }}>
            <Typography
              variant="text.primary"
              color="primay.main"
              fontSize={isAboveSM ? "40px" : "32px"}
              sx={{ width: "400", height: "90px", lineHeight: 1 }}
            >
              Flight Policies
            </Typography>
            <Card
              sx={{
                backgroundColor: "yellow.main",
                height: isAboveSM ? "5px" : "4px",
                width: isAboveSM ? "130px" : "105px",
                position: "relative",
                top: "-4px",
                left: isAboveSM ? "53px" : "43px",
              }}
            ></Card>
          </Box>

          <Box align="center" sx={{ ml: "14px", mt: "40px", mr: "12px" }}>
            <Grid sx={{ width: "92%" }} align="left">
              <Typography
                variant="text.primary"
                color="dark grey"
                fontSize="18px"
                sx={{ lineHeight: 1 }}
              >
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                eget maecenas eget sit et rhoncus. Sit consectetur. Eonsectetur
                adipiscing elit.{" "}
              </Typography>
            </Grid>
          </Box>

          <Box align="center">
            <Grid container spacing={3} sx={{ width: "92%", mt: "-5px" }}>
              {[...Array(9).keys()].map((key) => (
                <PolicyCard
                  image={images[key]}
                  title={titles[key]}
                  body={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae donec viverra quis pulvinar eu morbi nisl. Lectus nec eu at a gravida eros vitae mi auctor orci."
                  }
                  key={key}
                />
              ))}
            </Grid>
          </Box>
          <Card
            sx={{
              width: "100%",
              height: "40px",
              boxShadow: "none",
              border: "none",
            }}
          ></Card>
        </Container>
      </Grow>
    </div>
  );
}
