import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000GA",
        }}
      >
        <Menu
          id="simple-menu"
          sx={{ minWidth: 120, border: "solid", borderRight: 1 }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>
        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            onClick={handleClick}
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            OPD
          </Typography>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>

        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            IPD
          </Typography>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>

        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            OT
          </Typography>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>

        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            REPORTS
          </Typography>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>

        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            STORE
          </Typography>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>

        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            ACCOUNTS
          </Typography>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>

        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            DIAGNOSTICS
          </Typography>{" "}
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>

        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            REPORT
          </Typography>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>

        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            HOUSEKEEPING
          </Typography>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>

        <IconButton
          size="large"
          onClick={handleClick}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, fontFamily: "monospace" }}
          >
            MRD
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
