import "./styles/index.css";
import { useState, useEffect } from "react";
import TabPane from "./components/tabPane";
import { Box, Backdrop, Collapse, Grow } from "@mui/material";
import Slides from "./components/slides";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PopularDestinations from "./components/popularDestionations";
import Reviews from "./components/reviews";
import PopularTopics from "./components/popularTopics";
import { checkImagesLoaded } from "./utilities/checkImagesLoaded";
import Spinner from "./images/spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isAboveMD = useMediaQuery(theme.breakpoints.up("md"));
  const isAboveLG = useMediaQuery(theme.breakpoints.up("lg"));

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
          <Box component="div" sx={{ position: "relative", top: "0" }}>
            <Slides />
            <Box
              id="tabPaneBox"
              component="div"
              sx={{
                position: isAboveSM ? "absolute" : "relative",
                top: isAboveSM ? "15%" : "-38px",
                left: isAboveLG
                  ? "15%"
                  : isAboveMD
                  ? "22%"
                  : isAboveSM
                  ? "15%"
                  : "0",
                marginRight: isAboveSM ? "30px" : "0",
              }}
            >
              <TabPane />
            </Box>
          </Box>
          <PopularDestinations />
          <Reviews />
          <PopularTopics />
        </Box>
      </Grow>
    </>
  );
}

export default App;
