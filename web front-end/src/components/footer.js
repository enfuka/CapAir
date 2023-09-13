import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Couple } from "../images/couple";

export default function Footer() {
  let location = useLocation();
  let navigate = useNavigate();
  const [active, setActive] = React.useState(location.pathname);
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));

  React.useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <Box
      component="footer"
      className="no-print"
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={isAboveSM ? 5 : 1}
          align={isAboveSM ? "center" : "left"}
          px={isAboveSM ? "0px" : "20px"}
        >
          <Grid item xs={12} sm={4} sx={{ mt: "50px" }}>
            <Typography variant="h6" color="white.main" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="white.main">
              We are CapAir, dedicated to providing the best service to our
              customers.{" "}
              <Link color="inherit" href="/about">
                Learn More
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: "50px" }}>
            <Typography
              variant="h6"
              color="white.main"
              gutterBottom
              noWrap={true}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" color="white.main">
              7100 Forest Ave #100, Richmond, VA 23226
            </Typography>
            <Typography variant="body2" color="white.main">
              Email: info@capair.com
            </Typography>
            <Typography variant="body2" color="white.main">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: "50px" }}>
            <Typography variant="h6" color="white.main" gutterBottom>
              Follow Us
            </Typography>
            <Link
              href="https://www.facebook.com/"
              color="white.main"
              target="_blank"
            >
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="white.main"
              sx={{ pl: 1, pr: 1 }}
              target="_blank"
            >
              <Instagram />
            </Link>
            <Link
              href="https://www.twitter.com/"
              color="white.main"
              target="_blank"
            >
              <Twitter />
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Box my={5}>
              <Typography
                variant="body2"
                color="white.main"
                align="center"
                sx={{ mt: "-30px" }}
              >
                {"Copyright © "}
                <Link color="inherit" href="/about">
                  CapAir
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
                {" Made with "} <span>❤</span> {" by "} {"TeamWON"}
              </Typography>
            </Box>
            <Grid item xs={12}>
              <Card
                sx={{ height: "40px", backgroundColor: "primary.main" }}
              ></Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
