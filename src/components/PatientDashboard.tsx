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
function calculateAge(dateOfBirth: number) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}
function PatientDashboard() {
  const initialState = {
    showForm: true,
    abhaGenerate: false,
    openModal: false,
  };
  type getDemographicsResult = {
    abhaAccountID: number;
    name: string;
    pinCode: string;
    dob: string;
    address: string;
    mobile: string;
    healthIdNumber: string;
    healthId: string;
  };
  type abhaCardResponse = string;
  type abhaQrResponse = string;
  type RootState = {
    searchResult: getDemographicsResult;
  };
  type abhaCardState = {
    abhaCardResult: abhaCardResponse;
  };
  type abhaQrState = {
    abhaQrCode: abhaQrResponse;
  };
  const [state, setState] = useState(initialState);
  const { showForm, openModal } = state;
  const searchResult = useSelector((state: RootState) => state.searchResult);
  const abhaCardResult = useSelector(
    (state: abhaCardState) => state.abhaCardResult
  );
  const abhaQrCodeResult = useSelector(
    (state: abhaQrState) => state.abhaQrCode
  );
  console.log(searchResult);
  const age = calculateAge(Number(searchResult.dob));
  console.log(age);

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
                value={searchResult.name}
                InputLabelProps={{
                  shrink: searchResult.name !== "", // shrink label if value is not empty
                }}
                variant="outlined"
                required
                id="outlined-required"
                placeholder="Name"
              />
              <TextField
                variant="outlined"
                value={searchResult.pinCode}
                InputLabelProps={{
                  shrink: searchResult.pinCode !== "", // shrink label if value is not empty
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
                value={searchResult.dob}
                InputLabelProps={{
                  shrink: searchResult.dob !== "", // shrink label if value is not empty
                }}
                required
                placeholder="Date of Birth"
                id="outlined-required"
                sx={{ width: "30%" }}
              />

              <TextField
                required
                variant="outlined"
                value={searchResult.dob && age + " years"}
                id="outlined-required"
                placeholder="Age"
                sx={{ width: "30%" }}
              />
              <TextField
                required
                variant="outlined"
                value={searchResult.address}
                InputLabelProps={{
                  shrink: searchResult.address !== "", // shrink label if value is not empty
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
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Transgender">Transgender</MenuItem>
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
                value={searchResult.mobile}
                InputLabelProps={{
                  shrink: searchResult.mobile !== "", // shrink label if value is not empty
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
                >
                  {states.state.map((stateName, item) => (
                    <MenuItem value={stateName.name} key={item}>
                      {" "}
                      {stateName.name}
                    </MenuItem>
                  ))}
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
              {searchResult.healthIdNumber && (
                <Box sx={{ mt: 1 }}>
                  <Typography>
                    ABHA ID: {searchResult.healthIdNumber}
                  </Typography>
                  <Typography>ABHA Address: {searchResult.healthId}</Typography>
                </Box>
              )}
            </Box>

            <Button variant="contained" sx={{ mt: 2 }}>
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
