import {
  Card,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Grid,
  Button,
  Box,
  InputAdornment,
  Backdrop,
  CircularProgress,
  TextareaAutosize,
  Tab,
  Tabs,
} from "@mui/material";

import Navbar from "./Navbar";
import { useState } from "react";
import React from "react";
import MobileOtpAlert from "./alerts/mobileOtpAlert";
import {
  addCareContext,
  confirmUsingMobileOtp,
  getRequstIdData,
} from "../api/abha-api";
import TaskIcon from "@mui/icons-material/Task";
import DifferenceIcon from "@mui/icons-material/Difference";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ContextDialog from "./modals/ContextDialog";
import Prescription from "./Prescription";

function CareContextForm() {
  const initialState = {
    showForm: true,
  };
  type getRequestId = {
    requestId: string;
  };

  type RootState = {
    initiateLinkingData: getRequestId;
  };
  const initiateLinkingData = useSelector(
    (state: RootState) => state.initiateLinkingData
  );

  console.log(initiateLinkingData);

  const [healthId, setHealthId] = useState("");
  const [requesterId, setRequesterId] = useState("");
  const [requesterType, setRequesterType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [mobileOtpAlert, setMobileOtpAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [patientMrn, setPatientMrn] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientVisit, setPatientVisit] = useState("");
  const [message, setMessage] = useState("");

  const [careContext, setCareContext] = useState(false);
  const [requestIdContext, setRequestIdContext] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const { showForm } = state;
  const careContextTab = () => {
    setState({
      ...state,
      showForm: true,
    });
  };
  const prescriptionTab = () => {
    setState({
      ...state,
      showForm: false,
    });
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
    setCareContext(false);
    setInitLinking(true);
    setHealthId("");
    setRequesterType("");
    setRequesterId("");
  };

  const handlePatientMrn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientMrn(e.target.value);
  };
  const handlePatientName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientName(e.target.value);
  };
  const handlePatientVisit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientVisit(e.target.value);
  };
  const handleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleRequesterId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequesterId(e.target.value);
  };
  const handleRequesterType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequesterType(e.target.value);
  };

  const handleHealthIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHealthId(e.target.value);
  };

  const handleOtpRequestId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };
  const [initLinking, setInitLinking] = useState(true);

  const handleInitiateLinking = async () => {
    setOpen(true);
    const result = await getRequstIdData(
      healthId + "@sbx",
      requesterId,
      requesterType,
      dispatch
    );

    console.log(result);

    setTimeout(() => {
      setOpen(false);
      setInitLinking(false);
      setRequestIdContext(true);
      setMobileOtpAlert(true);
      setTimeout(() => {
        setMobileOtpAlert(false);
      }, 3000);
    }, 2000);
  };
  const handleMobileOtp = async (otpInput: string) => {
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otpInput)) {
      setError("Otp is invalid!");
      setOpen(false);

      setCareContext(false);
    } else {
      setOpen(true);
      const result = await confirmUsingMobileOtp(
        initiateLinkingData.requestId,
        otp,
        dispatch
      );
      console.log(result);

      setTimeout(() => {
        setOpen(false);
        setRequestIdContext(false);
        setCareContext(true);
      }, 2000);
    }
  };
  const handleAddCareContext = async () => {
    setOpen(true);
    const result = await addCareContext(
      initiateLinkingData.requestId,
      patientMrn,
      patientName,
      patientVisit,
      message
    );
    console.log(result);

    setTimeout(() => {
      setOpen(false);
      setOpenDialog(true);
    }, 2000);
  };
  return (
    <div>
      <Navbar />
      <Box sx={{ borderBottom: 1, borderColor: "gray" }}>
        <Tabs value={showForm} aria-label="basic tabs example">
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mx: 4,
            }}
          >
            <TaskIcon />
            <Tab
              sx={{ fontSize: 14, fontStyle: "bold" }}
              label="Add Care Context"
              onClick={careContextTab}
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <DifferenceIcon />
            <Tab
              label="Prescription"
              sx={{ fontSize: 14, fontStyle: "bold" }}
              onClick={prescriptionTab}
            />
          </Box>
        </Tabs>
      </Box>

      {showForm ? (
        <>
          {initLinking && (
            <>
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
              <Card
                sx={{
                  width: "30%",
                  mx: "auto",
                  my: 10,

                  boxShadow: 4,
                }}
              >
                <CardContent sx={{ backgroundColor: "#1976D2" }}>
                  <Typography
                    sx={{ fontSize: "1.3rem", backgroundColor: "primary" }}
                    color="#fff"
                    variant="h4"
                  >
                    Care Context
                  </Typography>
                </CardContent>
                <CardContent>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        id="demo-helper-text-aligned"
                        label="Abha ID"
                        required
                        value={healthId}
                        onChange={handleHealthIdChange}
                        sx={{ width: "100%" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">@sbx</InputAdornment>
                          ),
                        }}
                      />
                      <Typography
                        sx={{ color: "red", fontSize: "0.7rem", mb: 1 }}
                      >
                        Please enter your ABHA address
                      </Typography>
                      <TextField
                        sx={{ width: "100%" }}
                        id="demo-helper-text-aligned"
                        label="Requester ID"
                        required
                        value={requesterId}
                        onChange={handleRequesterId}
                      />
                      <TextField
                        sx={{ width: "100%", mt: 2 }}
                        id="demo-helper-text-aligned"
                        label="Requester Type"
                        value={requesterType}
                        onChange={handleRequesterType}
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions>
                  <Box sx={{ display: "inline-flex", gap: 2, mx: "auto" }}>
                    <Button variant="contained" onClick={handleInitiateLinking}>
                      Submit
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </>
          )}
          {requestIdContext && (
            <>
              {" "}
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
              <Card sx={{ width: "30%", mx: "auto", my: 14, boxShadow: 4 }}>
                <CardContent sx={{ backgroundColor: "#1976D2" }}>
                  <Typography
                    sx={{ fontSize: "1.3rem", backgroundColor: "primary" }}
                    color="#fff"
                    variant="h4"
                  >
                    Care Context
                  </Typography>
                </CardContent>
                <CardContent>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        id="demo-helper-text-aligned"
                        label="Request ID"
                        sx={{ width: "100%" }}
                        value={initiateLinkingData.requestId}
                      />

                      <TextField
                        sx={{ width: "100%", mt: 2 }}
                        id="demo-helper-text-aligned"
                        label="OTP"
                        value={otp}
                        onChange={handleOtpRequestId}
                        error={!!error}
                      />
                      {error && (
                        <Typography
                          sx={{ fontSize: "0.9rem", color: "red", mt: 1 }}
                        >
                          {error}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions>
                  <Box sx={{ display: "inline-flex", gap: 2, mx: "auto" }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleMobileOtp(otp)}
                    >
                      Verify
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </>
          )}

          {careContext && (
            <Card sx={{ width: "50%", mx: "auto", my: 14, boxShadow: 4 }}>
              <CardContent sx={{ backgroundColor: "#1976D2" }}>
                <Typography
                  sx={{ fontSize: "1.3rem", backgroundColor: "primary" }}
                  color="#fff"
                  variant="h4"
                >
                  Care Context
                </Typography>
              </CardContent>
              <CardContent>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <TextField
                      id="demo-helper-text-aligned"
                      label="Request ID"
                      required
                      value={initiateLinkingData.requestId}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="demo-helper-text-aligned"
                      label="Patient MRN"
                      value={patientMrn}
                      onChange={handlePatientMrn}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%", mt: 2 }}
                      id="demo-helper-text-aligned"
                      label="Patient Name"
                      value={patientName}
                      onChange={handlePatientName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%", mt: 2 }}
                      id="demo-helper-text-aligned"
                      label="Visit Reference"
                      value={patientVisit}
                      onChange={handlePatientVisit}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={4}
                      style={{
                        width: "100%",
                        marginTop: 4,
                        borderColor: "#BDBDBD",
                      }}
                      value={message}
                      onChange={handleMessage}
                      placeholder="Message"
                    />
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions>
                <Box
                  sx={{
                    display: "inline-flex",
                    gap: 2,
                    mx: "auto",
                  }}
                >
                  <Button variant="contained" onClick={handleAddCareContext}>
                    Submit
                  </Button>
                </Box>
              </CardActions>
            </Card>
          )}
          {openDialog && (
            <ContextDialog isOpen={openDialog} onClose={handleClose} />
          )}
        </>
      ) : (
        <Prescription />
      )}
      {mobileOtpAlert && <MobileOtpAlert isOpen={mobileOtpAlert} />}
    </div>
  );
}

export default CareContextForm;
