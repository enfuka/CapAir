import { Navbar, Link, Text, Button, Dropdown } from "@nextui-org/react";
import { icons } from "../images/Icons.js";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import CapAirLogo from "../images/capAirLogo.js";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import PersonIcon from "@mui/icons-material/Person";
import { useAuthUser } from "react-auth-kit";
import {
  Backdrop,
  Box,
  ClickAwayListener,
  Popper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoginForm from "./loginForm.js";
import { toast } from "react-hot-toast";
import CapAirIcon from "../images/capAirIcon.js";
import PasswordChangeModal from "./passwordChangeModal.js";

export default function Nav() {
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const signOut = useSignOut();

  const collapseItems = [
    { label: "Home", path: "/", isExactPath: true },
    { label: "Search Flights", path: "/flights/search" },
    { label: "My Trips", path: "/flights/mytrips" },
    { label: "Check-in", path: "/flights/checkin" },
    { label: "About", path: "/about", isExactPath: true },
    { label: "Policies", path: "/about/policies" },
    { label: "CapRewards®", path: "/rewards" },
  ];

  let location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : document.querySelector("nav"));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClose = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      return;
    }

    setAnchorEl(null);
  };

  const handleDropdownAction = (actionKey) => {
    switch (actionKey) {
      case "profile":
        navigate("/dashboard");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "change-password":
        setOpenPasswordModal(true);
        break;
      case "logout":
        signOut();
        toast.success("Successfully logged out");
        break;
      case "search_flights":
        navigate("/flights/search");
        break;
      case "my_trips":
        isAuthenticated()
          ? navigate("/dashboard")
          : navigate("/flights/mytrips");
        break;
      case "check_in":
        navigate("flights/checkin");
        break;
      case "flight_policies":
        navigate("/about/policies");
        break;
      case "about_us":
        navigate("/about");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Navbar
        className="no-print"
        isCompact
        disableShadow
        maxWidth="fluid"
        variant="sticky"
        containerCss={{
          position: "relative",
          background: "$primary",
          color: "$white",
          "& .nextui-navbar-link:hover": {
            color: "$primary",
          },
          "& .nextui-dropdown-button:hover": {
            color: "$primary",
          },
        }}
        disableBlur
      >
        <Navbar.Toggle
          css={{
            "& .line": {
              background: "white!important",
            },
          }}
          showIn="xs"
        />
        <Navbar.Brand
          css={{
            "@xs": {
              position: "static!important",
            },
            position: "absolute",
            left: "37%",
            right: "35%",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <CapAirLogo textfill="#fff" sx={{ height: "85px", width: "100px" }} />
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="$yellow"
          css={{
            "& .nextui-c-yrlUe::after": {
              background: "$yellow",
            },
          }}
          hideIn="xs"
          variant="underline"
        >
          <Navbar.Link isActive={active === "/"} onClick={() => navigate("/")}>
            Home
          </Navbar.Link>
          <Dropdown isBordered>
            <Navbar.Item isActive={active.startsWith("/flights")}>
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                  color: "inherit",
                }}
                iconRight={icons.chevron}
                ripple={false}
              >
                Flights
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              onAction={(actionKey) => handleDropdownAction(actionKey)}
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                key="search_flights"
                showFullDescription
                description="Search for flights to your destination. We’ll find the best deals for you"
                icon={icons.search}
              >
                Search Flights
              </Dropdown.Item>
              <Dropdown.Item
                key="my_trips"
                showFullDescription
                description={
                  isAuthenticated()
                    ? "Go to your dashboard to display all of your trips"
                    : "Search for past trip or upcoming trips by entering your confirmation number"
                }
                icon={icons.suitcase}
              >
                My Trips
              </Dropdown.Item>
              <Dropdown.Item
                key="check_in"
                showFullDescription
                description="Check-in for your flight and get your boarding pass"
                icon={icons.departure}
              >
                Check-in
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown isBordered>
            <Navbar.Item isActive={active.startsWith("/about")}>
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                  color: "inherit",
                }}
                iconRight={icons.chevron}
                ripple={false}
              >
                About
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              onAction={(actionKey) => handleDropdownAction(actionKey)}
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                key="about_us"
                showFullDescription
                description="Learn about our company and the CapAir advantage"
                icon={<CapAirIcon sx={{ height: "30px", width: "30px" }} />}
              >
                About Us
              </Dropdown.Item>
              <Dropdown.Item
                key="flight_policies"
                showFullDescription
                description="Explore our flight policies to prepare for your upcoming trip"
                icon={icons.idIcon}
              >
                Policies
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Navbar.Link
            isActive={active.startsWith("/rewards")}
            onClick={() => navigate("/rewards")}
          >
            CapRewards®
          </Navbar.Link>
        </Navbar.Content>
        {isAuthenticated() ? (
          <Navbar.Content
            css={{
              "@xs": {
                jc: "flex-end",
              },
            }}
          >
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Button
                    className="account-button"
                    auto
                    css={{
                      color: "$primary",
                      height: "38px",
                    }}
                    iconRight={isAboveSM ? icons.chevron : null}
                    ripple={false}
                  >
                    <PersonIcon
                      sx={{ marginRight: "5px", color: "white.main" }}
                    />
                    {isAboveSM && "Account"}
                  </Button>
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="primary"
                onAction={(actionKey) => handleDropdownAction(actionKey)}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {auth().email}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="dashboard" withDivider>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item key="change-password">
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item key="logout" color="error" withDivider>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        ) : (
          <Navbar.Content>
            <Navbar.Item>
              <Button
                className="login-button no-print"
                auto
                style={{ color: "$primary", height: "35px" }}
                onPress={handleClick}
              >
                <PersonIcon sx={{ marginRight: "5px", color: "white.main" }} />
                Login
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        )}
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item.label}
              isActive={
                item.isExactPath
                  ? active === item.path
                  : active.startsWith(item.path)
              }
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                onClick={() => {
                  navigate(item.path);
                  document.querySelector(".nextui-navbar-toggle").click();
                }}
              >
                {item.label}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Popper
          id={id}
          open={open}
          placement="bottom-end"
          anchorEl={anchorEl}
          sx={{
            marginTop: "25px",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Box
              sx={
                isAboveSM
                  ? { padding: "15px" }
                  : {
                      padding: "15px",
                      transform: "translateX(0)",
                      width: "100vw",
                    }
              }
            >
              <LoginForm setAnchorEl={setAnchorEl} />
            </Box>
          </ClickAwayListener>
        </Popper>
      </Backdrop>
      <PasswordChangeModal
        openPasswordModal={{
          open: openPasswordModal,
          setOpen: setOpenPasswordModal,
        }}
      />
    </>
  );
}
