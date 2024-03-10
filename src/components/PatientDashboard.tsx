import Navbar from "./Navbar";
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

  type RootState = {
    searchResult: getDemographicsResult;
    abhaCardResult: object;
    abhaQrCode: object;
  };

  const [state, setState] = useState(initialState);
  const { showForm, openModal } = state;

  // Use useSelector to select the searchResult from the Redux store
  const searchResultData = useSelector(
    (state: RootState) => state.searchResult
  );
  console.log(searchResultData);

  const abhaCardResult = useSelector(
    (state: RootState) => state.abhaCardResult
  );
  const abhaQrCodeResult = useSelector((state: RootState) => state.abhaQrCode);
  console.log(searchResultData);
  const age = calculateAge(searchResultData.dob);
  //const age = calculateAge(Number(searchResult.dob));
  //console.log(age);

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

  const handleClose = () => {
    setState({
      ...state,
      openModal: false,
    });
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
              />
              <TextField
                value={searchResultData.name}
                InputLabelProps={{
                  shrink: searchResultData.name !== "", // shrink label if value is not empty
                }}
                variant="outlined"
                required
                id="outlined-required"
                placeholder="Name"
              />
              <TextField
                variant="outlined"
                value={searchResultData.pinCode}
                InputLabelProps={{
                  shrink: searchResultData.pinCode !== "", // shrink label if value is not empty
                }}
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
                value={searchResultData.dob}
                required
                placeholder="Date of Birth"
                id="outlined-required"
                sx={{ width: "30%" }}
              />

              <TextField
                required
                variant="outlined"
                value={age ? age + " years" : "age"}
                id="outlined-required"
                placeholder="Age"
                sx={{ width: "30%" }}
              />
              <TextField
                required
                variant="outlined"
                value={searchResultData.address}
                InputLabelProps={{
                  shrink: searchResultData.address !== "", // shrink label if value is not empty
                }}
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

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={searchResultData.gender ? searchResultData.gender : ""}
                >
                  {searchResultData.gender}
                  {searchResultData.gender ? (
                    <MenuItem value={searchResultData.gender}>
                      {searchResultData.gender}
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Transgender">Transgender</MenuItem>
                    </>
                  )}
                </Select>
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
                value={searchResultData.mobile}
                InputLabelProps={{
                  shrink: searchResultData.mobile !== "", // shrink label if value is not empty
                }}
                placeholder="Contact No."
                sx={{ width: "30%" }}
              />
              <FormControl sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">
                  Realtionships
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
                      : "State"
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
                Get ABHA
              </Button>
              {searchResultData.healthIdNumber && (
                <Box sx={{ mt: 1 }}>
                  <Typography>
                    ABHA ID: {searchResultData.healthIdNumber}
                  </Typography>
                  <Typography>
                    ABHA Address: {searchResultData.healthId}
                  </Typography>
                </Box>
              )}
            </Box>

            <Button variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </FormControl>

          {searchResultData.healthId && (
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
            </Box>
          )}
        </Container>
      ) : (
        <PatientList />
      )}

      {openModal && <ModalPopup isOpen={openModal} isClose={handleClose} />}
    </div>
  );
}

export default PatientDashboard;
