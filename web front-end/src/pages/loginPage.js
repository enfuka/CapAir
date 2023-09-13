import LoginForm from "../components/loginForm";
import VideoBackground from "../components/videoBackground";
import { Box, Grow, Backdrop } from "@mui/material";
import { useEffect, useState } from "react";
import { checkImagesLoaded } from "../utilities/checkImagesLoaded";
import Spinner from "../images/spinner";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkImagesLoaded().then((res) => setIsLoading(false));
    toast.error("Please login to access your account.");
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
          <VideoBackground video={"/clouds"} />
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              position: "absolute",
              top: 20,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoginForm />
          </Box>
        </Box>
      </Grow>
    </>
  );
}
