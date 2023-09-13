import { Carousel } from "antd";
import slide1 from "../images/slide1.jpg";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";
import firstcity from "../images/firstcity.jpg";
import secondcity from "../images/city2.jpg";
import { useNavigate } from "react-router-dom";
import image3 from '../images/city3.jpg'
import city4 from '../images/city4.jpg'

const slideStyle = {
  objectFit: "cover",
  height: "50vh",
  width: "100%",
};

const firstStyle = {
  objectFit: "cover",
  height: "50vh",
  width: "100%",
};

const Slides = () => {
  const navigate = useNavigate();

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        mi: 400,
        mq: 500,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isAboveMD = useMediaQuery(theme.breakpoints.up("lg"));
  const isAboveMI = useMediaQuery(theme.breakpoints.up("mi"));
  const isAboveMQ = useMediaQuery(theme.breakpoints.up("mq"));

  return isAboveMD ? (
    <Carousel
      autoplay
      autoplaySpeed={5000}
      pauseOnDotsHover
      dotPosition={"right"}
    >
      <div>
        <Box component="div" sx={{ position: "relative", top: "0" }}>
          <img style={slideStyle} src={firstcity} alt="city" />

          <Box
            id="tabPaneBox"
            component="div"
            sx={{
              position: "absolute",
              top: "23.8%",
              left: "66%",
              marginRight: "10%",
            }}
          >
            <Card
              style={{ width: "350px", height: "250px", opacity: ".9" }}
              sx={{ backgroundColor: "primary.main", borderRadius: "5px" }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="16px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                    sx={{ mt: "6%" }}
                  >
                    Join Our New CapRewards System
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                    sx={{ mt: "12%" }}
                  >
                    New Members Receive
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="24px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                  >
                    50,000 Miles
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      mt: "11%",
                      color: "#FFFFFF",
                      borderColor: "#FFFFFF",
                    }}
                    onClick={() => navigate("/rewards")}
                  >
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Box>
      </div>
      <div>
        <Box component="div" sx={{ position: "relative", top: "0" }}>
          <img style={slideStyle} src={secondcity} alt="desert" />

          <Box
            id="tabPaneBox"
            component="div"
            sx={{
              position: "absolute",
              top: "23.8%",
              left: "66%",
              marginRight: "10%",
            }}
          >
            <Card
              style={{ width: "350px", height: "250px", opacity: ".9" }}
              sx={{ backgroundColor: "primary.main", borderRadius: "5px" }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="16px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                    sx={{ mt: "10%" }}
                  >
                    Our Core Values
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                    sx={{ mt: "5%" }}
                  >
                    Safety
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                  >
                    Reliability
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                  >
                    Customer-Centricity
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                  >
                    Innovation
                  </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mt: "7%", color: "#FFFFFF", borderColor: "#FFFFFF" }}
                    onClick={() => navigate("/about")}
                  >
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Box>
      </div>
      <div>
        <Box component="div" sx={{ position: "relative", top: "0" }}>
          <img style={slideStyle} src={image3} alt="city" />

          <Box
            id="tabPaneBox"
            component="div"
            sx={{
              position: "absolute",
              top: "23.8%",
              left: "66%",
              marginRight: "10%",
            }}
          >
            <Card
              style={{ width: "350px", height: "250px", opacity: ".9" }}
              sx={{ backgroundColor: "primary.main", borderRadius: "5px" }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="16px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                    sx={{ mt: "6%" }}
                  >
                    Join Our New CapRewards System
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                    sx={{ mt: "12%" }}
                  >
                    New Members Receive
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="24px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                  >
                    50,000 Miles
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      mt: "11%",
                      color: "#FFFFFF",
                      borderColor: "#FFFFFF",
                    }}
                    onClick={() => navigate("/rewards")}
                  >
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Box>
      </div>
      <div>
        <Box component="div" sx={{ position: "relative", top: "0" }}>
          <img style={slideStyle} src={city4} alt="desert" />

          <Box
            id="tabPaneBox"
            component="div"
            sx={{
              position: "absolute",
              top: "23.8%",
              left: "66%",
              marginRight: "10%",
            }}
          >
            <Card
              style={{ width: "350px", height: "250px", opacity: ".9" }}
              sx={{ backgroundColor: "primary.main", borderRadius: "5px" }}
            >
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="16px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                    sx={{ mt: "6%" }}
                  >
                    Our Core Values
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                    sx={{ mt: "5%" }}
                  >
                    Safety
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                  >
                    Reliability
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                  >
                    Customer-Centricity
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="text.primary"
                    fontSize="14px"
                    component="div"
                    color="#FFFFFF"
                    align="center"
                  >
                    Innovation
                  </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mt: "7%", color: "#FFFFFF", borderColor: "#FFFFFF" }}
                    onClick={() => navigate("/about")}
                  >
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Box>
      </div>
    </Carousel>
  ) : isAboveSM ? (
    <div>
      <Carousel
        autoplay
        autoplaySpeed={10000}
        pauseOnDotsHover
        dotPosition={"right"}
      >
        <div>
          <Box component="div" sx={{ position: "relative", top: "0" }}>
            <img style={slideStyle} src={firstcity} alt="city" />

            <Box
              id="tabPaneBox"
              component="div"
              sx={{ position: "absolute", top: "20%", left: "18%" }}
            ></Box>
          </Box>
        </div>
        <div>
          <Box component="div" sx={{ position: "relative", top: "0" }}>
            <img style={slideStyle} src={slide1} alt="desert" />

            <Box
              id="tabPaneBox"
              component="div"
              sx={{ position: "absolute", top: "20%", left: "18%" }}
            ></Box>
          </Box>
        </div>
        <div>
          <Box component="div" sx={{ position: "relative", top: "0" }}>
            <img style={slideStyle} src={image3} alt="city" />

            <Box
              id="tabPaneBox"
              component="div"
              sx={{ position: "absolute", top: "20%", left: "18%" }}
            ></Box>
          </Box>
        </div>
        <div>
          <Box component="div" sx={{ position: "relative", top: "0" }}>
            <img style={slideStyle} src={city4} alt="desert" />

            <Box
              id="tabPaneBox"
              component="div"
              sx={{ position: "absolute", top: "20%", left: "18%" }}
            ></Box>
          </Box>
        </div>
      </Carousel>
    </div>
  ) : (
    <div>
      <Carousel
        autoplay
        autoplaySpeed={10000}
        pauseOnDotsHover
        dotPosition={"top"}
      >
        <div>
          <Box component="div" sx={{ position: "relative", top: "0" }}>
            <img style={slideStyle} src={firstcity} alt="city" />

            <Box
              id="tabPaneBox"
              component="div"
              align="center"
              sx={{ position: "absolute", top: "12%", width: "100%" }}
            >
              <Card
                style={{ width: "300px", height: "260px", opacity: ".9" }}
                sx={{ backgroundColor: "primary.main", borderRadius: "5px" }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                      sx={{ mt: "6%" }}
                    >
                      Join Our New CapRewards System
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                      sx={{ mt: "18%" }}
                    >
                      New Members Receive
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="24px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                    >
                      50,000 Miles
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        mt: "15%",
                        color: "#FFFFFF",
                        borderColor: "#FFFFFF",
                      }}
                      onClick={() => navigate("/rewards")}
                    >
                      Learn More
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Box>
        </div>
        <div>
          <Box component="div" sx={{ position: "relative", top: "0" }}>
            <img style={slideStyle} src={secondcity} alt="desert" />

            <Box
              id="tabPaneBox"
              component="div"
              align="center"
              sx={{ position: "absolute", top: "12%", width: "100%" }}
            >
              <Card
                style={{ width: "300px", height: "260px", opacity: ".9" }}
                sx={{ backgroundColor: "primary.main", borderRadius: "5px" }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                      sx={{ mt: "6%" }}
                    >
                      Our Core Values
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                      sx={{ mt: "10%" }}
                    >
                      Safety
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                    >
                      Reliability
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                    >
                      Customer-Centricity
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                    >
                      Innovation
                    </Typography>
                  </Grid>

                  <Grid item xs={12} align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        mt: "11%",
                        color: "#FFFFFF",
                        borderColor: "#FFFFFF",
                      }}
                      onClick={() => navigate("/about")}
                    >
                      Learn More
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Box>
        </div>
        <div>
          <Box component="div" sx={{ position: "relative", top: "0" }}>
            <img style={slideStyle} src={image3} alt="city" />

            <Box
              id="tabPaneBox"
              component="div"
              align="center"
              sx={{ position: "absolute", top: "12%", width: "100%" }}
            >
              <Card
                style={{ width: "300px", height: "260px", opacity: ".9" }}
                sx={{ backgroundColor: "primary.main", borderRadius: "5px" }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                      sx={{ mt: "6%" }}
                    >
                      Join Our New CapRewards System
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                      sx={{ mt: "18%" }}
                    >
                      New Members Receive
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="24px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                    >
                      50,000 Miles
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        mt: "15%",
                        color: "#FFFFFF",
                        borderColor: "#FFFFFF",
                      }}
                      onClick={() => navigate("/rewards")}
                    >
                      Learn More
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Box>
        </div>
        <div>
          <Box component="div" sx={{ position: "relative", top: "0" }}>
            <img style={slideStyle} src={city4} alt="desert" />

            <Box
              id="tabPaneBox"
              component="div"
              align="center"
              sx={{ position: "absolute", top: "12%", width: "100%" }}
            >
              <Card
                style={{ width: "300px", height: "260px", opacity: ".9" }}
                sx={{ backgroundColor: "primary.main", borderRadius: "5px" }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                      sx={{ mt: "6%" }}
                    >
                      Our Core Values
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                      sx={{ mt: "10%" }}
                    >
                      Safety
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                    >
                      Reliability
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                    >
                      Customer-Centricity
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="text.primary"
                      fontSize="16px"
                      component="div"
                      color="#FFFFFF"
                      align="center"
                    >
                      Innovation
                    </Typography>
                  </Grid>

                  <Grid item xs={12} align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        mt: "11%",
                        color: "#FFFFFF",
                        borderColor: "#FFFFFF",
                      }}
                      onClick={() => navigate("/about")}
                    >
                      Learn More
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Box>
        </div>
        
      </Carousel>
    </div>
  );
};
export default Slides;
