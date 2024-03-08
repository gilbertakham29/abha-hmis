import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
            onClick={handleClick}
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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
