import Nav from "./components/navbar";
import { Grid, Box } from "@mui/material";
import { ConfigProvider } from "antd";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createTheme as nextCreateTheme,
  NextUIProvider,
} from "@nextui-org/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchContext from "./contexts/searchContext";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ChatComponent from "./components/chatBot";
import UserInfoModal from "./components/userInfoModal";
import ScrollToTopButton from "./components/scrollToTopButton";

let muiTheme = createTheme({
  palette: {
    primary: {
      main: "#003865",
      CTblue: "#005EB8",
    },
    secondary: {
      main: "#D9D9D6",
    },
    black: {
      main: "#000000",
    },
    white: {
      main: "#ffffff",
    },
    yellow: {
      main: "#FDDA24",
    },
  },
  text: {
    white: "#ffffff",
  },
  typography: {
    allVariants: {
      fontFamily: "Gibson",
    },
  },
});

const antTheme = {
  token: {
    colorPrimary: "#003865",
    colorSecondary: "##888b88",
    fontFamily: "Gibson",
  },
  components: {
    Segmented: {
      colorPrimary: "#003865",
      colorBgElevated: "#003865",
      colorText: "#ffffff",
    },
    Tabs: {
      colorPrimary: "#003865",
      colorBgContainer: "rgba(255, 255, 255, 1)",
      colorFill: "#003865",
      colorFillAlter: "#003865",
      colorText: "#ffffff",
      colorPrimaryBorder: "#000000",
      lineType: "none",
    },
  },
};

const nextTheme = nextCreateTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#003865",
      secondary: "#FDDA24",
      yellow: "#FDDA24",
    },
  },
});

const Layout = () => {
  const [search, setSearch] = useState(null);
  const [printExpanded, setPrintExpanded] = useState(false);
  const value = { search, setSearch, printExpanded, setPrintExpanded };
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <NextUIProvider theme={nextTheme}>
        <ConfigProvider theme={antTheme}>
          <ThemeProvider theme={muiTheme}>
            <SearchContext.Provider value={value}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Toaster />
                <Box component="div" sx={{ maxWidth: "100%" }}>
                  <Nav />
                  <UserInfoModal type="prompt" />
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="stretch"
                    rowSpacing={2}
                    columnSpacing={0}
                  >
                    <Grid item xs></Grid>
                  </Grid>
                  <main>
                    <Outlet />
                  </main>
                  <ChatComponent />
                </Box>
                <ScrollToTopButton />
                <Footer />
              </LocalizationProvider>
            </SearchContext.Provider>
          </ThemeProvider>
        </ConfigProvider>
      </NextUIProvider>
    </>
  );
};

export default Layout;
