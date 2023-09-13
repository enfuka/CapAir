import Grid from "@mui/material/Grid";
import * as React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import WorkIcon from "@mui/icons-material/Work";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const PopularTopics = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "primary.main",
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sx={{ marginTop: "30px", marginBottom: "10px" }}>
            <Typography
              variant="text.primary"
              fontSize="24px"
              component="div"
              color="#FFFFFF"
              noWrap={true}
              align={isAboveSM ? "center" : "left"}
              ml={isAboveSM ? "0px" : "35px"}
            >
              Popular Topics
            </Typography>
          </Grid>
          <Grid item lg={2} md={0} xs={0}></Grid>
          <Grid
            item
            ml={isAboveSM ? "0px" : "30px"}
            align={isAboveSM ? "center" : "left"}
            lg={8 / 6}
            md={4}
            sm={6}
            xs={12}
          >
            <Button
              startIcon={<AirplanemodeActiveIcon sx={{ color: "#FFFFFF" }} />}
              onClick={() => navigate("/about/policies")}
            >
              <Typography
                variant="text.primary"
                fontSize="14px"
                color="#FFFFFF"
                noWrap={true}
                sx={{ textDecoration: "underline" }}
              >
                {" "}
                Change Flight
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            ml={isAboveSM ? "0px" : "30px"}
            align={isAboveSM ? "center" : "left"}
            lg={8 / 6}
            md={4}
            sm={6}
            xs={12}
          >
            <Button
              startIcon={<AttachMoneyIcon />}
              sx={{ color: "#FFFFFF" }}
              onClick={() => navigate("/rewards")}
            >
              <Typography
                variant="text.primary"
                fontSize="14px"
                color="#FFFFFF"
                noWrap={true}
                sx={{ textDecoration: "underline" }}
              >
                {" "}
                CapRewards
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            ml={isAboveSM ? "0px" : "30px"}
            align={isAboveSM ? "center" : "left"}
            lg={8 / 6}
            md={4}
            sm={6}
            xs={12}
          >
            <Button
              startIcon={<SupportAgentIcon />}
              sx={{ color: "#FFFFFF" }}
              onClick={() => navigate("/about/policies")}
            >
              <Typography
                variant="text.primary"
                fontSize="14px"
                color="#FFFFFF"
                noWrap={true}
                sx={{ textDecoration: "underline" }}
              >
                {" "}
                Talk to an Agent
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            ml={isAboveSM ? "0px" : "30px"}
            align={isAboveSM ? "center" : "left"}
            lg={1}
            md={4}
            sm={6}
            xs={12}
          >
            <Button
              startIcon={<WifiIcon />}
              sx={{ color: "#FFFFFF" }}
              onClick={() => navigate("/about/policies")}
            >
              <Typography
                variant="text.primary"
                fontSize="14px"
                color="#FFFFFF"
                noWrap={true}
                sx={{ textDecoration: "underline" }}
              >
                {" "}
                Wifi
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            ml={isAboveSM ? "0px" : "30px"}
            align={isAboveSM ? "center" : "left"}
            lg={10 / 6}
            md={4}
            sm={6}
            xs={12}
          >
            <Button
              startIcon={<PetsIcon />}
              sx={{ color: "#FFFFFF" }}
              onClick={() => navigate("/about/policies")}
            >
              <Typography
                variant="text.primary"
                fontSize="14px"
                color="#FFFFFF"
                noWrap={true}
                sx={{ textDecoration: "underline" }}
              >
                {" "}
                Traveling with pets
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            ml={isAboveSM ? "0px" : "30px"}
            align={isAboveSM ? "center" : "left"}
            lg={8 / 6}
            md={4}
            sm={6}
            xs={12}
          >
            <Button
              startIcon={<WorkIcon />}
              sx={{ color: "#FFFFFF" }}
              onClick={() => navigate("/about/policies")}
            >
              <Typography
                variant="text.primary"
                fontSize="14px"
                color="#FFFFFF"
                noWrap={true}
                sx={{ textDecoration: "underline" }}
              >
                {" "}
                Baggage
              </Typography>
            </Button>
          </Grid>
          <Grid item lg={2} md={0} xs={0}></Grid>
          <Grid item lg={1} xs={1}></Grid>
          <Grid item lg={10} xs={10}>
            <Card
              align="right"
              sx={{
                height: "2px",
                width: "100%",
                mt: "20px",
                backgroundColor: "yellow.main",
              }}
            ></Card>
          </Grid>
          <Grid item lg={1} xs={1}></Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default PopularTopics;
