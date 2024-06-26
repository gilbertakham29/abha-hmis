import Navbar from "./Navbar";
import DownloadIcon from "@mui/icons-material/Download";

import {
  Box,
  Tabs,
  Tab,
  Container,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import states from "../../data.json";
import districts from "../../data.json";
import relationships from "../../data.json";
import samples from "../../data.json";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ModalPopup from "./modals/Modal";
import { useSelector } from "react-redux";
import PatientList from "./PatientList";
import { submitPatient } from "../api/abha-api";
import DataModal from "./modals/DataAdded";
import { handleDownload } from "../actions/download";
import GetPatientModal from "./modals/GetPatientModal";
function PatientDashboard() {
  function calculateAge(dateString: string) {
    // Parse the date string to a Date object
    const dob = new Date(dateString);

    // Get today's date
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - dob.getFullYear();

    // Check if the birthday has occurred this year already
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }

  const initialState = {
    showForm: true,
    abhaGenerate: false,
    openModal: false,
    openPatientModal: false,
  };
  type getDemographicsResult = {
    name: string;
    pinCode: string;
    dob: string;
    gender: string;
    stateName: string;
    address: string;
    mobile: string;
    healthIdNumber: string;
    healthId: string;
  };
  type getPatientByHipCodeandTokenNumber = {
    name: "";
    gender: "";
    dob: "";
    mobileNumber: "";
    healthIDNumber: "";
    healthID: "";
  };

  type RootState = {
    searchResult: getDemographicsResult;
    abhaCardResult: string;
    abhaQrCode: object;
    profileResultByHipandTokeNumber: getPatientByHipCodeandTokenNumber;
  };

  const [state, setState] = useState(initialState);
  const { showForm, openModal, openPatientModal } = state;
  const [initValue, setValue] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [pincode, setPincode] = useState("");
  const [ageNum, setageNum] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  // Use useSelector to select the searchResult from the Redux store
  const searchResultData = useSelector(
    (state: RootState) => state.searchResult
  );
  console.log(searchResultData);
  const patientResultData = useSelector(
    (state: RootState) => state.profileResultByHipandTokeNumber
  );
  const abhaCardResult = useSelector(
    (state: RootState) => state.abhaCardResult
  );
  const abhaQrCodeResult = useSelector((state: RootState) => state.abhaQrCode);
  console.log(searchResultData);
  const age = calculateAge(searchResultData.dob);
  const patientAge = calculateAge(patientResultData.dob);
  //const age = calculateAge(Number(searchResult.dob));
  //console.log(age);
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePincode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value);
  };
  const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setageNum(e.target.value);
  };
  const patientDetails = () => {
    setState({
      ...state,
      showForm: true,
    });
  };
  const patientList = () => {
    setState({
      ...state,
      showForm: false,
    });
  };
  const handleModal = () => {
    setState({
      ...state,
      openModal: true,
    });
  };
  const handlePatientModal = () => {
    setState({
      ...state,
      openPatientModal: true,
    });
  };
  const handleClose = () => {
    setState({
      ...state,
      openModal: false,
    });
  };
  const handlePatientModalClose = () => {
    setState({
      ...state,
      openPatientModal: false,
    });
  };
  const dialogClose = () => {
    setOpenDialog(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const isAbhaCreated =
    searchResultData.healthId && searchResultData.healthIdNumber ? true : false;
  const isActive = true;
  const handleSubmit = async () => {
    setOpenDialog(true);

    const result = await submitPatient(
      searchResultData.healthIdNumber,
      title,
      searchResultData.healthId,
      searchResultData.name,
      searchResultData.pinCode,
      searchResultData.dob,
      age,
      searchResultData.address,
      searchResultData.gender,
      searchResultData.mobile,
      searchResultData.stateName,
      isAbhaCreated,
      isActive
    );
    console.log(result);
    setOpenDialog(true);
    setTimeout(() => {
      setOpenDialog(false);
    }, 2000);
  };
  return (
    <div className="p-2">
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
            <InfoIcon />
            <Tab
              sx={{ fontSize: 14, fontStyle: "bold" }}
              label="Patient Details"
              onClick={patientDetails}
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FormatListBulletedIcon />
            <Tab
              label="Patient List"
              sx={{ fontSize: 14, fontStyle: "bold" }}
              onClick={patientList}
            />
          </Box>
        </Tabs>
      </Box>
      {showForm ? (
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            transform: "scale(0.9)",
          }}
        >
          <FormControl
            sx={{
              border: "solid",
              borderWidth: 2,
              boxShadow: 4,
              borderRadius: 4,
              px: 4,
              py: 2,
              mx: "auto",
              borderColor: "#BDBDBD",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 3,
                alignItems: "center",
              }}
            >
              <TextField
                variant="outlined"
                required
                id="outlined-required"
                label="Title"
                value={title}
                onChange={handleTitle}
              />
              <TextField
                value={
                  searchResultData.name || patientResultData.name
                    ? searchResultData.name || patientResultData.name
                    : name
                }
                InputLabelProps={{
                  shrink: searchResultData.name !== "", // shrink label if value is not empty
                }}
                onChange={handleName}
                variant="outlined"
                required
                id="outlined-required"
                placeholder="Name"
              />

              <TextField
                variant="outlined"
                value={
                  searchResultData.pinCode ? searchResultData.pinCode : pincode
                }
                InputLabelProps={{
                  shrink: searchResultData.pinCode !== "", // shrink label if value is not empty
                }}
                onChange={handlePincode}
                required
                id="outlined-required"
                placeholder="Pin"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 4,
                alignItems: "center",
              }}
            >
              <TextField
                type="datetime-local"
                variant="outlined"
                value={
                  searchResultData.dob || patientResultData.dob
                    ? searchResultData.dob || patientResultData.dob
                    : initValue
                }
                required
                onChange={handleChange}
                placeholder="Date of Birth"
                id="outlined-required"
                sx={{ width: "30%" }}
              />

              <TextField
                required
                variant="outlined"
                value={
                  age || patientAge
                    ? age + " years" || patientAge + " years"
                    : ageNum
                }
                onChange={handleAge}
                id="outlined-required"
                placeholder="Age"
                sx={{ width: "30%" }}
              />

              <TextField
                required
                variant="outlined"
                value={
                  searchResultData.address
                    ? searchResultData.address
                    : initValue
                }
                InputLabelProps={{
                  shrink: searchResultData.address !== "", // shrink label if value is not empty
                }}
                onChange={handleChange}
                id="outlined-required"
                placeholder="Permanent Address"
                sx={{ width: "30%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "start",
              }}
            >
              <FormControl sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>

                {searchResultData.gender || patientResultData.gender ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={
                      searchResultData.gender || patientResultData.gender
                        ? searchResultData.gender || patientResultData.gender
                        : ""
                    }
                  >
                    <MenuItem
                      value={
                        searchResultData.gender || patientResultData.gender
                          ? searchResultData.gender || patientResultData.gender
                          : ""
                      }
                    >
                      {searchResultData.gender || patientResultData.gender
                        ? searchResultData.gender || patientResultData.gender
                        : ""}
                    </MenuItem>
                  </Select>
                ) : (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={
                      searchResultData.gender || patientResultData.gender
                        ? searchResultData.gender || patientResultData.gender
                        : ""
                    }
                  >
                    <>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Transgender">Transgender</MenuItem>
                    </>
                  </Select>
                )}
              </FormControl>
              <FormControl sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Marital Status
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Marital Status"
                >
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Unmarried">Unmarried</MenuItem>
                </Select>
              </FormControl>
              <TextField label="C/O" sx={{ width: "30%" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "start",
              }}
            >
              <TextField
                variant="outlined"
                value={
                  searchResultData.mobile || patientResultData.mobileNumber
                    ? searchResultData.mobile || patientResultData.mobileNumber
                    : initValue
                }
                InputLabelProps={{
                  shrink: searchResultData.mobile !== "", // shrink label if value is not empty
                }}
                onChange={handleChange}
                placeholder="Contact No."
                sx={{ width: "30%" }}
              />

              <FormControl sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Relationships
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Relationships"
                >
                  {relationships.relationship.map((relation, item) => (
                    <MenuItem value={relation.name} key={item}>
                      {" "}
                      {relation.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Blood Group
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Marital Status"
                >
                  {samples.sample.map((blood, index) => (
                    <MenuItem value={blood.name} key={index}>
                      {" "}
                      {blood.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "start",
              }}
            >
              <TextField label="Alternate Mobile No." sx={{ width: "30%" }} />
              <FormControl sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Relationships"
                  value={
                    searchResultData.stateName
                      ? searchResultData.stateName
                      : initValue
                  }
                >
                  {searchResultData.stateName}
                  {searchResultData.stateName ? (
                    <MenuItem value={searchResultData.stateName}>
                      {searchResultData.stateName}
                    </MenuItem>
                  ) : (
                    <>
                      {states.state.map((stateName, item) => (
                        <MenuItem value={stateName.name} key={item}>
                          {" "}
                          {stateName.name}
                        </MenuItem>
                      ))}
                    </>
                  )}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">Districts</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Marital Status"
                >
                  {districts.district.map((distName, index) => (
                    <MenuItem value={distName.name} key={index}>
                      {" "}
                      {distName.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  width: "30%",
                  backgroundColor: "#00E676",
                  ":hover": { backgroundColor: "#00C853" },
                }}
                size="medium"
                onClick={handleModal}
              >
                Create ABHA
              </Button>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  width: "30%",
                  backgroundColor: "#EEEEEE",
                  ":hover": { backgroundColor: "#E0E0E0" },
                  color: "#000",
                }}
                size="medium"
                onClick={handlePatientModal}
              >
                Scan Qr
              </Button>
              {(searchResultData.healthIdNumber ||
                patientResultData.healthIDNumber) &&
                (searchResultData.healthIdNumber ||
                  patientResultData.healthIDNumber) && (
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography>ABHA ID:</Typography>

                    <Typography sx={{ color: "red" }}>
                      {searchResultData.healthIdNumber ||
                        patientResultData.healthIDNumber}
                    </Typography>
                    <Typography>ABHA Address:</Typography>
                    <Typography sx={{ color: "blue" }}>
                      {searchResultData.healthId || patientResultData.healthID}
                    </Typography>
                  </Box>
                )}
            </Box>

            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
              Submit
            </Button>
          </FormControl>

          {abhaCardResult && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "50%",
              }}
            >
              <img
                style={{ width: "100vh" }}
                src={`data:image/png;base64,${abhaCardResult}`}
                alt="abha-card"
              />

              <span className="text-md font-medium text-center">QR code</span>
              <img
                style={{ width: "30%" }}
                src={`data:image/png;base64,${abhaQrCodeResult}`}
                alt="QR"
              />
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownload(abhaCardResult)}
              >
                Download
              </Button>
            </Box>
          )}
        </Container>
      ) : (
        <PatientList />
      )}
      {openDialog && <DataModal isOpen={openDialog} onClose={dialogClose} />}
      {openModal && <ModalPopup isOpen={openModal} isClose={handleClose} />}
      {openPatientModal && (
        <GetPatientModal
          isOpen={openPatientModal}
          isClose={handlePatientModalClose}
        />
      )}
    </div>
  );
}

export default PatientDashboard;
