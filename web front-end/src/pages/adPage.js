import TripLookupForm from "../components/tripLookupForm";
import VideoBackground from "../components/videoBackground";
import { Paper, Box, Typography, Grow, Backdrop } from "@mui/material";
import { useEffect, useState } from "react";
import { checkImagesLoaded } from "../utilities/checkImagesLoaded";
import Spinner from "../images/spinner";
import CapAirLogo from "../images/capAirLogo";

export default function AdPage() {
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
            overflow: "hidden",
          }}
        >
          <VideoBackground video={"/wing2"} />
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
            <CapAirLogo
              sx={{
                height: "700px",
                width: "700px",
                marginTop: "-100px",
              }}
            />
            <Typography
              variant="h2"
              sx={{ color: "white", marginTop: "-100px" }}
            >
              cap-air.com
            </Typography>
          </Box>
        </Box>
      </Grow>
    </>
  );
}
