import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import logo from "../assets/images/picasoid-logo.png";
import { useNavigate } from "react-router-dom";

import {
  Checkbox,
  Container,
  TextField,
  Typography,
  Grid,
  Box,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
const Background = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundImage:
    "url('https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg?w=740&t=st=1710146750~exp=1710147350~hmac=61eb7dde8b77e3b5014d0119aea5039f9cb5c9b1a2b2462522d802d592a8066f')",
  backgroundPosition: "center",
  backgroundSize: "cover",
  overflowX: "hidden",
  overflowY: "hidden",
  backgroundRepeat: "no-repeat",
});
function Login() {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const defaultEmail = "abdmadmin@picasoid.co.in";
  const defaultPassword = "24@#picafy";
  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      if (email === defaultEmail && password === defaultPassword) {
        history("/patient"); // Navigate to the next page
      } else {
        setError("Invalid email or password!");
      }
      setLoading(false);
    }, 2000);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <Background>
      <Container
        sx={{
          mt: 12,
          display: "flex",
          jumstifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          paddingTop: 2,
        }}
        maxWidth="xs"
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",

            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="picasoid"
            style={{
              width: 56,
              height: 56,
              borderRadius: 34,
              borderColor: "#fff",
            }}
          />
          <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
            Sign in to PiCaSoid
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              id="email"
              fullWidth
              error={error !== ""}
              value={email}
              onChange={handleEmailChange}
              label="Your Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={error !== ""}
              helperText={error}
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              sx={{ height: "50px" }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ mt: 2 }}
            />

            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              disabled={loading}
              onClick={handleLogin}
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In
            </LoadingButton>

            <Grid container>
              <Grid item xs>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography sx={{ fontSize: 12 }}>
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 12 }}>
                    Don't have an account?
                  </Typography>
                  <Link
                    to="/register"
                    style={{ fontSize: 14, textDecoration: "none" }}
                  >
                    Sign up
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Background>
  );
}

export default Login;
