import {
  Checkbox,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
  Grid,
  Link,
  Box,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
const Background = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundImage: "url('../src/assets/images/hospital.jpg')",
  backgroundPosition: "center",
  backgroundSize: "cover",
  overflowX: "hidden",
  overflowY: "hidden",
  backgroundRepeat: "no-repeat",
});
function Login() {
  return (
    <Background>
      <Container
        sx={{
          mt: 12,
          display: "flex",
          jumstifyContent: "center",
          alignItems: "center",
          border: "solid",
          borderWidth: 1,
          boxShadow: 8,
          borderRadius: 4,
          backgroundColor: "#fff",
          paddingTop: 2,
        }}
        maxWidth="xs"
      >
        <Box
          sx={{
            padding: 4,
            display: "flex",

            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in to our platform
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              id="email"
              fullWidth
              label="Your Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              sx={{ height: "50px" }}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" sx={{ textDecoration: "none" }} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  sx={{ color: "black", textDecoration: "none" }}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Background>
  );
}

export default Login;
