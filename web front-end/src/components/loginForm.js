import { useState, useReducer, useEffect, useContext } from "react";
import * as Components from "../styles/styled-login-components";
import { useTheme, useMediaQuery } from "@mui/material";
import { toast, CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import LoadingDots from "./loadingDots";
import { useSignIn } from "react-auth-kit";
import { useLocation, useNavigate } from "react-router-dom";
import searchContext from "../contexts/searchContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const SignUpForm = (props) => {
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialSignUpForm = {
    email: "",
    password: "",
    passwordAgain: "",
  };

  const [SignUpFormInput, setSignUpFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialSignUpForm
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordMatch && passwordValid) {
      setIsLoading(true);
      registerUser().then((res) => setIsLoading(false));
    }
  };

  const registerUser = async () => {
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/user/register`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: SignUpFormInput.fullName,
        email: SignUpFormInput.email,
        password: SignUpFormInput.password,
      }),
    })
      .then((response) => {
        if (
          response.ok |
          (response.status === 400) |
          (response.status === 409)
        ) {
          return response.text();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => {
        if (data === "Email exists already") {
          toast.error("Email already exists");
        } else {
          toast.success("Account created successfully, please sign in");
          props.toggle(true);
        }
      })
      .catch((error) => console.error("USER/REGISTER ERROR", error));
  };

  useEffect(() => {
    SignUpFormInput.password.length >= 8
      ? setPasswordValid(true)
      : setPasswordValid(false);
    SignUpFormInput.password === SignUpFormInput.passwordAgain &&
    SignUpFormInput.password.length >= 8
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  }, [SignUpFormInput]);

  return (
    <Components.Form onSubmit={handleSubmit}>
      <Components.Title>Create Account</Components.Title>
      <Components.Input
        type="email"
        placeholder="Email"
        required
        disabled={isLoading}
        value={SignUpFormInput.email}
        onChange={(event) => {
          setSignUpFormInput({ email: event.target.value });
        }}
      />
      <div class="password-container">
        <Components.Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          disabled={isLoading}
          value={SignUpFormInput.password}
          onChange={(event) => {
            setSignUpFormInput({ password: event.target.value });
          }}
        />
        <i class="fa-solid fa-eye" id="eye">
          <IconButton
            tabIndex="-1"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </i>
      </div>

      <label
        style={{
          alignSelf: "start",
          textAlign: "left",
          fontSize: "10px",
          color:
            SignUpFormInput.password.length >= 1 && !passwordValid
              ? "red"
              : "gray",
        }}
      >
        Minimum 8 characters.
      </label>

      <div class="password-container">
        <Components.Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          required
          disabled={isLoading}
          value={SignUpFormInput.passwordAgain}
          onChange={(event) => {
            setSignUpFormInput({ passwordAgain: event.target.value });
          }}
        />
        <i class="fa-solid fa-eye" id="eye">
          <IconButton
            tabIndex="-1"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </i>
      </div>

      {passwordValid ? (
        <CheckmarkIcon
          style={{
            color: "green",
            position: "absolute",
            bottom: "197px",
            right: "20px",
          }}
        />
      ) : SignUpFormInput.password.length >= 1 ? (
        <ErrorIcon
          style={{
            color: "green",
            position: "absolute",
            bottom: "197px",
            right: "20px",
          }}
        />
      ) : null}

      {passwordMatch ? (
        <CheckmarkIcon
          style={{
            color: "green",
            position: "absolute",
            bottom: "120px",
            right: "20px",
          }}
        />
      ) : SignUpFormInput.passwordAgain.length >= 1 ? (
        <ErrorIcon
          style={{
            color: "green",
            position: "absolute",
            bottom: "120px",
            right: "20px",
          }}
        />
      ) : null}

      <label
        style={{
          alignSelf: "start",
          textAlign: "left",
          fontSize: "10px",
          color: "red",
          visibility:
            !passwordMatch && SignUpFormInput.passwordAgain.length >= 1
              ? "visible"
              : "hidden",
        }}
      >
        Passwords must match.
      </label>

      <Components.Button type="submit" disabled={isLoading}>
        {isLoading ? <LoadingDots color="white" /> : "Sign Up"}
      </Components.Button>
    </Components.Form>
  );
};

const SignInForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { search } = useContext(searchContext);

  const initialSignInForm = {
    email: "",
    password: "",
  };
  const [SignInFormInput, setSignInFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialSignInForm
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    loginUser().then((res) => setIsLoading(false));
  };

  const loginUser = async () => {
    let domain = process.env.REACT_APP_DOMAIN;
    
    let url = `${process.env.REACT_APP_PROTOCOL}://${domain}/user/login`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: SignInFormInput.email,
        password: SignInFormInput.password,
        itineraryId:
          search && location.pathname.startsWith("/flights/search")
            ? search
            : null,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          return response.text();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => {
        if (data === "Incorrect Credentials") {
          toast.error("Incorrect Credentials");
        } else {
          toast.success("Sign in successful!");
          signIn({
            token: data.token,
            expiresIn: data.expiresIn / 60, // in minutes (server returns in seconds)
            tokenType: "Bearer",
            authState: { email: SignInFormInput.email },
          });
          let { from } = location.state || { from: { pathname: "/" } };

          if (search && location.pathname.startsWith("/flights/search")) {
            toast.success("Booking added to your account!");
          } else {
            location.pathname === "/login"
              ? navigate(from)
              : navigate(location.pathname, { state: { logged: true } });
          }
          props.setAnchorEl(null);
        }
      })
      .catch((error) => console.error("LOGIN ERROR", error));
  };

  return (
    <Components.Form onSubmit={handleSubmit}>
      <Components.Title>Sign in</Components.Title>
      <Components.Input
        type="email"
        placeholder="Email"
        required
        disabled={isLoading}
        value={SignInFormInput.email}
        onChange={(event) => {
          setSignInFormInput({ email: event.target.value });
        }}
      />
      <div class="password-container">
        <Components.Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          disabled={isLoading}
          value={SignInFormInput.password}
          onChange={(event) => {
            setSignInFormInput({ password: event.target.value });
          }}
        />
        <i class="fa-solid fa-eye" id="eye">
          <IconButton
            tabIndex="-1"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </i>
      </div>
      <Components.Anchor href="#">Forgot your password?</Components.Anchor>
      <Components.Button type="submit" disabled={isLoading}>
        {isLoading ? <LoadingDots color="white" /> : "Sign In"}
      </Components.Button>
    </Components.Form>
  );
};

const SignInOverlayContent = (props) => {
  return (
    <>
      <Components.Title>Already have an account?</Components.Title>
      <Components.Paragraph>
        Welcome back! Sign in to continue your journey with us
      </Components.Paragraph>
      <Components.GhostButton onClick={() => props.toggle(true)}>
        Sign In
      </Components.GhostButton>
    </>
  );
};

const SignUpOverlayContent = (props) => {
  return (
    <>
      <Components.Title>No Account?</Components.Title>
      <Components.Paragraph>
        Create your account and start journey with us
      </Components.Paragraph>
      <Components.GhostButton onClick={() => props.toggle(false)}>
        Sign Up
      </Components.GhostButton>
    </>
  );
};

export default function LoginForm(props) {
  const [signIn, setSignIn] = useState(true);
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));

  return isAboveSM ? (
    <Components.Container>
      <Components.SignUpContainer signingin={signIn.toString()}>
        <SignUpForm toggle={setSignIn} />
      </Components.SignUpContainer>
      <Components.SignInContainer signingin={signIn.toString()}>
        <SignInForm setAnchorEl={props.setAnchorEl} />
      </Components.SignInContainer>
      <Components.OverlayContainer signingin={signIn.toString()}>
        <Components.Overlay signingin={signIn.toString()}>
          <Components.LeftOverlayPanel signingin={signIn.toString()}>
            <SignInOverlayContent toggle={setSignIn} />
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingin={signIn.toString()}>
            <SignUpOverlayContent toggle={setSignIn} />
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  ) : (
    <Components.MobileContainer>
      <Components.MobileSignUpContainer signingin={signIn.toString()}>
        <SignUpForm toggle={setSignIn} />
      </Components.MobileSignUpContainer>
      <Components.MobileSignInContainer signingin={signIn.toString()}>
        <SignInForm setAnchorEl={props.setAnchorEl} />
      </Components.MobileSignInContainer>
      <Components.MobileOverlayContainer signingin={signIn.toString()}>
        <Components.MobileOverlay signingin={signIn.toString()}>
          <Components.MobileRightOverlayPanel signingin={signIn.toString()}>
            <SignUpOverlayContent toggle={setSignIn} />
          </Components.MobileRightOverlayPanel>
          <Components.MobileLeftOverlayPanel signingin={signIn.toString()}>
            <SignInOverlayContent toggle={setSignIn} />
          </Components.MobileLeftOverlayPanel>
        </Components.MobileOverlay>
      </Components.MobileOverlayContainer>
    </Components.MobileContainer>
  );
}
