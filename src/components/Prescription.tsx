import AddIcon from "@mui/icons-material/Add";

import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";

function Prescription() {
  const [type, setType] = useState("");
  const [drugName, setDrugName] = useState("");
  const [route, setRoute] = useState("");
  const [frequency, setFrequency] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState("");
  const [desc, setDesc] = useState("");
  const [table, setTable] = useState(false);
  const handleSubmit = () => {
    setTable(true);
  };
  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };
  const handleDrugName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDrugName(e.target.value);
  };

  const handleRoute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoute(e.target.value);
  };
  const handleFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(e.target.value);
  };
  const handleDosage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDosage(e.target.value);
  };
  const handleInstructions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstructions(e.target.value);
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const handleDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays(e.target.value);
  };
  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };
  return (
    <Container
      sx={{
        border: "solid",
        borderWidth: 2,
        boxShadow: 1,
        borderRadius: 4,
        width: "100%",
        mt: 1,
        p: 2,
        mx: "auto",
        overflow: "hidden",
        borderColor: "#BDBDBD",
      }}
    >
      <Grid
        sx={{ mt: 1 }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={2}>
          <TextField label="Type" value={type} onChange={handleType} />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Drug Name"
            value={drugName}
            onChange={handleDrugName}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField label="Route" value={route} onChange={handleRoute} />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Frequency"
            value={frequency}
            onChange={handleFrequency}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField label="Dosage" value={dosage} onChange={handleDosage} />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Instructions"
            value={instructions}
            onChange={handleInstructions}
          />
        </Grid>
      </Grid>
      <Grid
        sx={{ mt: 1 }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={3}>
          <TextField type="date" value={date} onChange={handleDate} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Days" value={days} onChange={handleDays} />
        </Grid>
        <Grid item xs={6}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            style={{
              width: "100%",

              borderColor: "#BDBDBD",
            }}
            value={desc}
            onChange={handleDesc}
            placeholder="Description"
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mt: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<AddIcon />}
        >
          Add Prescription
        </Button>
        <Button
          variant="outlined"
          sx={{ borderColor: "#FFEE58", color: "#FBC02D" }}
        >
          Reset
        </Button>
      </Box>
      {table && (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Strength</TableCell>
                <TableCell align="center">Route</TableCell>
                <TableCell align="center">Frequency</TableCell>
                <TableCell align="center">Dosage</TableCell>
                <TableCell align="center">Instructions</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Days</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  name
                </TableCell>
                <TableCell align="center">calories</TableCell>
                <TableCell align="center">fat</TableCell>
                <TableCell align="center">carbs</TableCell>
                <TableCell align="center">protein</TableCell>
                <TableCell align="center">100ml</TableCell>
                <TableCell align="center">Take daily</TableCell>
                <TableCell align="center">02-04-24</TableCell>
                <TableCell align="center">10</TableCell>
                <TableCell align="center">
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
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Prescription;
