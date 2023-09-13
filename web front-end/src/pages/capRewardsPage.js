import Grid from "@mui/material/Grid";
import * as React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container, Grow, Backdrop } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import vacationpic from "../images/vacation.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import jumpstart from "../images/jumpstart.jpg";
import howtoearn from "../images/howtoearn.jpg";
import howtospend from "../images/howtospend.jpg";
import bookinjune from "../images/bookinjune.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import Spinner from "../images/spinner";
import { checkImagesLoaded } from "../utilities/checkImagesLoaded";

const ButtonStyle = (props) => {
  return (
    <Button
      fullWidth
      variant="contained"
      type="submit"
      sx={{ width: props.width, mt: props.mt }}
    >
      {props.text}
    </Button>
  );
};

const CardBodyText = (props) => {
  return (
    <Typography
      variant="text.primary"
      color="grey"
      fontSize="18px"
      sx={{ lineHeight: 1 }}
    >
      {" "}
      {props.text}{" "}
    </Typography>
  );
};

<CardBodyText
  text={
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget maecenas eget sit et rhoncus. Sit consectetur. Eonsectetur adipiscing elit. Morbi eget maecenas eget sit et rhoncus."
  }
/>;

const EarningCard = (props) => {
  return (
    <Typography
      variant="text.primary"
      color="grey"
      fontSize="18px"
      sx={{ lineHeight: 1 }}
    >
      {props.text}
    </Typography>
  );
};
export default function CapRewardsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isAboveMD = useMediaQuery(theme.breakpoints.up("md"));
  const isAboveLG = useMediaQuery(theme.breakpoints.up("lg"));
  let navigate = useNavigate();

  const slideStyle = {
    objectFit: "contain",
    objectPosition: "top right",
    height: "100%",
    width: "100%",
    maxHeight: "450px",
    borderRadius: "5px",
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
            marginBottom: "60px",
            visibility: isLoading ? "hidden" : "visible",
          }}
        >
          <Box align="center">
            <Grid
              container
              spacing={3}
              sx={{
                mt: "25px",
                width: isAboveLG ? "75%" : isAboveSM ? "85%" : "95%",
              }}
            >
              {/* First Row */}

              <Grid item md={6} xs={12}>
                <Box sx={{ position: "relative" }} data-aos="fade-up">
                  <img alt={"jumpstart"} src={jumpstart} style={slideStyle} />
                </Box>
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
                align={isAboveMD ? "right" : "center"}
                height="350px"
                sx={{ mt: isAboveMD ? "0px" : "20px" }}
              >
                <Card
                  sx={{
                    height: isAboveSM ? "340px" : "390px",
                    border: "none",
                    boxShadow: "none",
                    width: isAboveSM ? "450px" : "100%",
                  }}
                  align={"left"}
                  data-aos="fade-up"
                >
                  <Typography
                    variant="text.primary"
                    color="primary"
                    fontSize={isAboveSM ? "40px" : "34px"}
                    sx={{ width: "400", height: "90px", lineHeight: 1 }}
                  >
                    Use Points To Jumpstart Your Next Adventure
                  </Typography>
                  <Card
                    sx={{
                      backgroundColor: "yellow.main",
                      height: isAboveSM ? "5px" : "4px",
                      width: isAboveSM ? "182px" : "153px",
                      ml: isAboveSM ? "175px" : "0px",
                      position: "relative",
                      top: "-3px",
                    }}
                  ></Card>
                  <Card
                    sx={{
                      backgroundColor: "light grey",
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
                    sx={{ width: "70%", mt: "20px" }}
                  >
                    Enroll in CapRewards
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

              {/*Current Promotions */}
              <Grid
                container
                sx={{ mt: isAboveMD ? "0px" : "95px", ml: "13px" }}
              >
                <Grid
                  item
                  xs={12}
                  align={isAboveSM ? "center" : "left"}
                  data-aos="fade-up"
                >
                  <Typography
                    variant="text.primary"
                    color="primary"
                    fontSize={isAboveSM ? "40px" : "34px"}
                    sx={{
                      width: "400",
                      height: "90px",
                      lineHeight: 1,
                      paddingX: isAboveSM ? "0px" : "11px",
                    }}
                  >
                    Current Promotions
                  </Typography>
                  <Card
                    sx={{
                      backgroundColor: "yellow.main",
                      height: isAboveSM ? "5px" : "4px",
                      width: isAboveSM ? "195px" : "165px",
                      position: "relative",
                      top: "-3px",
                      ml: isAboveSM ? "140px" : "128px",
                    }}
                  ></Card>
                </Grid>
              </Grid>

              <Grid item lg={6} xs={12} align="center" data-aos="fade-up">
                <Card>
                  <Box sx={{ height: isAboveSM ? "350px" : "425px" }}>
                    <img
                      alt={"vacation"}
                      src={vacationpic}
                      style={secondStyle}
                    />
                    <Box
                      align="left"
                      sx={{
                        position: "relative",
                        top: "-95%",
                        marginLeft: "10%",
                        marginRight: "10%",
                      }}
                    >
                      <Typography
                        variant="text.primary"
                        color="white.main"
                        fontSize="30px"
                      >
                        New Members Receive 10,000 Bonus Points
                      </Typography>
                      <Card
                        sx={{
                          color: "white.main",
                          width: "100px",
                          height: "1px",
                          mt: "15px",
                          ml: "3px",
                        }}
                      ></Card>
                      <Box sx={{ my: "30px" }}>
                        <Typography
                          variant="text.primary"
                          color="white.main"
                          fontSize="16px"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vitae donec viverra quis pulvinar eu morbi nisl.
                          Lectus nec eu at a gravida eros vitae mi auctor orci.
                        </Typography>
                        <br></br>
                        <Button
                          fullWidth
                          variant="contained"
                          type="submit"
                          sx={{ width: "200px", mt: "20px" }}
                        >
                          Enroll in CapRewards
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              <Grid item lg={6} xs={12} align="center" data-aos="fade-up">
                <Card>
                  <Box sx={{ height: isAboveSM ? "350px" : "425px" }}>
                    <img
                      alt={"book in june"}
                      src={bookinjune}
                      style={secondStyle}
                    />
                    <Box
                      align="left"
                      sx={{
                        position: "relative",
                        top: "-95%",
                        marginLeft: "10%",
                        marginRight: "10%",
                      }}
                    >
                      <Typography
                        variant="text.primary"
                        color="white.main"
                        fontSize="30px"
                      >
                        Earn 1.5x Points On Flights Booked In July
                      </Typography>
                      <Card
                        sx={{
                          color: "white.main",
                          width: "100px",
                          height: "1px",
                          mt: "15px",
                          ml: "3px",
                        }}
                      ></Card>
                      <Box sx={{ mt: "30px" }}>
                        <Typography
                          variant="text.primary"
                          color="white.main"
                          fontSize="16px"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vitae donec viverra quis pulvinar eu morbi nisl.
                          Lectus nec eu at a gravida eros vitae mi auctor orci.
                        </Typography>
                        <br></br>
                        <Button
                          fullWidth
                          variant="contained"
                          type="submit"
                          sx={{ width: "200px", mt: "20px" }}
                          onClick={() => {
                            navigate("/flights/search");
                          }}
                        >
                          Search Flights
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              {/* End Current Promotions */}

              <Card
                sx={{
                  width: "100%",
                  height: isAboveMD ? "50px" : "0px",
                  border: "none",
                  boxShadow: "none",
                }}
              ></Card>

              {/* How To Earn */}
              <Grid
                item
                md={6}
                xs={12}
                data-aos="fade-up"
                align={"left"}
                sx={{ mt: isAboveSM ? "0px" : "30px" }}
              >
                <Card
                  sx={{
                    height: isAboveSM ? "310px" : "100%",
                    border: "none",
                    boxShadow: "none",
                    width: isAboveSM ? "450px" : "100%",
                  }}
                >
                  <Typography
                    variant="text.primary"
                    color="primary"
                    fontSize={isAboveSM ? "40px" : "34px"}
                    sx={{ width: "400", height: "90px", lineHeight: 1 }}
                  >
                    How To Earn <br></br>CapRewards Points
                  </Typography>

                  <Card
                    sx={{
                      backgroundColor: "yellow.main",
                      height: isAboveSM ? "5px" : "4px",
                      width: isAboveSM ? "105px" : "86px",
                      position: "relative",
                      top: "-3px",
                      ml: isAboveMD ? "225px" : isAboveSM ? "228px" : "193px",
                    }}
                  ></Card>

                  <Card
                    sx={{
                      backgroundColor: "light grey",
                      width: "100%",
                      height: "1px",
                      mt: "30px",
                      mb: "50px",
                    }}
                  ></Card>
                  <Grid align="left">
                    <Typography
                      variant="text.primary"
                      color="grey"
                      fontSize="18px"
                      sx={{ lineHeight: 1 }}
                    >
                      1. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.
                    </Typography>
                    <br></br>
                    <Typography
                      variant="text.primary"
                      color="grey"
                      fontSize="18px"
                      sx={{ lineHeight: 1 }}
                    >
                      2. Morbi eget maecenas eget sit et.
                    </Typography>
                    <br></br>
                    <Typography
                      variant="text.primary"
                      color="grey"
                      fontSize="18px"
                      sx={{ lineHeight: 1 }}
                    >
                      3. Sit consectetur. Eonsectetur adipiscing.
                    </Typography>
                    <br></br>
                    <Typography
                      variant="text.primary"
                      color="grey"
                      fontSize="18px"
                      sx={{ lineHeight: 1 }}
                    >
                      4. Morbi eget maecenas eget sit et.
                    </Typography>
                    <br></br>
                    <Typography
                      variant="text.primary"
                      color="grey"
                      fontSize="18px"
                      sx={{ lineHeight: 1 }}
                    >
                      5. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.
                    </Typography>
                    <br></br>
                    <Typography
                      variant="text.primary"
                      color="grey"
                      fontSize="18px"
                      sx={{ lineHeight: 1 }}
                    >
                      6. Morbi eget maecenas eget sit et rhoncus.
                    </Typography>
                  </Grid>
                </Card>
              </Grid>

              <Grid item md={6} xs={12} data-aos="fade-up">
                <Box sx={{ width: "100%", mt: isAboveSM ? "0px" : "30px" }}>
                  <img
                    alt={"how to earn"}
                    src={howtoearn}
                    style={isAboveMD ? slideStyle : smallStyle}
                  />
                </Box>
              </Grid>

              {/* End How To Earn */}

              <Card
                sx={{
                  width: "100%",
                  height: isAboveMD ? "50px" : "0px",
                  border: "none",
                  boxShadow: "none",
                }}
              ></Card>

              {/* Reward Tiers */}
              <Grid
                item
                xs={12}
                data-aos="fade-up"
                sx={{ mt: isAboveSM ? "-10px" : "15px" }}
              >
                <Box align={isAboveSM ? "center" : "left"}>
                  <Typography
                    variant="text.primary"
                    color="primary"
                    fontSize={isAboveSM ? "40px" : "34px"}
                    sx={{ width: "400", height: "90px", lineHeight: 1 }}
                  >
                    Reward Tiers
                  </Typography>

                  <Card
                    sx={{
                      backgroundColor: "yellow.main",
                      height: isAboveSM ? "5px" : "4px",
                      width: isAboveSM ? "75px" : "65px",
                      position: "relative",
                      top: "-3px",
                      ml: isAboveMD ? "140px" : isAboveSM ? "150px" : "120px",
                    }}
                  ></Card>
                </Box>
              </Grid>

              <Card
                align="left"
                sx={{
                  width: "100%",
                  ml: "24px",
                  border: "none",
                  boxShadow: "none",
                  mt: "10px",
                  mb: "-10px",
                  
                }}
                data-aos="fade-up"
              >
                <Typography
                  variant="text.primary"
                  fontSize={isAboveSM ? "16px" : "16px"}
                  sx={{ width: "400", height: "90px", lineHeight: 1 }}
           
                  color="grey"
                >
                  Elevate from Bronze to Gold tier by earning CapRewards points.
                  <Link href="/UserGuide.pdf" download>
                    {" "}
                    Download full user guide{" "}
                  </Link>{" "}
                  for more details.
                </Typography>
              </Card>

              <Grid item lg={4} xs={12} data-aos="fade-up">
                <Card
                  sx={{
                    height: "300px",
                    width: "100%",
                    backgroundColor: "primary.main",
                  }}
                >
                  <Box sx={{ mt: isAboveSM ? "40px" : "40px", mx: "30px" }}>
                    <Grid container alignItems="center">
                      <Grid item align="left" xs={6}>
                        <Typography
                          variant="text.primary"
                          color="white.main"
                          fontSize="30px"
                        >
                          Bronze
                        </Typography>
                      </Grid>
                      <Grid item align="right" xs={6}>
                        <Typography
                          variant="text.primary"
                          fontSize="16px"
                          align="right"
                          color="yellow.main"
                        >
                          0-700,000 Points
                        </Typography>
                      </Grid>
                      <Grid item xs={12} align="left">
                        <Card
                          sx={{
                            backgroundColor: "yellow.main",
                            width: "88px",
                            height: "1px",
                            mt: "-5px",
                            ml: "2px",
                            mb: "10px",
                          }}
                        ></Card>
                      </Grid>
                    </Grid>

                    <Typography
                      color="white.main"
                      align="left"
                      sx={{ mt: "10px" }}
                    >
                      All members enjoy these rewards:
                    </Typography>
                    <Box sx={{ mt: "10px" }} align="left">
                      <Typography
                        variant="text.primary"
                        color="white.main"
                        fontSize="16px"
                      >
                        - Redeem points towards discounted or free flights
                        <br></br>- Redeem points towards seat upgrades
                        <br></br>- Redeem points towards airline fees
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              <Grid item lg={4} xs={12} data-aos="fade-up">
                <Card
                  sx={{
                    height: "300px",
                    width: "100%",
                    backgroundColor: "primary.main",
                  }}
                >
                  <Box sx={{ mt: isAboveSM ? "40px" : "40px", mx: "30px" }}>
                    <Grid container alignItems="center">
                      <Grid item align="left" xs={6}>
                        <Typography
                          variant="text.primary"
                          color="white.main"
                          fontSize="30px"
                        >
                          Silver
                        </Typography>
                      </Grid>
                      <Grid item align="right" xs={6}>
                        <Typography
                          variant="text.primary"
                          fontSize="16px"
                          align="right"
                          color="yellow.main"
                        >
                          700,000+ Points
                        </Typography>
                      </Grid>
                      <Grid item xs={12} align="left">
                        <Card
                          sx={{
                            backgroundColor: "yellow.main",
                            width: "70px",
                            height: "1px",
                            mt: "-5px",
                            ml: "2px",
                            mb: "10px",
                          }}
                        ></Card>
                      </Grid>
                    </Grid>

                    <Typography
                      color="white.main"
                      align="left"
                      sx={{ mt: "10px" }}
                    >
                      Enjoy and upgraded experience with:
                    </Typography>
                    <Box sx={{ mt: "10px" }} align="left">
                      <Typography
                        variant="text.primary"
                        color="white.main"
                        fontSize="16px"
                      >
                        - One complimentary checked bag
                        <br></br>- Priority boarding
                        <br></br>- Priority booking
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              <Grid item lg={4} xs={12} data-aos="fade-up">
                <Card
                  sx={{
                    height: "300px",
                    width: "100%",
                    backgroundColor: "primary.main",
                  }}
                >
                  <Box sx={{ mt: isAboveSM ? "40px" : "40px", mx: "30px" }}>
                    <Grid container alignItems="center">
                      <Grid item align="left" xs={6}>
                        <Typography
                          variant="text.primary"
                          color="white.main"
                          fontSize="30px"
                        >
                          Gold
                        </Typography>
                      </Grid>
                      <Grid item align="right" xs={6}>
                        <Typography
                          variant="text.primary"
                          fontSize="16px"
                          align="right"
                          color="yellow.main"
                        >
                          1.4 Million+ Points
                        </Typography>
                      </Grid>
                      <Grid item xs={12} align="left">
                        <Card
                          sx={{
                            backgroundColor: "yellow.main",
                            width: "63px",
                            height: "1px",
                            mt: "-5px",
                            ml: "2px",
                            mb: "10px",
                          }}
                        ></Card>
                      </Grid>
                    </Grid>

                    <Typography
                      color="white.main"
                      align="left"
                      sx={{ mt: "10px" }}
                    >
                      Make the most of your journey with:
                    </Typography>
                    <Box sx={{ mt: "10px" }} align="left">
                      <Typography
                        variant="text.primary"
                        color="white.main"
                        fontSize="16px"
                      >
                        - Free seat upgrades
                        <br></br>- Two complementary checked bags
                        <br></br>- Complimentary in-flight food and drink
                        voucher
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              {/* End Reward Tiers */}

              <Card
                sx={{
                  width: "100%",
                  height: isAboveMD ? "50px" : "0px",
                  border: "none",
                  boxShadow: "none",
                }}
              ></Card>

              {/* How To Spend */}
              <Grid item md={6} xs={12} sx={{ mt: isAboveSM ? "0px" : "30px" }}>
                <Box sx={{ position: "relative" }} data-aos="fade-up">
                  <img
                    alt={"how to spend"}
                    src={howtospend}
                    style={slideStyle}
                  />
                </Box>
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
                align={isAboveMD ? "right" : "left"}
                height="350px"
                sx={{ mt: isAboveMD ? "0px" : "25px" }}
              >
                <Card
                  sx={{
                    height: isAboveSM ? "340px" : "350px",
                    border: "none",
                    boxShadow: "none",
                    width: isAboveSM ? "450px" : "100%",
                  }}
                  align={"left"}
                  data-aos="fade-up"
                >
                  <Typography
                    variant="text.primary"
                    color="primary"
                    fontSize={isAboveSM ? "40px" : "34px"}
                    sx={{ width: "100%", height: "90px", lineHeight: 1 }}
                  >
                    How To Spend CapRewards Points
                  </Typography>
                  <Card
                    sx={{
                      backgroundColor: "yellow.main",
                      height: isAboveSM ? "5px" : "4px",
                      width: isAboveSM ? "105px" : "85px",

                      position: "relative",
                      top: "-3px",
                      ml: isAboveMD ? "225px" : isAboveSM ? "228px" : "193px",
                    }}
                  ></Card>
                  <Card
                    sx={{
                      backgroundColor: " light grey",
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
                </Card>
              </Grid>

              {/* End How To Spend */}
              <Card sx={{width: "100%", height: isAboveSM ? "30px" : "0px", border: "none", boxShadow: "none",}}></Card>
            </Grid>
          </Box>
        </Container>
      </Grow>
    </div>
  );
}
