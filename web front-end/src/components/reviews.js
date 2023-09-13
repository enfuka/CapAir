import { Carousel } from "antd";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import bagpic from "../images/pic16.jpg";
import backicon from "../images/backarrow.png";
import veer from "../images/Veer.png";
import isaiah from "../images/Isiaih.png";
import sydney from "../images/Sydney.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import michael from '../images/michael.ackley.jpg';
import enes from '../images/enes.kalinsazlioglu.jpg';
import connor from '../images/connor.roth.jpg';
import pri from '../images/priscilla.hui.jpg';
import pranav from '../images/pranav.masson.jpg';
import abby from '../images/abby.searles.jpg';
import amanda from '../images/amanda.davis.jpg'
import jay from '../images/jagteshwar.singh.jpg';
import sam from '../images/samuel.ridderhoff.jpg';


const ReviewCard = (props) => {
  return (
    <Card
      sx={{
        opacity: 0.9,
        backgroundColor: "primary.main",
        height: "270px",
      }}
    >
      <CardContent>
        <Grid container mt="7%" ml="3%">
          <Grid item xs={"auto"} sx={{ mt: "-1%" }}>
            <img
              src={props.image}
              style={{ width: "35px", borderRadius: "50%" }}
              alt="veerpic"
            />
          </Grid>
          <Grid item xs>
            <Typography
              gutterBottom
              variant="text.primary"
              fontSize="18px"
              component="div"
              align="left"
              color="#FFFFFF"
              noWrap={true}
              sx={{ ml: "10px" }}
            >
              @{props.username}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ m: "15px", mt: "6%" }}>
          <Typography
            variant="text.primary"
            align="left"
            fontSize="16px"
            color="#FFFFFF"
          >
            {props.bodytext}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

const DesktopSlide = (props) => {
  return (
    <Container display="flex" maxWidth="xl" sx={{ mt: "60px" }}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ReviewCard
            image={props.image1}
            username={props.username1}
            bodytext={props.bodytext1}
          />
        </Grid>
        <Grid item xs={4}>
          <ReviewCard
            image={props.image2}
            username={props.username2}
            bodytext={props.bodytext2}
          />
        </Grid>
        <Grid item xs={4}>
          <ReviewCard
            image={props.image3}
            username={props.username3}
            bodytext={props.bodytext3}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const MobileSlide = (props) => {
  return (
    <Container display="flex" maxWidth="xl" sx={{ mt: "60px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ReviewCard
            image={props.image}
            username={props.username}
            bodytext={props.bodytext}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const Reviews = () => {
  const theme = useTheme();
  const isAboveXS = useMediaQuery(theme.breakpoints.up("sm"));
  const isAboveSM = useMediaQuery(theme.breakpoints.up("md"));
  const isAboveLG = useMediaQuery(theme.breakpoints.up("lg"));

  const Reviews = [
    [
      "AAdventurer",
      '"Had an amazing experience with CapAir today! The flight attendants were friendly and attentive, and the overall service was top-notch. #HappyTraveler"',
    ],
    [
      "TweetTraveller",
      "“Their impeccable service, comfortable seats, and friendly staff made my journey truly unforgettable. #CapAirFan”",
    ],
    [
      "CloudSurfer",
      '"Impressed with CapAir punctuality and smooth boarding process. No delays or hassles whatsoever. #EfficiencyWins"',
    ],



    [
      "FlyHighGuy",
      '"Thank you @CapAir for the smoothest flight ever! Your crew made the journey a delightful one. Cannot wait to fly with you again! #CapAir #HappyFlyer"',
    ],
    [
      "JetSetGo",
      '"Shoutout to @CapAir for the incredible in-flight entertainment options! The time flew by (literally) with all the movies and shows available. #CapAirExperience"',
    ],
    [
      "SkyGazer",
      '"Landed safely and with a big smile on my face, thanks to @CapAirs top-notch pilots! Kudos to the entire team for a job well done! #GratefulFlyer #CapAir"',
    ],




    [
      "AirWander",
      '"Just experienced the tastiest in-flight meal ever, courtesy of @CapAirs onboard catering. Highly recommend upgrading your meal! #CapAirCuisine"',
    ],
    [
      "AeroLark",
      '"Feeling refreshed and rejuvenated after my @CapAir flight. Their comfortable seats and ample legroom make all the difference during a long journey! #CapAirComfort"',
    ],
    [
      "TripAce",
      '"Major props to @CapAir for their excellent customer service. They went above and beyond to accommodate my needs, and Im beyond impressed! #CapAirCares"',
    ],





    [
      "OnAir89",
      '"Couldnt be happier with my @CapAir experience today. No hassles, no delays just a smooth and enjoyable journey. Thanks, CapAir! #HappyTraveler"',
    ],
    [
      "FastFlyer",
      '"Just touched down after an incredible flight with @CapAir. From check-in to touchdown, everything was flawless! #CapAirExcellence #HappyFlyer"',
    ],
    [
      "WingZoom",
      '"Already looking forward to my next trip with @CapAir! Theyve set the bar high with their exceptional service and attention to detail. #LoyalCustomer #CapAirLove"',
    ],


  ];

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        alt="backicon"
        src={backicon}
        className={className}
        style={{
          ...style,
          display: "block",
          transform: "rotate(180deg)",
          height: isAboveSM ? "60px" : "45px",
          width: isAboveSM ? "60px" : "45px",
          top: isAboveSM ? "165px" : "175px",
          right: "-38px",
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        src={backicon}
        className={className}
        alt="backicon"
        style={{
          ...style,
          display: "block",
          height: isAboveSM ? "60px" : "45px",
          width: isAboveSM ? "60px" : "45px",
          top: isAboveSM ? "165px" : "175px",
          left: "-38px",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const slideStyle = {
    objectFit: "cover",
    height: "60vh",
    width: "100%",
    minHeight: "500px"
  };
  const mobileStyle = {
    objectFit: "cover",
    height: "60vh",
    width: "100%",
    filter: "brightness(80%)",
  };

  return isAboveSM ? (
    <div>
      <Box component="div" sx={{ position: "relative", top: "10px" }}>
        <Box sx={{ position: "relative" }}>
          <img alt="bag" src={bagpic} style={slideStyle} />
        </Box>
        <Box>
          <Typography
            variant="text.primary"
            color="#FFFFFF"
            fontSize={isAboveSM ? "40px" : "32px"}
            align="center"
            style={{
              position: "absolute",
              width: "100vw",
              top: "10%",
            }}
          >
            Our Reviews
          </Typography>
          <Carousel
            arrows
            autoplay
            autoplaySpeed={10000}
            pauseOnDotsHover
            dotPosition={"bottom"}
            dotColor="#000000"
            {...settings}
            style={{
              position: "absolute",
              height: "75%",
              width: "78%",
              top: "20%",
              left: "11%",
            }}
          >
            <div>
              <DesktopSlide
                image1={veer}
                username1={Reviews[0][0]}
                bodytext1={Reviews[0][1]}
                image2={isaiah}
                username2={Reviews[1][0]}
                bodytext2={Reviews[1][1]}
                image3={sydney}
                username3={Reviews[2][0]}
                bodytext3={Reviews[2][1]}
              />
            </div>
            <div>
              <DesktopSlide
                image1={michael}
                username1={Reviews[3][0]}
                bodytext1={Reviews[3][1]}
                image2={enes}
                username2={Reviews[4][0]}
                bodytext2={Reviews[4][1]}
                image3={connor}
                username3={Reviews[5][0]}
                bodytext3={Reviews[5][1]}
              />
            </div>
            <div>
              <DesktopSlide
                image1={pri}
                username1={Reviews[6][0]}
                bodytext1={Reviews[6][1]}
                image2={pranav}
                username2={Reviews[7][0]}
                bodytext2={Reviews[7][1]}
                image3={abby}
                username3={Reviews[8][0]}
                bodytext3={Reviews[8][1]}
              />
            </div>
            <div>
              <DesktopSlide
                image1={amanda}
                username1={Reviews[9][0]}
                bodytext1={Reviews[9][1]}
                image2={sam}
                username2={Reviews[10][0]}
                bodytext2={Reviews[10][1]}
                image3={jay}
                username3={Reviews[11][0]}
                bodytext3={Reviews[11][1]}
              />
            </div>
          </Carousel>
        </Box>
      </Box>
    </div>
  ) : (
    <div>
      <Box component="div" sx={{ position: "relative", top: "10px" }}>
        <Box>
          <img alt="bag" src={bagpic} style={mobileStyle} />
        </Box>
        <Box>
          <Typography
            position="absolute"
            variant="text.primary"
            color="#FFFFFF"
            align="center"
            fontSize={isAboveSM ? "40px" : "32px"}
            style={{
              width: "100vw",
              top: "10%",
            }}
          >
            Our Reviews
          </Typography>
          <Carousel
            arrows
            autoplay
            autoplaySpeed={10000}
            pauseOnDotsHover
            dotPosition={"bottom"}
            dotColor="#000000"
            {...settings}
            style={{
              position: "absolute",
              height: "80%",
              width: "78%",
              top: "15%",
              left: "11%",
            }}
          >
            <div>
              <MobileSlide
                image={veer}
                username={Reviews[0][0]}
                bodytext={Reviews[0][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={isaiah}
                username={Reviews[1][0]}
                bodytext={Reviews[1][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={sydney}
                username={Reviews[2][0]}
                bodytext={Reviews[2][1]}
              />
            </div>





            <div>
              <MobileSlide
                image={michael}
                username={Reviews[3][0]}
                bodytext={Reviews[3][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={enes}
                username={Reviews[4][0]}
                bodytext={Reviews[4][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={connor}
                username={Reviews[5][0]}
                bodytext={Reviews[5][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={pri}
                username={Reviews[6][0]}
                bodytext={Reviews[6][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={pranav}
                username={Reviews[7][0]}
                bodytext={Reviews[7][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={abby}
                username={Reviews[8][0]}
                bodytext={Reviews[8][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={amanda}
                username={Reviews[9][0]}
                bodytext={Reviews[9][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={sam}
                username={Reviews[10][0]}
                bodytext={Reviews[10][1]}
              />
            </div>
            <div>
              <MobileSlide
                image={jay}
                username={Reviews[11][0]}
                bodytext={Reviews[11][1]}
              />
            </div>
          </Carousel>
        </Box>
      </Box>
    </div>
  );
};

export default Reviews;
