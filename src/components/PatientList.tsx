import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { getAbhaCard, patientSearch } from "../api/abha-api";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { fetchPatientList } from "../api/abha-api";
import { useSelector } from "react-redux";
import { PatientListData, PatientResult } from "../redux/reducer";
import { useDispatch } from "react-redux";
import ModalPopup from "./modals/Modal";
import DownloadIcon from "@mui/icons-material/Download";
import { handleDownload } from "../actions/download";
function PatientList() {
  const [showTable, setShowTable] = useState(false);
  const [uhid, setUhid] = useState("");
  const [name, setName] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date().toISOString());
  const [gender, setGender] = useState("");
  //const [isActive, setIsActive] = useState("");
  const [openModal, setOpenModal] = useState(false);
  type RootState = {
    abhaCardResult: string;
    patientList: PatientListData[];
    patientResult: PatientResult;
  };

  const abhaCardResult = useSelector(
    (state: RootState) => state.abhaCardResult
  );

  console.log(abhaCardResult);
  //const patientResult = useSelector((state: RootState) => state.patientResult);
  const handleModal = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const patientSearchResult = useSelector(
    (state: RootState) => state.patientList
  );
  console.log(patientSearchResult);

  const handleUhid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUhid(e.target.value);
  };
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
  };
  const handleGender = (e: SelectChangeEvent<string>) => {
    setGender(e.target.value);
  };

  //const activeBit = isActive == "Active" ? 1 : 0;
  const dispatch = useDispatch();

  //const handleSearchPromises = phoneNumbers.map((phoneNumber) => phoneNumber);
  const searchPatient = async () => {
    const result = await fetchPatientList(dispatch);
    console.log(result);

    setShowTable(true);
    const phoneNumbers = patientSearchResult.map(
      (phone) => phone.contactNumber
    );

    // Perform patientSearch for each phone number
    const searchResults = await Promise.all(
      phoneNumbers.map((phoneNumber) => patientSearch(phoneNumber, dispatch))
    );

    // Assuming handleSearch returns an array of response data, you can process the results here
    searchResults.forEach((responseData, index) => {
      const abhaCard = responseData.abhaAccountID[0] as number; // Explicitly cast to number
      getAbhaCard(abhaCard, dispatch);
      console.log(
        `Search result for phone number ${phoneNumbers[index]}:`,
        abhaCard
      );
    });
  };

  const handleReset = () => {
    setUhid("");
    setName("");
    setGender("");
    setDateFrom("");
    setShowTable(false);
  };
  return (
    <>
      <Container
        sx={{
          border: "solid",
          borderWidth: 2,
          boxShadow: 4,
          borderRadius: 4,
          width: "100%",
          mt: 2,
          p: 2,
          mx: "auto",
          overflow: "hidden",
          borderColor: "#BDBDBD",
        }}
      >
        <FormControl
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <TextField
            variant="outlined"
            label="UHID"
            value={uhid}
            onChange={handleUhid}
            placeholder="type uhid here..."
          />
          <TextField
            variant="outlined"
            label="Patient name"
            value={name}
            onChange={handleName}
            placeholder="patient name here...."
          />
          <div style={{ display: "inline-flex", gap: 3 }}>
            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Date From*"
              value={dateFrom}
              onChange={handleDateFrom}
              placeholder="Date from*"
            />
            <TextField placeholder="00:00" sx={{ width: "20%" }} />
            <FormControl sx={{ width: "22%" }}>
              <InputLabel>Time</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="time"
                defaultValue="AM"
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "inline-flex", gap: 3 }}>
            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Date To*"
              placeholder="Date To*"
            />
            <TextField placeholder="00:00" sx={{ width: "20%" }} />
            <FormControl sx={{ width: "22%" }}>
              <InputLabel>Time</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="AM"
                defaultValue="AM"
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </FormControl>
          </div>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 3,
          }}
        >
          <FormControl
            sx={{
              mt: 3,
              width: "20%",
            }}
          >
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={gender}
              onChange={handleGender}
            >
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="F">F</MenuItem>
              <MenuItem value="Trans">Trans</MenuItem>
            </Select>
          </FormControl>

          <div
            style={{
              display: "inline-flex",
              marginLeft: 24,
              gap: 3,
              marginTop: 18,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#039BE5",
                ":hover": { backgroundColor: "#0288D1" },
              }}
              size="medium"
              onClick={searchPatient}
            >
              Search
            </Button>
            <Button
              size="medium"
              sx={{ color: "#BDBDBD", borderColor: "#EEEEEE" }}
              variant="outlined"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </Box>
      </Container>
      {showTable && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EEEEEE", color: "#fff" }}>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  SL No
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  HID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  PATIENT NAME
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  GENDER
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  AGE
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  MOBILE NO
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  ADDRESS
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  ADDED ON
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  ABHA No
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  ABHA ADDRESS
                </TableCell>

                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  CREATE ABHA
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  DOWNLOAD
                </TableCell>
              </TableRow>
            </TableHead>
            {patientSearchResult.map((patient) => {
              return (
                <>
                  {showTable && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" component="th" scope="row">
                          {patient.patientId}
                        </TableCell>
                        <TableCell align="center">{patient.uhid}</TableCell>
                        <TableCell align="center">
                          {patient.patientName}
                        </TableCell>
                        <TableCell align="center">{patient.gender}</TableCell>
                        <TableCell align="center">{patient.age}</TableCell>
                        <TableCell align="center">
                          {patient.contactNumber}
                        </TableCell>
                        <TableCell align="center">
                          {patient.permanentAddress}
                        </TableCell>
                        <TableCell align="center">
                          {patient.addedDate}
                        </TableCell>
                        <TableCell align="center">{patient.abhaId}</TableCell>
                        <TableCell align="center">
                          {patient.abhaAddress}
                        </TableCell>

                        <TableCell>
                          {patient.isAbhaCreated ? (
                            <Button
                              variant="contained"
                              size="small"
                              disabled
                              sx={{ fontSize: "0.6rem", height: 42 }}
                            >
                              CREATE ABHA
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleModal}
                              sx={{ fontSize: "0.6rem", height: 42 }}
                            >
                              CREATE ABHA
                            </Button>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={() => handleDownload(abhaCardResult)}
                          ></Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </>
              );
            })}
          </Table>
        </TableContainer>
      )}
      {openModal && <ModalPopup isOpen={openModal} isClose={handleClose} />}
    </>
  );
}

export default PatientList;
