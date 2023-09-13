import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./fonts/Gibson-Regular.otf";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import ErrorPage from "./pages/errorPage";
import BookingPage from "./pages/bookingPage";
import { AuthProvider, useIsAuthenticated } from "react-auth-kit";
import LoginPage from "./pages/loginPage";
import AboutPage from "./pages/aboutPage";
import CapRewardsPage from "./pages/capRewardsPage";
import MyTripPage from "./pages/myTripPage";
import MyTripsFormPage from "./pages/myTripsFormPage";
import CheckinFormPage from "./pages/checkinFormPage";
import CheckInPage from "./pages/checkinPage";
import {
  Route,
  Navigate,
  createRoutesFromElements,
  Outlet,
  useLocation,
} from "react-router-dom";
import PoliciesPage from "./pages/policiesPage";
import DashboardPage from "./pages/dashboardPage";
import SearchPage from "./pages/searchPage";
import AdPage from "./pages/adPage";

const PrivateRoute = () => {
  let isAuthenticated = useIsAuthenticated();
  let location = useLocation();

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const LoginRoute = () => {
  let isAuthenticated = useIsAuthenticated();

  // If authorized, navigate to home page
  // If not, return an outlet that will render child elements
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/dashboard" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index={true} element={<App />} />,
        <Route path="/flights/search" element={<SearchPage />} />
        <Route
          path="/flights/search/:type/:source/:destination/:departureDate/:returnDate/:passengers"
          element={<BookingPage />}
        />
        <Route path="/flights/mytrips" element={<MyTripsFormPage />} />
        <Route path="/flights/checkin" element={<CheckinFormPage />} />
        <Route path="/login" element={<LoginRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
        <Route path="rewards" element={<CapRewardsPage />} />
        <Route
          path="/mytrips/:confirmationNumber/:lastName"
          element={<MyTripPage />}
        />
        <Route
          path="/checkin/:confirmationNumber/:lastName"
          element={<CheckInPage />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/rewards" element={<CapRewardsPage />} />
        <Route path="/about/policies" element={<PoliciesPage />} />
      </Route>
      <Route path="/ad" element={<AdPage />} errorElement={<ErrorPage />} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <RouterProvider router={router} />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
