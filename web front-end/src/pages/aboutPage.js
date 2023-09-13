import Grid from "@mui/material/Grid";
import * as React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container, Grow, Backdrop } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import vacationpic from "../images/vacation.jpg";
import customerpic from "../images/customer.png";
import historypic from "../images/history.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import anchorpic from "../images/Anchor.svg";
import bulbpic from "../images/Bulb.svg";
import clappic from "../images/Clap.svg";
import handspic from "../images/Hands.svg";
import { useNavigate } from "react-router-dom";
import Spinner from "../images/spinner";
import { checkImagesLoaded } from "../utilities/checkImagesLoaded";

const PrincipleCard = (props) => {
  return (
    <Grid item lg={3} xs={12} align="center">
      <Card sx={{ width: "85%", boxShadow: "none", border: "none" }}>
        <img alt="content" src={props.image} style={{ width: "82px" }} />

        <Box sx={{ mt: "35px" }}>
          <Typography
            variant="text.primary"
            color="#000000"
            fontSize="28px"
            sx={{ width: "400", height: "90px", lineHeight: 1 }}
          >
            {props.title}
          </Typography>
        </Box>
        <Box sx={{ mt: "20px" }}>
          <Typography
            variant="text.primary"
            color="grey"
            fontSize="18px"
            sx={{ lineHeight: 1 }}
          >
            {" "}
            {props.body}{" "}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

<PrincipleCard
  title={"Safety"}
  body={
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maecenas eget sit et rhoncus. Sit consectetur."
  }
/>;

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isAboveMD = useMediaQuery(theme.breakpoints.up("md"));
  const isAboveLG = useMediaQuery(theme.breakpoints.up("lg"));

  const slideStyle = {
    objectFit: "contain",
    objectPosition: "top right",
    height: "100%",
    width: "100%",
    maxHeight: "450px",
    borderRadius: "5px",
  };

  const secondStyle = {
    objectFit: "contain",
    objectPosition: "top left",
    height: "100%",
    width: "100%",
    maxHeight: "450px",
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
    checkImagesLoaded().then(() => setIsLoading(false));
  }, []);

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
          sx={{ visibility: isLoading ? "hidden" : "visible" }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid
              container
              spacing={2}
              sx={{
                mt: isAboveSM ? "60px" : "25px",
                width: isAboveLG ? "75%" : "85%",
              }}
            >
              {/* First Row */}

              <Grid item md={6} xs={12} data-aos="fade-up" align={"left"}>
                <Card
                  sx={{
                    height: isAboveSM ? "400px" : "410px",
                    border: "none",
                    boxShadow: "none",
                    width: isAboveSM ? "450px" : "100%",
                  }}
                >
                  <Typography
                    variant="text.primary"
                    color="primary.main"
                    fontSize={isAboveSM ? "40px" : "34px"}
                    sx={{ width: "400", height: "90px", lineHeight: 1 }}
                  >
                    Embark on a journey beyond expectations
                  </Typography>
                  {isAboveMD ? (
                    <Card
                      sx={{
                        backgroundColor: "yellow.main",
                        height: "5px",
                        width: "133px",
                        position: "relative",
                        top: "-3px",
                      }}
                    ></Card>
                  ) : isAboveSM ? (
                    <Card
                      sx={{
                        backgroundColor: "yellow.main",
                        height: "5px",
                        width: "220px",
                        position: "relative",
                        top: "-3px",
                        left: "71px",
                      }}
                    ></Card>
                  ) : (
                    <Card
                      sx={{
                        backgroundColor: "yellow.main",
                        height: "4px",
                        width: "186px",
                        position: "relative",
                        top: "-3px",
                      }}
                    ></Card>
                  )}
                  <Card
                    sx={{
                      backgroundColor: "#E6E9EF",
                      width: "100%",
                      height: "1px",
                      mt: "30px",
                      mb: "50px",
                    }}
                  ></Card>
                  <Typography
                    variant="text.primary"
                    color="grey"
                    fontSize="18px"
                    sx={{ lineHeight: 1 }}
                  >
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi eget maecenas eget sit et rhoncus. Sit consectetur.
                    Eonsectetur adipiscing elit. Morbi eget maecenas eget sit et
                    rhoncus.{" "}
                  </Typography>
                  <br></br>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{ width: "50%", mt: "20px" }}
                    onClick={() => navigate(`/flights/search`)}
                  >
                    Book A Flight
                  </Button>
                </Card>
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
                data-aos="fade-up"
                sx={{ mt: isAboveSM ? "0px" : "15px" }}
              >
                <Box sx={{ width: "100%" }}>
                  <img
                    alt="vacation"
                    src={vacationpic}
                    style={isAboveMD ? slideStyle : smallStyle}
                  />
                </Box>
              </Grid>

              {/* End Row */}
              <Card
                sx={{
                  width: "100%",
                  height: isAboveMD ? "50px" : "0px",
                  border: "none",
                  boxShadow: "none",
                }}
              ></Card>

              {/*Guiding Principles */}

              <Grid container sx={{ mt: isAboveMD ? "-15px" : "40px" }}>
                <Grid item xs={12} align="center" data-aos="fade-up">
                  <Typography
                    variant="text.primary"
                    color="primary.main"
                    fontSize={isAboveSM ? "40px" : "34px"}
                    sx={{ width: "400", height: "50px", lineHeight: 1 }}
                  >
                    Guiding Principles
                  </Typography>
                  <Card
                    sx={{
                      backgroundColor: "yellow.main",
                      height: isAboveSM ? "5px" : "4px",
                      width: isAboveSM ? "165px" : "140px",
                      position: "relative",
                      top: "-3px",
                      left: isAboveSM ? "74px" : "63px",
                    }}
                  ></Card>
                </Grid>
              </Grid>
              <Box align="center">
                <Grid
                  item
                  xs={12}
                  container
                  spacing={1}
                  data-aos="fade-up"
                  sx={{ mt: "20px", height: "100%" }}
                >
                  <PrincipleCard
                    title={"Safety"}
                    image={anchorpic}
                    body={
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maecenas eget sit et rhoncus. Sit consectetur."
                    }
                  />
                  <PrincipleCard
                    title={"Reliability"}
                    image={handspic}
                    body={
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maecenas eget sit et rhoncus. Sit consectetur."
                    }
                  />
                  <PrincipleCard
                    title={"Customer-Centricity"}
                    image={clappic}
                    body={
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maecenas eget sit et rhoncus. Sit consectetur."
                    }
                  />
                  <PrincipleCard
                    title={"Innovation"}
                    image={bulbpic}
                    body={
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maecenas eget sit et rhoncus. Sit consectetur."
                    }
                  />
                </Grid>
              </Box>

              {/* End Guiding Principles */}

              <Card
                sx={{
                  width: "100%",
                  height: isAboveMD ? "50px" : "50px",
                  border: "none",
                  boxShadow: "none",
                }}
              ></Card>
              {/* Second Row */}

              <Grid item md={6} xs={12} sx={{ mt: isAboveSM ? "0px" : "10px" }}>
                <Box sx={{ position: "relative" }} data-aos="fade-up">
                  <img alt="customer" src={customerpic} style={secondStyle} />
                </Box>
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
                align={isAboveMD ? "right" : "left"}
                height="350px"
                sx={{ mt: isAboveMD ? "0px" : "30px" }}
              >
                <Card
                  sx={{
                    height: isAboveSM ? "350px" : "370px",
                    border: "none",
                    boxShadow: "none",
                    width: isAboveSM ? "450px" : "100%",
                  }}
                  align={"left"}
                  data-aos="fade-up"
                >
                  <Typography
                    variant="text.primary"
                    color="primary.main"
                    fontSize={isAboveSM ? "40px" : "34px"}
                    sx={{ width: "400", height: "90px", lineHeight: 1 }}
                  >
                    Customer Service
                  </Typography>
                  <Card
                    sx={{
                      backgroundColor: "yellow.main",
                      height: isAboveSM ? "5px" : "4px",
                      width: isAboveSM ? "127px" : "105px",
                      ml: isAboveMD ? "175px" : "0px",
                      position: "relative",
                      top: "-3px",
                      left: isAboveSM ? "0px" : "150px",
                    }}
                  ></Card>
                  <Card
                    sx={{
                      backgroundColor: "#E6E9EF",
                      width: "100%",
                      height: "1px",
                      mt: "30px",
                      mb: "50px",
                    }}
                  ></Card>
                  <Typography
                    variant="text.primary"
                    color="grey"
                    fontSize="18px"
                    sx={{ lineHeight: 1 }}
                  >
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi eget maecenas eget sit et rhoncus. Sit consectetur.
                    Eonsectetur adipiscing elit. Morbi eget maecenas eget sit et
                    rhoncus.{" "}
                  </Typography>
                  <br></br>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{ width: "60%", mt: "20px" }}
                    onClick={() => navigate(`/about/policies`)}
                  >
                    Talk To An Agent
                  </Button>
                </Card>
              </Grid>

              {/* End Row */}
              <Card
                sx={{
                  width: "100%",
                  height: isAboveMD ? "50px" : "0px",
                  border: "none",
                  boxShadow: "none",
                }}
              ></Card>

              {/* Third Row */}

              <Grid
                item
                md={6}
                xs={12}
                data-aos="fade-up"
                align={isAboveMD ? "left" : "left"}
                sx={{ mt: isAboveMD ? "0px" : "30px" }}
              >
                <Card
                  sx={{
                    height: isAboveSM ? "340px" : "355px",
                    border: "none",
                    boxShadow: "none",
                    width: isAboveSM ? "450px" : "100%",
                  }}
                >
                  <Typography
                    variant="text.primary"
                    color="primary.main"
                    fontSize={isAboveSM ? "40px" : "34px"}
                    sx={{ width: "400", height: "90px", lineHeight: 1 }}
                  >
                    Our History
                  </Typography>
                  {isAboveMD ? (
                    <Card
                      sx={{
                        backgroundColor: "yellow.main",
                        height: "5px",
                        width: "125px",
                        position: "relative",
                        top: "-3px",
                        left: "75px",
                      }}
                    ></Card>
                  ) : (
                    <Card
                      sx={{
                        backgroundColor: "yellow.main",
                        height: isAboveSM ? "5px" : "4px",
                        width: isAboveSM ? "120px" : "103px",
                        position: "relative",
                        top: "-3px",
                        left: isAboveSM ? "70px" : "65px",
                      }}
                    ></Card>
                  )}
                  <Card
                    sx={{
                      backgroundColor: "#E6E9EF",
                      width: "100%",
                      height: "1px",
                      mt: "30px",
                      mb: "50px",
                    }}
                  ></Card>
                  <Typography
                    variant="text.primary"
                    color="grey"
                    fontSize="18px"
                    sx={{ lineHeight: 1 }}
                  >
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi eget maecenas eget sit et rhoncus. Sit consectetur.
                    Eonsectetur adipiscing elit. Morbi eget maecenas eget sit et
                    rhoncus. Morbi eget maecenas eget sit et rhoncus. Sit
                    consectetur. Eonsectetur adipiscing elit. Morbi eget
                    maecenas eget sit et rhoncus.{" "}
                  </Typography>
                  <br></br>
                </Card>
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
                sx={{
                  mt: isAboveSM ? "0px" : "30px",
                  mb: isAboveSM ? "0px" : "20px",
                }}
              >
                <Box sx={{ position: "relative" }} data-aos="fade-up">
                  <img alt="history" src={historypic} style={smallStyle} />
                </Box>
              </Grid>

              {/* End Row */}
            </Grid>
          </Box>
          <Card
            sx={{
              width: "100%",
              height: isAboveMD ? "90px" : "30px",
              border: "none",
              boxShadow: "none",
            }}
          ></Card>
        </Container>
      </Grow>
    </div>
  );
}
