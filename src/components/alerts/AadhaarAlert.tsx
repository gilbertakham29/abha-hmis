import { Box, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";

import CloseIcon from "@mui/icons-material/Close";

export default function AadhaarAlert({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <Box sx={{ display: "inline-flex", gap: 2 }}>
          <Alert
            variant="filled"
            severity="success"
            sx={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              zIndex: 9999,
            }}
          >
            Aadhaar OTP has been sent successfully.
          </Alert>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
}
