import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../SignIn/ForgotPassword";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { GoogleIcon } from "./CustomIcons";
import { useNavigate } from "react-router-dom";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { NavLink } from "react-router-dom";
import { Logincontext } from "../context/Contexprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styled Card
const Card = styled(MuiCard)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

// Styled Container
const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn(props) {
  const { account, setAccount } = useContext(Logincontext);
  const navigate = useNavigate();

  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const HandleData = (e) => {
    const { name, value } = e.target;
    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let isValid = true;

    if (!logdata.email || !/\S+@\S+\.\S+/.test(logdata.email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!logdata.password || logdata.password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const senddata = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please fix the errors!", { position: "top-center" });
      return;
    }

    const { email, password } = logdata;

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        toast.error("Invalid Details 👎!", {
          position: "top-center",
        });
      } else {
        setAccount(data);
        setData({ ...logdata, email: "", password: "" });
        toast.success("Login Successfully done 😃!", {
          position: "top-center",
        });
        setTimeout(() => navigate("/"), 1500); // Redirect after 1.5s
      }
    } catch (error) {
      toast.error("Something went wrong!", { position: "top-center" });
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer
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
            <NavLink
              to="/"
              style={{ position: "absolute", top: 16, right: 16 }}
            >
              <CancelTwoToneIcon
                style={{
                  fontSize: 28,
                  color: "#555",
                  cursor: "pointer",
                }}
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
              sx={{
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                textAlign: "center",
              }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={senddata}
              autoComplete="off"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="new-email"
                  required
                  fullWidth
                  variant="outlined"
                  onChange={HandleData}
                  value={logdata.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••"
                  autoComplete="new-password"
                  required
                  fullWidth
                  variant="outlined"
                  onChange={HandleData}
                  value={logdata.password}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={senddata}
              >
                Sign in
              </Button>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign in with Google")}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <NavLink
                  to="/signup"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Sign up
                </NavLink>
              </Typography>
            </Box>
          </Card>
        </Box>
        <ToastContainer />
      </SignInContainer>
    </AppTheme>
  );
}
