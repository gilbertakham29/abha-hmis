import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
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
  verifyOtpandCreateHealthId,
} from "../../api/abha-api";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AadhaarAlert from "../alerts/AadhaarAlert";
import VerifyAadhaarAlert from "../alerts/verifyAadhaar";
import MobileOtpAlert from "../alerts/mobileOtpAlert";
import VerifyMobileOtpAlert from "../alerts/verifyMobileOtp";
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
function ModalPopup({
  isOpen,
  isClose,
}: {
  isOpen: boolean;
  isClose: () => void;
}) {
  const [aadhaarOtpInput, setAadhaarOtpInput] = useState(false);
  //const [openModal, setOpenModal] = useState(false);
  const [aadhharOtpVerfiy, setAadhaarOtpVerify] = useState("");
  const [mobileInput, setMobileInput] = useState("");
  const [mobileNumber, setMobileNumber] = useState(false);
  const [mobileOtp, setMobileOtp] = useState(false);
  const [mobileOtpVerify, setMobileOtpVerify] = useState("");
  const [aadhaarInput, setAadhaarInput] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [btnShow, setBtnShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [aadhaarAlert, setAadhaarAlert] = useState(false);
  const [mobileAlert, setMobileAlert] = useState(false);
  const [mobileOtpAlert, setMobileOtpAlert] = useState(false);
  const [error, setError] = useState("");
  const [aadhaarError, setAadhaarError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [countdown, setCountdown] = useState(90);
  const dispatch = useDispatch();
  type getDemographicsResult = {
    name: string;
    pinCode: string;
    dob: string;
    address: string;
    mobile: string;
    healthIdNumber: string;
    healthId: string;
  };
  type RootState = {
    searchResult: getDemographicsResult;
  };

  const searchResult = useSelector((state: RootState) => state.searchResult);
  console.log(searchResult);

  const searchPhoneNumber = async (searchMobile: string) => {
    //const abhaId = await ;
    setSearchLoading(true);

    setTimeout(async () => {
      setSearchLoading(false);
      const result = await handleSearch(searchMobile, dispatch);

      const [abhaCard, abhaQr] = await Promise.all([
        getAbhaCard(result.abhaAccountID, dispatch),
        getQrcode(result.abhaAccountID, dispatch),
      ]);
      console.log(abhaCard, abhaQr);
      isClose();
      //setOpenModal(isClose);
      console.log(setError(""));
    }, 1000);
  };
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
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
    console.log(result);
  };
  const handlePhoneSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMobile(e.target.value);
  };
  const handleAadhaarOtpVerify = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;
    if (!isNaN(Number(newValue))) {
      setAadhaarOtpVerify(newValue);
    }
  };
  const handleMobileOtpVerify = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;
    if (!isNaN(Number(newValue))) {
      setMobileOtpVerify(newValue);
    }
  };
  const handleMobileSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;
    if (!isNaN(Number(newValue))) {
      setMobileInput(newValue);
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (aadhaarInput: string) => {
    const aadhaarRegex = /^\d{12}$/; // Simple regex for 12-digit Aadhaar number
    if (!aadhaarRegex.test(aadhaarInput)) {
      setAadhaarError("Aadhaar number is not valid!");
      setShowButton(false);
      setLoading(false);
      setAadhaarOtpInput(false);
    } else {
      // Handle submission or further processing
      setLoading(true);
      setAadhaarError("");
      setBtnShow(false);
      setAadhaarOtpInput(true);
      setLoading(false);

      // Simulating an asynchronous operation
      const result = await initAbhaRegistration(aadhaarInput, dispatch);
      console.log(result);
      setTimeout(() => {
        setLoading(false);

        setAlert(true);

        setBtnShow(false);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }, 2000);
      // Reset the input field
    }
  };

  const handleMobile = async (aadhharOtp: number) => {
    setLoading(true);
    const result = await verifyAadhaarOtp(aadhaarInput, aadhharOtp, dispatch);

    setTimeout(() => {
      setLoading(false);
      setAadhaarOtpInput(false);
      setMobileNumber(true);
      setAadhaarAlert(true);
      setTimeout(() => {
        setAadhaarAlert(false);
      }, 3000);
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
      setMobileAlert(true);
      setTimeout(() => {
        setMobileAlert(false);
      }, 3000);
    }, 2000);
    console.log(result);
  };
  const mobileOtpVerification = async (
    aadhaarInput: string,
    mobileNumber: number,
    email: string
  ) => {
    setLoading(true);

    const result = await verifyOtpandCreateHealthId(
      aadhaarInput,
      mobileNumber,
      email,
      dispatch
    );
    setTimeout(() => {
      setLoading(false);
      setMobileOtpAlert(true);

      setTimeout(() => {
        setOpenDialog(true);
        setMobileOtpAlert(false);
        setTimeout(() => {
          setOpenDialog(false);
        }, 3000);
      }, 2000);
    }, 2000);
    console.log(result);
  };
  const handleAdhaarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAadhaarInput(e.target.value);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = () => {
    setChecked(true);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={isClose}
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
                mt: 2,
              }}
            ></Box>
            <OutlinedInput
              onChange={handlePhoneSearch}
              value={searchMobile}
              sx={{ width: "100%", backgroundColor: "#EEEEEE", mt: 2 }}
              placeholder="Enter ADHAAR/ABHA ID/MOBILE NO."
            />
            {error && (
              <Typography sx={{ fontSize: "0.9rem", color: "red", mt: 1 }}>
                {error}
              </Typography>
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
            <LoadingButton
              loading={searchLoading}
              disabled={searchLoading}
              onClick={() => searchPhoneNumber(searchMobile)}
              variant="contained"
            >
              Search
            </LoadingButton>
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
              sx={{ width: "100%", backgroundColor: "#EEEEEE", mt: 2 }}
              placeholder="Enter ADHAAR"
              value={aadhaarInput}
              onChange={handleAdhaarInput}
              error={!!aadhaarError}
            />
            {aadhaarError && (
              <Typography sx={{ fontSize: "0.9rem", color: "red", mt: 1 }}>
                {aadhaarError}
              </Typography>
            )}
            <Box
              sx={{
                display: "inline-flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography variant="h5" sx={{ fontSize: "0.9rem" }}>
                I Agree
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              gap: 2,
              ml: 18,
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
                    onClick={() => handleMobile(Number(aadhharOtpVerfiy))}
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
                      handleMobileOtpGenerate(aadhaarInput, Number(mobileInput))
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography sx={{ mr: 14 }}>
                  Enter the OTP sent to your mobile and click verify.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    mr: 14,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <TextField
                    label="Mobile OTP"
                    placeholder="Enter Mobile Otp here..."
                    value={mobileOtpVerify}
                    onChange={handleMobileOtpVerify}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TextField
                      label="Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <Typography sx={{ fontSize: "0.7rem", color: "red" }}>
                      This will be ABHA address
                    </Typography>
                  </Box>
                  <LoadingButton
                    sx={{
                      my: 1,
                      backgroundColor: "#00E676",
                      ":hover": { backgroundColor: "#00C853" },
                    }}
                    variant="contained"
                    size="small"
                    disabled={loading}
                    loading={loading}
                    onClick={() =>
                      mobileOtpVerification(
                        aadhaarInput,
                        Number(mobileOtpVerify),
                        email
                      )
                    }
                    type="submit"
                  >
                    Verify
                  </LoadingButton>
                </Box>
              </Box>
            )}
            {btnShow && (
              <LoadingButton
                variant="contained"
                disabled={!checked || loading}
                loading={loading}
                onClick={() => handleSubmit(aadhaarInput)}
                sx={{ borderRadius: 2, px: 4, py: 1, mx: 14 }}
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
      {alert && <AadhaarAlert isOpen={alert} />}
      {aadhaarAlert && <VerifyAadhaarAlert isOpen={aadhaarAlert} />}
      {mobileAlert && <MobileOtpAlert isOpen={mobileAlert} />}
      {mobileOtpAlert && <VerifyMobileOtpAlert isOpen={mobileOtpAlert} />}
    </div>
  );
}

export default ModalPopup;
