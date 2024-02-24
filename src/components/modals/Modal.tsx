import {
  Backdrop,
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import {
  generateMobileOtp,
  getAbhaCard,
  getQrcode,
  handleSearch,
  initAbhaRegistration,
  resendOtp,
  verifyAadhaarOtp,
  verifyMobileOtp,
} from "../../api/abha-api";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessDialog from "./SuccessDialog";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  px: 4,
  borderWidth: 1,
  borderRadius: 4,
  width: "50%",
  py: 2,
  borderColor: "#BDBDBD",
};
function ModalPopup({ isOpen, isClose }) {
  type T = object;
  interface RootState {
    searchResult: Array<T>;
    abhaCardResult: string;
    abhaQrCode: string;
  }
  const [aadhaarOtpInput, setAadhaarOtpInput] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [aadhharOtpVerfiy, setAadhaarOtpVerify] = useState(0);
  const [mobileInput, setMobileInput] = useState(0);
  const [mobileNumber, setMobileNumber] = useState(false);
  const [mobileOtp, setMobileOtp] = useState(false);
  const [mobileOtpVerify, setMobileOtpVerify] = useState(0);
  const [aadhaarInput, setAadhaarInput] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [btnShow, setBtnShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [resendCount, setResendCount] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [countdown, setCountdown] = useState(90);
  const dispatch = useDispatch();

  const searchResult = useSelector((state: RootState) => state.searchResult);
  console.log(searchResult);

  const searchPhoneNumber = async (searchMobile: string) => {
    //const abhaId = await ;

    const aadhaarRegex = /^\d{12}$/; // Simple regex for 12-digit Aadhaar number
    if (!aadhaarRegex.test(searchMobile)) {
      setError("Aadhaar number is not valid!");
    } else {
      // Handle submission or further processing
      setError("");
      // Reset the input field
      setSearchMobile("");
    }
    // Simulating an asynchronous operation

    const result = await handleSearch(searchMobile, dispatch);

    const [abhaCard, abhaQr] = await Promise.all([
      getAbhaCard(result.abhaAccountID, dispatch),
      getQrcode(result.abhaAccountID, dispatch),
    ]);
    setTimeout(() => {
      setOpenModal(isClose);
    }, 1000);
  };
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setShowButton(true);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async (aadhaarInput: string) => {
    if (resendCount < 2) {
      setResendCount(resendCount + 1);
      setCountdown(90);
      setShowButton(false);
    }
    const result = await resendOtp(aadhaarInput, dispatch);
  };
  const handlePhoneSearch = (e) => {
    setSearchMobile(e.target.value);
  };
  const handleAadhaarOtpVerify = (e) => {
    setAadhaarOtpVerify(e.target.value);
  };
  const handleMobileOtpVerify = (e) => {
    setMobileOtpVerify(e.target.value);
  };
  const handleMobileSubmit = (e) => {
    setMobileInput(e.target.value);
  };
  const handleAdhaar = (e) => {
    setAadhaarInput(e.target.value);
  };
  const handleSubmit = async (aadhaarInput: string) => {
    const result = await initAbhaRegistration(aadhaarInput, dispatch);
    console.log(result);
    setLoading(true);
    // Simulating an asynchronous operation
    setTimeout(() => {
      setLoading(false);
      setAadhaarOtpInput(true);

      setBtnShow(false);
      setOpenResendBtn(false);
    }, 2000);
  };
  const handleMobileInput = (e) => {
    setMobileInput(e.target.value);
  };
  const handleMobile = async (aadhharOtp: number) => {
    setLoading(true);
    const result = await verifyAadhaarOtp(aadhaarInput, aadhharOtp, dispatch);

    setTimeout(() => {
      setLoading(false);
      setAadhaarOtpInput(false);
      setMobileNumber(true);
    }, 2000);

    console.log(result);
  };
  const handleMobileOtpGenerate = async (
    aadhaarInput: string,
    phoneNumber: number
  ) => {
    setLoading(true);

    const result = await generateMobileOtp(aadhaarInput, phoneNumber, dispatch);
    setTimeout(() => {
      setLoading(false);
      setMobileNumber(false);
      setMobileOtp(true);
    }, 2000);
    console.log(result);
  };
  const mobileOtpVerification = async (
    aadhaarInput: string,
    mobileNumber: number
  ) => {
    setLoading(true);

    const result = await verifyMobileOtp(aadhaarInput, mobileNumber, dispatch);
    setTimeout(() => {
      setLoading(false);
      setOpenDialog(true);
    }, 2000);
    console.log(result);
  };
  const handleAdhaarInput = (e) => {
    setAadhaarInput(e.target.value);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={isClose}
        sx={{ contentVisibility: openDialog ? "hidden" : isOpen }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={{ fontSize: "1.3rem" }}
              >
                Search By Aadhaar or Abha Id
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={isClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                border: "1px solid #000",
                borderBottom: 1,
                borderColor: "#BDBDBD",
                mt: 2,
              }}
            ></Box>
            <OutlinedInput
              onChange={handlePhoneSearch}
              value={searchMobile}
              sx={{ width: "100vh", backgroundColor: "#EEEEEE", mt: 2 }}
              placeholder="Enter AADHHAR/ABHA ID/MOBILE NO."
              error={!!error}
            />
            {error && (
              <FormHelperText error sx={{ fontSize: "0.9rem" }}>
                {error}
              </FormHelperText>
            )}
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mx: 28,
              gap: 2,
            }}
          >
            <Button
              onClick={() => searchPhoneNumber(searchMobile)}
              variant="contained"
            >
              Search
            </Button>
            <Button variant="outlined">Reset</Button>
          </Box>

          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              mx: 34,
              mt: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontSize: "1.2rem" }}>
              Or
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h5"
              component="h5"
              sx={{ fontSize: "1.3rem", mt: 2 }}
            >
              New Patient Registration By Using ABHA Registration Process
            </Typography>
            <Box
              sx={{
                border: "1px solid #000",
                borderBottom: 1,
                borderColor: "#BDBDBD",
                mt: 2,
              }}
            ></Box>
            <OutlinedInput
              sx={{ width: "100vh", backgroundColor: "#EEEEEE", mt: 2 }}
              placeholder="Enter AADHHAR"
              value={aadhaarInput}
              onChange={handleAdhaarInput}
              inputProps={{ maxLength: "12" }}
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              gap: 2,
            }}
          >
            {aadhaarOtpInput && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,

                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography>
                  Please enter the OTP sent to your mobile number.
                </Typography>
                <Box
                  sx={{
                    display: "inline-flex",
                    gap: 2,

                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Aadhaar OTP"
                    placeholder="Enter Aadhaar otp here"
                    onChange={handleAadhaarOtpVerify}
                    value={aadhharOtpVerfiy}
                  />
                  <LoadingButton
                    variant="contained"
                    disabled={loading}
                    loading={loading}
                    onClick={() => handleMobile(aadhharOtpVerfiy)}
                  >
                    Verify
                  </LoadingButton>
                </Box>
                {showButton ? (
                  <>
                    <Button
                      variant="outlined"
                      onClick={() => handleResend(aadhaarInput)}
                    >
                      Resend Otp
                    </Button>
                  </>
                ) : (
                  <Typography>Resend OTP in {countdown} seconds</Typography>
                )}
              </Box>
            )}
            {mobileNumber && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography>Enter your mobile number.</Typography>
                <Box
                  sx={{
                    display: "inline-flex",
                    gap: 2,

                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Mobile No."
                    placeholder="Enter Mobile Number here..."
                    value={mobileInput}
                    onChange={handleMobileSubmit}
                  />
                  <LoadingButton
                    onClick={() =>
                      handleMobileOtpGenerate(aadhaarInput, mobileInput)
                    }
                    variant="contained"
                    disabled={loading}
                    loading={loading}
                  >
                    Enter
                  </LoadingButton>
                </Box>
              </Box>
            )}
            {mobileOtp && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography>
                  Enter the OTP sent to your mobile and click verify.
                </Typography>
                <Box
                  sx={{
                    display: "inline-flex",
                    gap: 2,

                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Mobile OTP"
                    placeholder="Enter Mobile Otp here..."
                    value={mobileOtpVerify}
                    onChange={handleMobileOtpVerify}
                  />
                  <LoadingButton
                    sx={{
                      backgroundColor: "#00E676",
                      ":hover": { backgroundColor: "#00C853" },
                    }}
                    variant="contained"
                    size="small"
                    disabled={loading}
                    loading={loading}
                    onClick={() =>
                      mobileOtpVerification(aadhaarInput, mobileOtpVerify)
                    }
                    type="submit"
                  >
                    Verfiy
                  </LoadingButton>
                </Box>
              </Box>
            )}
            {btnShow && (
              <LoadingButton
                variant="contained"
                disabled={loading}
                loading={loading}
                onClick={() => handleSubmit(aadhaarInput)}
                sx={{ borderRadius: 2, px: 4, py: 1, mx: 32 }}
              >
                Submit
              </LoadingButton>
            )}
          </Box>
        </Container>
      </Modal>
      {openDialog && (
        <SuccessDialog isOpen={openDialog} onClose={handleClose} />
      )}
    </div>
  );
}

export default ModalPopup;
