import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  TextField,
  Typography,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { GoogleIcon } from "./CustomIcons";
import { NavLink, useNavigate } from "react-router";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  position: "relative",
  height: "100dvh",
  width: "100%",
  overflow: "hidden",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password } = userData;
    let isValid = true;

    if (!fname.trim()) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number starting with 6-9");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!isValid) return;

    const res = await fetch("/userregistration", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ fname, email, mobile, password }),
    });

    const data = await res.json();
    if (res.status === 200 || data) {
      toast.success("User registered successfully!");
      setUserData({ fname: "", email: "", mobile: "", password: "" });
      setTimeout(() => navigate("/"), 3000);
    } else {
      toast.error("Invalid Data");
    }
  };

  const addData = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 10) {
        setUserData({ ...userData, [name]: digits });
      }
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Box
          sx={{
            maxHeight: "100%",
            overflowY: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card variant="outlined">
            <NavLink to={"/"}>
              <CancelTwoToneIcon
                style={{ float: "right", cursor: "pointer", margin: "-24px" }}
              />
            </NavLink>
            <img
              src="/amazonlogo.png"
              alt="Amazon logo"
              style={{ width: "15vh", margin: "auto" }}
            />
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center" }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={sendData}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              noValidate
            >
              <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <TextField
                  id="name"
                  name="fname"
                  placeholder="Jon Snow"
                  required
                  fullWidth
                  error={nameError}
                  helperText={nameErrorMessage}
                  value={userData.fname}
                  onChange={addData}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  fullWidth
                  error={emailError}
                  helperText={emailErrorMessage}
                  value={userData.email}
                  onChange={addData}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="mobile">Mobile</FormLabel>
                <TextField
                  id="mobile"
                  name="mobile"
                  placeholder="9876543210"
                  type="tel"
                  inputProps={{
                    maxLength: 10,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  required
                  fullWidth
                  value={userData.mobile}
                  onChange={addData}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  id="password"
                  name="password"
                  placeholder="••••••"
                  type="password"
                  required
                  fullWidth
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  value={userData.password}
                  onChange={addData}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" />}
                label="I want to receive updates via email."
              />
              <Button type="submit" fullWidth variant="contained">
                Sign up
              </Button>
            </Box>
            <Divider>
              <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign up with Google")}
                startIcon={<GoogleIcon />}
              >
                Sign up with Google
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <NavLink
                  to="/signin"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Sign in
                </NavLink>
              </Typography>
            </Box>
          </Card>
        </Box>
      </SignUpContainer>
      <ToastContainer position="top-center" autoClose={5000} theme="light" />
    </AppTheme>
  );
}
