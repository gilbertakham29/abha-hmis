import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function AadhaarAlert({ isOpen }: { isOpen: boolean }) {
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
        </Box>
      )}
    </>
  );
}
