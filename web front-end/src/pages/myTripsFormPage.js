import TripLookupForm from "../components/tripLookupForm";
import VideoBackground from "../components/videoBackground";
import { Paper, Box, Typography, Grow, Backdrop } from "@mui/material";
import { useEffect, useState } from "react";
import { checkImagesLoaded } from "../utilities/checkImagesLoaded";
import Spinner from "../images/spinner";

export default function MyTripsFormPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkImagesLoaded().then((res) => setIsLoading(false));
  }, []);

  return (
    <>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Spinner color="inherit" />
      </Backdrop>
      <Grow in={!isLoading}>
        <Box
          sx={{
            minHeight: "100vh",
            visibility: isLoading ? "hidden" : "visible",
          }}
        >
          <VideoBackground video={"/wing"} />
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              color="#FFFFFF"
              mb="10px"
              sx={{ textShadow: "1px 1px #000000" }}
            >
              My Trips
            </Typography>
            <Paper
              elevation={3}
              sx={{
                paddingTop: "20px",
                marginX: "15px",
                borderRadius: "10px",
              }}
            >
              <TripLookupForm type="mytrips" />
            </Paper>
          </Box>
        </Box>
      </Grow>
    </>
  );
}
