import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
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
  verifyMobileOtp,
  verifyOtpandCreateHealthId,
} from "../../api/abha-api";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AadhaarAlert from "../alerts/AadhaarAlert";
import VerifyAadhaarAlert from "../alerts/verifyAadhaar";
import MobileOtpAlert from "../alerts/mobileOtpAlert";
import VerifyMobileOtpAlert from "../alerts/verifyMobileOtp";
import SuccessDialog from "./SuccessDialog";
import { clearErrorMessage } from "../../redux/reducer";
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
  const [otpEntered, setOtpEntered] = useState(false);
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
  const [healthIdCreate, setHealthIdCreate] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [countdown, setCountdown] = useState(90);
  const [open, setOpen] = useState(false);
  const [isValidAadhaar, setIsValidAadhaar] = useState(true);

  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  //const descriptionElementRef = React.useRef<HTMLElement>(null);
  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  console.log(aadhaarError);

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const handleCloseDialog = () => {
    setOpen(false);
  };
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
  type otpErrorType = {
    message: string;
  };
  type otpSuccessType = {
    message: string;
    nextStep: string;
    status: string;
  };
  type mobileNumberType = {
    message: string;
    nextStatus: string;
    status: string;
  };
  type mobileErrorType = {
    message: string;
  };
  type mobileOtpSuccessType = {
    message: string;
    status: string;
  };
  type mobileOtpErrorType = {
    message: string;
  };
  type RootState = {
    searchResult: getDemographicsResult;
    errorMessage: otpErrorType;
    otpSuccess: otpSuccessType;
    mobileNumberSuccess: mobileNumberType;
    mobileNumberError: mobileErrorType;
    mobileOtpSuccess: mobileOtpSuccessType;
    mobileOtpError: mobileOtpErrorType;
  };

  const searchResult = useSelector((state: RootState) => state.searchResult);
  console.log(searchResult);
  const errorMessage = useSelector((state: RootState) => state.errorMessage);
  const otpMessage = useSelector((state: RootState) => state.otpSuccess);
  console.log(otpMessage.message);
  const mobileNumberSuccess = useSelector(
    (state: RootState) => state.mobileNumberSuccess
  );
  const mobileNumberError = useSelector(
    (state: RootState) => state.mobileNumberError
  );
  console.log(mobileNumberError);
  const mobileOtpSuccess = useSelector(
    (state: RootState) => state.mobileOtpSuccess
  );
  console.log(mobileOtpSuccess.message);

  const mobileOtpError = useSelector(
    (state: RootState) => state.mobileOtpError
  );
  const searchPhoneNumber = async (searchMobile: string) => {
    //const abhaId = await ;
    setSearchLoading(true);

    // Handle submission or further processing
    setLoading(true);
    setAadhaarError("");

    setLoading(false);

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
    setOtpEntered(e.target.value !== "" ? true : false);
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

      if (otpMessage.message) {
        setAadhaarAlert(true);
        setAadhaarAlert(false);
        dispatch(clearErrorMessage());
        setAadhaarOtpInput(false);

        setTimeout(() => {
          setAadhaarAlert(false);
          setMobileNumber(true);
          setAadhaarOtpInput(false);
        }, 3000);
      }
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
      if (mobileNumberSuccess.message) {
        dispatch(clearErrorMessage());

        setMobileAlert(true);
        setMobileNumber(false);
        setTimeout(() => {
          setMobileNumber(false);
          setMobileOtp(true);

          setMobileAlert(false);
        }, 3000);
      }
    }, 2000);
    setLoading(false);
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
      if (mobileNumberSuccess.message) {
        dispatch(clearErrorMessage());
        setMobileOtpAlert(true);
        setMobileOtp(false);

        setTimeout(() => {
          setMobileOtp(false);

          setMobileOtpAlert(false);
          setHealthIdCreate(true);
        }, 3000);
      }
    }, 2000);
    console.log(result);
  };
  const generateHealthIdPreVerified = async (
    aadhaarInput: string,
    abhaAddressInput: string
  ) => {
    setLoading(true);
    const result = await verifyOtpandCreateHealthId(
      aadhaarInput,
      abhaAddressInput,
      dispatch
    );

    setTimeout(async () => {
      setLoading(false);
      setOpenDialog(true);
      const result = await handleSearch(aadhaarInput, dispatch);

      const [abhaCard, abhaQr] = await Promise.all([
        getAbhaCard(result.abhaAccountID, dispatch),
        getQrcode(result.abhaAccountID, dispatch),
      ]);
      console.log(abhaCard, abhaQr);
      setTimeout(() => {
        setOpenDialog(false);
      }, 3000);
    }, 2000);
    console.log(result);
  };
  const handleAdhaarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let aadhaarValue = e.target.value;
    aadhaarValue = aadhaarValue.substring(0, 12);
    setAadhaarInput(aadhaarValue);

    const aadhaarRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

    // Check if the entered Aadhaar number matches the pattern
    const isValid = aadhaarRegex.test(aadhaarValue);
    setIsValidAadhaar(isValid);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = () => {
    setChecked(true);
  };
  const handleAgree = () => {
    setChecked(true);
    setOpen(false);
  };
  const handleDisagree = () => {
    setChecked(false);
    setOpen(false);
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
              placeholder="Enter AADHAAR/ABHA ID/MOBILE NO."
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
              placeholder="Enter AADHAAR"
              value={aadhaarInput}
              onChange={handleAdhaarInput}
              error={!isValidAadhaar} // Highlight TextField if Aadhaar number is invalid
            />
            {!isValidAadhaar && (
              <Typography sx={{ fontSize: "0.9rem", color: "red", mt: 1 }}>
                {!isValidAadhaar && "Invalid Aadhaar number"}
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
              <Button onClick={handleClickOpen("paper")}>
                <Typography variant="h5" sx={{ fontSize: "0.7rem" }}>
                  read more
                </Typography>
              </Button>
              <Dialog
                open={open}
                scroll={scroll}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Addhaar Consent"}
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                  <DialogContentText
                    ref={descriptionElementRef}
                    id="alert-dialog-description"
                    tabIndex={-1}
                  >
                    {[...new Array(1)]
                      .map(
                        () => `I hereby declare that:
                        I am voluntarily sharing my Aadhaar Number / Virtual ID issued by the Unique Identification Authority of India (“UIDAI”), and my demographic information for the purpose of
                        creating an Ayushman Bharat Health Account number (“ABHA number”) and Ayushman Bharat Health Account address (“ABHA Address”). I authorize NHA to use my Aadhaar
                        number / Virtual ID for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and
                        Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, or response of “Yes” with NHA upon successful authentication.
                        
                        I consent to usage of my ABHA address and ABHA number for linking of my legacy (past) government health records and those which will be generated during this encounter.

                        I authorize the sharing of all my health records with healthcare provider(s) for the purpose of providing healthcare services to me during this encounter.

                        I consent to the anonymization and subsequent use of my government health records for public health purposes.
I, confirm that I have duly informed and explained the beneficiary of the contents of
consent for aforementioned purposes.


I, have been explained about the consent as stated above and hereby provide my consent for the aforementioned purposes.

                        `
                      )
                      .join("\n")}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDisagree}>Disagree</Button>
                  <Button onClick={handleAgree} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
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
            {aadhaarOtpInput && !otpMessage.message && (
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
                {
                  <Typography sx={{ fontSize: "0.9rem", color: "red" }}>
                    {errorMessage &&
                      errorMessage.message &&
                      errorMessage.message}
                  </Typography>
                }
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
            {otpMessage.message && !mobileNumberSuccess.message && (
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
                {
                  <Typography sx={{ fontSize: "0.9rem", color: "red" }}>
                    {mobileNumberError &&
                      mobileNumberError.message &&
                      mobileNumberError.message}
                  </Typography>
                }
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

                  <LoadingButton
                    sx={{
                      my: 1,
                      backgroundColor: "#00E676",
                      ":hover": { backgroundColor: "#00C853" },
                    }}
                    variant="contained"
                    size="small"
                    disabled={!otpEntered}
                    loading={loading}
                    onClick={() =>
                      mobileOtpVerification(
                        aadhaarInput,
                        Number(mobileOtpVerify)
                      )
                    }
                    type="submit"
                  >
                    Verify
                  </LoadingButton>
                </Box>
              </Box>
            )}
            {mobileNumberSuccess.message && !mobileOtpSuccess.message && (
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

                  <LoadingButton
                    sx={{
                      my: 1,
                      backgroundColor: "#00E676",
                      ":hover": { backgroundColor: "#00C853" },
                    }}
                    variant="contained"
                    size="small"
                    disabled={!otpEntered}
                    loading={loading}
                    onClick={() =>
                      mobileOtpVerification(
                        aadhaarInput,
                        Number(mobileOtpVerify)
                      )
                    }
                    type="submit"
                  >
                    Verify
                  </LoadingButton>
                </Box>
                {
                  <Typography sx={{ fontSize: "0.9rem", color: "red" }}>
                    {mobileOtpError &&
                      mobileOtpError.message &&
                      mobileOtpError.message}
                  </Typography>
                }
              </Box>
            )}

            {healthIdCreate && mobileOtpSuccess.message && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 1,
                  mx: 8,
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
                <LoadingButton
                  sx={{
                    my: 1,
                    backgroundColor: "#00E676",
                    ":hover": { backgroundColor: "#00C853" },
                  }}
                  variant="contained"
                  size="small"
                  loading={loading}
                  onClick={() =>
                    generateHealthIdPreVerified(aadhaarInput, email)
                  }
                  type="submit"
                >
                  Enter
                </LoadingButton>
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
