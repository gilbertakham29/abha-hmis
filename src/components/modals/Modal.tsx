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
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  confirmAadhaarAuth,
  confirmMobileAuth,
  createHealthId,
  generateMobileOtp,
  getAbhaCard,
  getQrcode,
  handleSearch,
  initAbhaRegistration,
  initAuth,
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
import ReCAPTCHA from "react-google-recaptcha";
import React from "react";
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
  width: "50%",

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
  const [aadhaarInputValue, setAadhaarInputValue] = useState("");
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
  //const [healthIdCreate, setHealthIdCreate] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [countdown, setCountdown] = useState(90);
  const [open, setOpen] = useState(false);
  const [isValidAadhaar, setIsValidAadhaar] = useState(true);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [openMobileInput, setOpenMobileInput] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [verifyBy, setVerifyBy] = useState("");
  const [aadhaarAuth, setAadhaarAuthVerify] = useState("");
  const [mobileAuth, setMobileAuthVerify] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const handleChangeOTP = (event: SelectChangeEvent) => {
    setVerifyBy(event.target.value as string);
    setOtpEntered(!!event.target.value);
  };

  console.log(mobileOtp);

  const handleToggle = (index: number) => {
    const newCheckedItems = [...checkedItems];
    if (newCheckedItems.includes(index)) {
      newCheckedItems.splice(newCheckedItems.indexOf(index), 1);
    } else {
      newCheckedItems.push(index);
    }
    setCheckedItems(newCheckedItems);
  };
  const isAllChecked = [1, 2, 3, 4].every((index) =>
    checkedItems.includes(index)
  );
  const handleOpenMobileInput = () => {
    setBtnShow(false);
    setOpenMobileInput(true);
  };
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
  type initAuthResultData = {
    txnId: string;
  };
  type RootState = {
    searchResult: getDemographicsResult;
    errorMessage: otpErrorType;
    otpSuccess: otpSuccessType;
    mobileNumberSuccess: mobileNumberType;
    mobileNumberError: mobileErrorType;
    mobileOtpSuccess: mobileOtpSuccessType;
    mobileOtpError: mobileOtpErrorType;
    initAuthResult: initAuthResultData;
  };
  const initAuthResult = useSelector(
    (state: RootState) => state.initAuthResult
  );
  console.log(initAuthResult.txnId);

  const searchResult = useSelector((state: RootState) => state.searchResult);
  console.log(searchResult);
  const errorMessage = useSelector((state: RootState) => state.errorMessage);
  console.log(errorMessage.message);

  const otpMessage = useSelector((state: RootState) => state.otpSuccess);
  console.log(otpMessage.message);
  const mobileNumberSuccess = useSelector(
    (state: RootState) => state.mobileNumberSuccess
  );
  console.log(mobileNumberSuccess);

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
    setSearchLoading(true);
    setAadhaarError("");

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
    if (aadhaarOtpInput) {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else {
        setShowButton(true);
      }
    }

    return () => clearTimeout(timer);
  }, [countdown, aadhaarOtpInput]);

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
    const inputValue = e.target.value;
    setSearchMobile(inputValue);
    //const abhaId = await ;

    const mobileRegex = /^[6-9]\d{9}$/; // Mobile number regex (10 digits starting with 6-9)
    const aadhaarRegex = /^\d{12}$/; // Aadhaar number regex (12 digits)
    const abhaNumberRegex = /^\d{2}-\d{4}-\d{4}-\d{4}$/;
    const abhaIDRegex = /.*@sbx.*/;
    // Check if input value matches either mobile number or Aadhaar number regex
    setIsValid(
      mobileRegex.test(inputValue) ||
        aadhaarRegex.test(inputValue) ||
        abhaNumberRegex.test(inputValue) ||
        abhaIDRegex.test(inputValue)
    );
    // Handle submission or further processing
  };
  const captchaChange = () => {
    setCaptchaVerified(true);
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
  const handleAadhaarAuthVerfiy = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;
    if (!isNaN(Number(newValue))) {
      setAadhaarAuthVerify(newValue);
    }
    setOtpEntered(e.target.value !== "" ? true : false);
  };
  const handleMobileAuthVerfiy = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;
    if (!isNaN(Number(newValue))) {
      setMobileAuthVerify(newValue);
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
    const result = await verifyAadhaarOtp(
      aadhaarInputValue,
      aadhharOtp,
      dispatch
    );

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
  console.log(handleMobile);

  const handleMobileOtpGenerate = async (
    aadhaarInput: string,
    phoneNumber: number
  ) => {
    setLoading(true);

    const result = await generateMobileOtp(aadhaarInput, phoneNumber, dispatch);
    setTimeout(() => {
      if (mobileNumberSuccess.message) {
        dispatch(clearErrorMessage());
        setOpenMobileInput(false);
        setTimeout(() => {
          setMobileOtp(true);
          setOpenMobileInput(false);
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

      if (mobileOtpSuccess.message) {
        setMobileOtpAlert(true);
        setMobileOtp(false);
        setMobileNumber(true);
        setTimeout(() => {
          setMobileOtp(false);

          setMobileOtpAlert(false);
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

    // Apply masking to the Aadhaar number if it has more than 12 characters
    if (aadhaarValue.length > 12) {
      aadhaarValue = aadhaarValue.substring(0, 12);
    }

    // Mask the Aadhaar number using regex pattern
    const maskedValue = aadhaarValue.replace(
      /^([2-9]{1}[0-9]{3})[0-9]{4}([0-9]{4})$/,
      "************"
    );

    setAadhaarInput(maskedValue);
    setAadhaarInputValue(aadhaarValue);
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
  const createHealthIdOtp = async (
    aadhaarInput: string,
    aadhharOtp: number
  ) => {
    setLoading(true);
    const result = await createHealthId(aadhaarInput, aadhharOtp, dispatch);
    console.log(result);
    setTimeout(() => {
      setLoading(false);

      setAadhaarOtpInput(false);
      setMobileNumber(true);
    }, 2000);
  };
  const handleInitAuth = async (
    authMethodInput: string,
    healthIdInput: string
  ) => {
    setLoading(true);
    const result = await initAuth(authMethodInput, healthIdInput, dispatch);
    console.log(result);
    setTimeout(() => {
      setLoading(false);
    });
  };
  const handleAadhaarAuth = () => {
    confirmAadhaarAuth(initAuthResult.txnId, Number(aadhaarAuth));
    setMobileOtpAlert(true);
    setTimeout(() => {
      setMobileOtpAlert(false);
      setSearchEnabled(true);
    }, 2000);
  };
  const handleMobileAuth = () => {
    confirmMobileAuth(initAuthResult.txnId, Number(mobileAuth));
    setMobileOtpAlert(true);

    setTimeout(() => {
      setMobileOtpAlert(false);
      setSearchEnabled(true);
    }, 2000);
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
                mt: 1,
              }}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={{ fontSize: "1.3rem" }}
              >
                Search By Abha ID or Abha Address
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
            <OutlinedInput
              onChange={handlePhoneSearch}
              value={searchMobile}
              sx={{ width: "100%", backgroundColor: "#EEEEEE", mt: 2 }}
              placeholder="Enter ABHA ID/ABHA ADDRESS"
              error={!isValid && searchMobile.trim().length > 0} // Show error if input is invalid
              inputProps={{
                style: { padding: "10px 14px" }, // Adjust padding for better appearance
              }}
            />

            {!isValid && searchMobile.trim().length > 0 && (
              <Typography variant="caption" color="error" gutterBottom>
                Please enter a valid Mobile number or Aadhaar number or ABHA ID.
              </Typography>
            )}
            {error && (
              <Typography sx={{ fontSize: "0.9rem", color: "red", mt: 1 }}>
                {error}
              </Typography>
            )}
          </Box>
          <FormControl
            fullWidth
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              mx: 14,
              gap: 1,
              mt: 1,
            }}
          >
            <InputLabel id="verify-by-label">Choose...</InputLabel>
            <Select
              label="Choose..."
              sx={{ height: 50, width: "50%" }}
              value={verifyBy}
              onChange={handleChangeOTP}
            >
              <MenuItem value="MOBILE_OTP">Verify by using Mobile OTP</MenuItem>
              <MenuItem value="AADHAAR_OTP">
                Verify by using Aadhaar OTP
              </MenuItem>
            </Select>
            <LoadingButton
              variant="outlined"
              loading={loading}
              disabled={loading}
              onClick={() => handleInitAuth(verifyBy, searchMobile)}
            >
              Confirm
            </LoadingButton>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              mt: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {verifyBy === "MOBILE_OTP" && (
              <>
                <TextField
                  label="Mobile OTP"
                  placeholder="Enter Mobile Otp here..."
                  value={mobileAuth}
                  onChange={handleMobileAuthVerfiy}
                />
                <LoadingButton
                  sx={{
                    backgroundColor: "#00E676",
                    ":hover": { backgroundColor: "#00C853" },
                  }}
                  variant="contained"
                  size="small"
                  disabled={!otpEntered}
                  loading={false}
                  type="submit"
                  onClick={handleMobileAuth}
                >
                  Verify
                </LoadingButton>
              </>
            )}

            {verifyBy === "AADHAAR_OTP" && (
              <>
                <TextField
                  label="Aadhaar OTP"
                  placeholder="Enter Aadhaar Otp here..."
                  value={aadhaarAuth}
                  onChange={handleAadhaarAuthVerfiy}
                />
                <LoadingButton
                  sx={{
                    backgroundColor: "#00E676",
                    ":hover": { backgroundColor: "#00C853" },
                  }}
                  variant="contained"
                  size="small"
                  disabled={!otpEntered}
                  loading={false}
                  type="submit"
                  onClick={handleAadhaarAuth}
                >
                  Verify
                </LoadingButton>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              mx: 18,
              mt: 1,
            }}
          >
            {searchEnabled && (
              <ReCAPTCHA
                sitekey="6Le5ndUpAAAAAGYjjg7v2_E8pNsyhcbE4QRV-_S8"
                onChange={captchaChange}
              />
            )}
          </Box>
          {searchEnabled && (
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
                disabled={!captchaVerified}
                onClick={() => searchPhoneNumber(searchMobile)}
                variant="contained"
              >
                Search
              </LoadingButton>
              <Button variant="outlined">Reset</Button>
            </Box>
          )}

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
              <Box
                sx={{
                  display: "inline-flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <Button onClick={handleOpenMobileInput}>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "0.7rem", color: "#424242" }}
                  >
                    New number?
                  </Typography>
                </Button>
              </Box>
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
                    {[...new Array(1)].map((_, index) => (
                      <React.Fragment key={index}>
                        <Checkbox
                          checked={checkedItems.includes(index)}
                          onChange={() => handleToggle(index)}
                          color="primary"
                        />
                        I hereby declare that: <br />
                        {/* Add your consent content here */}
                        <ul>
                          <li>
                            <Checkbox
                              checked={checkedItems.includes(index + 1)}
                              onChange={() => handleToggle(index + 1)}
                              color="primary"
                            />
                            I am voluntarily sharing my Aadhaar Number / Virtual
                            ID issued by the Unique Identification Authority of
                            India (“UIDAI”), and my demographic information for
                            the purpose of creating an Ayushman Bharat Health
                            Account number (“ABHA number”) and Ayushman Bharat
                            Health Account address (“ABHA Address”). I authorize
                            NHA to use my Aadhaar number / Virtual ID for
                            performing Aadhaar based authentication with UIDAI
                            as per the provisions of the Aadhaar (Targeted
                            Delivery of Financial and other Subsidies, Benefits
                            and Services) Act, 2016 for the aforesaid purpose. I
                            understand that UIDAI will share my e-KYC details,
                            or response of “Yes” with NHA upon successful
                            authentication.
                          </li>
                          <li>
                            <Checkbox
                              checked={checkedItems.includes(index + 2)}
                              onChange={() => handleToggle(index + 2)}
                              color="primary"
                            />
                            I consent to usage of my ABHA address and ABHA
                            number for linking of my legacy (past) government
                            health records and those which will be generated
                            during this encounter.
                          </li>
                          <li>
                            <Checkbox
                              checked={checkedItems.includes(index + 3)}
                              onChange={() => handleToggle(index + 3)}
                              color="primary"
                            />
                            I authorize the sharing of all my health records
                            with healthcare provider(s) for the purpose of
                            providing healthcare services to me during this
                            encounter.
                          </li>
                          <li>
                            <Checkbox
                              checked={checkedItems.includes(index + 4)}
                              onChange={() => handleToggle(index + 4)}
                              color="primary"
                            />
                            I consent to the anonymization and subsequent use of
                            my government health records for public health
                            purposes. I,(abdmadmin@picasoid.co.in), confirm that
                            I have duly informed and explained the beneficiary
                            of the contents of consent for aforementioned
                            purposes. I, have been explained about the consent
                            as stated above and hereby provide my consent for
                            the aforementioned purposes.
                          </li>
                        </ul>
                      </React.Fragment>
                    ))}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDisagree}>Disagree</Button>
                  <Button
                    onClick={handleAgree}
                    autoFocus
                    disabled={!isAllChecked}
                  >
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
                    onClick={() =>
                      createHealthIdOtp(
                        aadhaarInputValue,
                        Number(aadhharOtpVerfiy)
                      )
                    }
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
                      onClick={() => handleResend(aadhaarInputValue)}
                    >
                      Resend Otp
                    </Button>
                  </>
                ) : (
                  <Typography>Resend OTP in {countdown} seconds</Typography>
                )}
              </Box>
            )}
            {openMobileInput && !mobileNumberSuccess.message && (
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
                      handleMobileOtpGenerate(
                        aadhaarInputValue,
                        Number(mobileInput)
                      )
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

            {/*mobileNumber && (
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
                      handleMobileOtpGenerate(
                        aadhaarInputValue,
                        Number(mobileInput)
                      )
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
                      handleMobileOtpGenerate(
                        aadhaarInputValue,
                        Number(mobileInput)
                      )
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
                  Enter the OTP sent to your mobile.
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
                        aadhaarInputValue,
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
                        aadhaarInputValue,
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
            )*/}
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
                        aadhaarInputValue,
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
            {mobileNumber && (
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
                  label="ABHA Address"
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
                    generateHealthIdPreVerified(aadhaarInputValue, email)
                  }
                  type="submit"
                >
                  Enter
                </LoadingButton>
              </Box>
            )}
            {mobileOtpSuccess.message && (
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
                  label="ABHA Address"
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
                    generateHealthIdPreVerified(aadhaarInputValue, email)
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
                onClick={() => handleSubmit(aadhaarInputValue)}
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
