import { LoadingButton } from "@mui/lab";
import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Navbar() {
  const history = useNavigate();
  const [loading, setLoading] = React.useState(false);
  function handleLogout() {
    setLoading(true);

    setTimeout(() => {
      // Navigate to the next page
      history("/");
      location.reload();

      setLoading(false);
    }, 2000);
  }
  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",

          gap: 12,
        }}
      >
        <Link to="/patient" style={{ textDecoration: "none", color: "#fff" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 16, fontStyle: "bold" }}
          >
            PATIENT REGISTRATION
          </Typography>
        </Link>

        <Link to="/consent" style={{ textDecoration: "none", color: "#fff" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 16, fontStyle: "bold" }}
          >
            CONSENT FORM
          </Typography>
        </Link>
        <LoadingButton
          loading={loading}
          disabled={loading}
          onClick={handleLogout}
          sx={{
            backgroundColor: "#F5F5F5",
            ":hover": { backgroundColor: "#E0E0E0" },
            right: 0,
            fontSize: "0.9rem",
            mx: 4,
            position: "fixed",
          }}
        >
          Logout
        </LoadingButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
