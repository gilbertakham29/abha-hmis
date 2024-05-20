import { Backdrop, Button, CircularProgress, Modal } from "@mui/material";

import {
  Container,
  Box,
  Typography,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { getProfileByHipCodeandTokenNumber } from "../../api/abha-api";

import { useDispatch } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  px: 4,
  py: 1,
  borderWidth: 1,
  borderRadius: 4,
  width: "30%",
  borderColor: "#BDBDBD",
};

function GetPatientModal({
  isOpen,
  isClose,
}: {
  isOpen: boolean;
  isClose: () => void;
}) {
  //const [open, setOpen] = useState(false);
  const [hipCode, setHipCode] = useState("");
  const [tokenNumber, setTokenNumber] = useState("");
  const [profileError, setProfileError] = useState("");
  const handleHipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHipCode(e.target.value);
  };
  const handleTokenNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenNumber(e.target.value);
  };
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = async () => {
    setOpen(true);

    try {
      await getProfileByHipCodeandTokenNumber(hipCode, tokenNumber, dispatch);
      setOpen(false);
      isClose();
    } catch (err) {
      if (err instanceof Error) {
        setProfileError("Invalid HipCode or TokenNumber");
      }
    } finally {
      setOpen(false);
    }
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={isClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Container sx={style}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{ fontSize: "1.3rem" }}
                >
                  Search By Qr Details
                </Typography>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="close"
                  onClick={isClose}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box
                sx={{
                  border: "1px solid #000",
                  borderBottom: 1,
                  borderColor: "#BDBDBD",
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <OutlinedInput
                onChange={handleHipCode}
                value={hipCode}
                sx={{ width: "100%", backgroundColor: "#EEEEEE", mt: 2 }}
                placeholder="Enter HIP Code"
                // Show error if input is invalid
                inputProps={{
                  style: { padding: "10px 14px" }, // Adjust padding for better appearance
                }}
              />
              <OutlinedInput
                onChange={handleTokenNumber}
                value={tokenNumber}
                sx={{ width: "100%", backgroundColor: "#EEEEEE", mt: 2 }}
                placeholder="Enter Token Number"
                // Show error if input is invalid
                inputProps={{
                  style: { padding: "10px 14px" }, // Adjust padding for better appearance
                }}
              />
              {profileError && (
                <Typography sx={{ fontSize: "0.9rem", color: "red" }}>
                  {profileError}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                mx: 18,
                gap: 2,
              }}
            >
              <Button onClick={handleSearch} variant="contained">
                Search
              </Button>
            </Box>
          </Container>
          {open && (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </>
      </Modal>
    </div>
  );
}

export default GetPatientModal;
