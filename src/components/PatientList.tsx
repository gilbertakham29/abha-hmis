import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import departments from "../../data.json";
import { useState } from "react";

function PatientList() {
  const [showTable, setShowTable] = useState(false);
  const openTable = () => {
    setShowTable(true);
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
            placeholder="type uhid here..."
          />
          <TextField
            variant="outlined"
            label="Patient name"
            placeholder="patient name here...."
          />
          <div style={{ display: "inline-flex", gap: 3 }}>
            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Date From*"
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
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Transgender">Transgender</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              mt: 3,
              width: "20%",
            }}
          >
            <InputLabel id="demo-simple-select-label">Status</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              mt: 3,
              width: "20%",
            }}
          >
            <InputLabel id="demo-simple-select-label">Department</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              {departments.department.map((dept, item) => (
                <MenuItem value={dept.name} key={item}>
                  {dept.name}
                </MenuItem>
              ))}
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
              onClick={openTable}
            >
              Search
            </Button>
            <Button
              size="medium"
              sx={{ color: "#BDBDBD", borderColor: "#EEEEEE" }}
              variant="outlined"
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
              <TableRow>
                <TableCell>SL No</TableCell>
                <TableCell>HID</TableCell>
                <TableCell>PATIENT NAME</TableCell>
                <TableCell>GENDER</TableCell>
                <TableCell>AGE</TableCell>
                <TableCell>MOBILE NO</TableCell>
                <TableCell>ADDRESS</TableCell>
                <TableCell>ADDED ON</TableCell>
                <TableCell>MOBILE NO</TableCell>
                <TableCell>ADDED BY</TableCell>

                <TableCell>ACTION</TableCell>

                <TableCell>CREATE ABHA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell>KAHRI-HID2318207</TableCell>
                <TableCell>Miss. Khumukcham Priya </TableCell>
                <TableCell>FEMALE</TableCell>
                <TableCell>24 </TableCell>
                <TableCell>9774087309</TableCell>
                <TableCell>Khagempalli</TableCell>
                <TableCell>02-11-2023:03:41:02</TableCell>
                <TableCell>G. A. Sangeeta Devi</TableCell>
                <TableCell>Ravi</TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "inline-flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ fontSize: "0.6rem", height: 42 }}
                  >
                    CREATE ABHA
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  2
                </TableCell>
                <TableCell>KAHRI-HID2318207</TableCell>
                <TableCell>Miss. Khumukcham Priya </TableCell>
                <TableCell>FEMALE</TableCell>
                <TableCell>24 </TableCell>
                <TableCell>9774087309</TableCell>
                <TableCell>Khagempalli</TableCell>
                <TableCell>02-11-2023:03:41:02</TableCell>
                <TableCell>G. A. Sangeeta Devi</TableCell>
                <TableCell>Nikhil N</TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "inline-flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ fontSize: "0.6rem", height: 42 }}
                  >
                    CREATE ABHA
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default PatientList;
