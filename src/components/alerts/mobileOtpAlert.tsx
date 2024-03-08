import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function MobileOtpAlert({ isOpen }) {
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
            Mobile OTP has been sent successfully.
          </Alert>
        </Box>
      )}
    </>
  );
}
