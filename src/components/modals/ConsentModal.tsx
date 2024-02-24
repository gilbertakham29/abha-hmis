import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { care, patientIdentifier } from "../../data/consent";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import { useState } from "react";
const style = {
  position: "absolute",
  left: 0,
  right: 0,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  px: 4,
  transform: "scale(0.9)",
  borderWidth: 1,
  width: "50%",
  py: 2,
  borderColor: "#BDBDBD",
};
function ConsentModal({ isOpen, isClose }) {
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
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
            <Typography variant="h5" component="h5" sx={{ fontSize: "1.3rem" }}>
              Consent Request Form
            </Typography>
            <Box
              sx={{
                border: "1px solid #000",
                borderBottom: 1,
                borderColor: "#BDBDBD",
                mt: 2,
              }}
            ></Box>
          </Box>

          <Typography
            variant="h2"
            component="h2"
            sx={{ fontSize: "0.9rem", mt: 2 }}
          >
            All the fields are mandatory
          </Typography>

          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              gap: 8,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Patient Identifier
            </Typography>
            <Autocomplete
              sx={{ width: "40vh", mb: 2 }}
              id="size-small-standard"
              size="small"
              options={patientIdentifier}
              defaultValue="@sbx"
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              gap: 5,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Purpose of request
            </Typography>

            <Autocomplete
              sx={{ width: "50vh", mb: 2 }}
              id="size-small-standard"
              size="small"
              options={care}
              defaultValue="Care Management"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Purpose"
                  placeholder="Favorites"
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              gap: 8,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Health info form
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ mb: 2 }}
                slotProps={{ textField: { variant: "standard" } }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              gap: 10,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Health info to
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ mb: 2 }}
                slotProps={{ textField: { variant: "standard" } }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              mt: 2,
              gap: 10,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Health info type
            </Typography>

            <Grid container rowSpacing={1}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox onChange={handleChange} name="gilad" />
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    Diagnostic Reports
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Checkbox onChange={handleChange} name="gilad" />
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    Prescription
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox onChange={handleChange} name="gilad" />
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    OPConsultation
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox onChange={handleChange} name="gilad" />
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    Wellness Record
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox onChange={handleChange} name="gilad" />
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    Discharge Summary
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox onChange={handleChange} name="gilad" />
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    Immunization Record
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox onChange={handleChange} name="gilad" />
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    Health Document Record
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              gap: 10,
            }}
          >
            <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
              Consent expiry
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={selectedDate}
                onChange={handleDateChange}
                sx={{ mb: 2 }}
                minDateTime={new Date()}
                slotProps={{ textField: { variant: "standard" } }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2,
              mx: 28,
              gap: 10,
            }}
          >
            <Button
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: "#4CAF50",
                ":hover": { backgroundColor: "#43A047" },
              }}
            >
              Request consent
            </Button>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}

export default ConsentModal;
