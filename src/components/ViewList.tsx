import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
  Paper,
} from "@mui/material";
import diagnostics from "../../diagnostic.json";
import prescriptions from "../../prescription.json";
function ViewList() {
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          minHeight: 275,
          mb: 2,
          borderColor: "#000",
          border: "1px solid",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#E0E0E0",
              px: 2,
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: 18, color: "#000" }}
                color="text.secondary"
                gutterBottom
              >
                DOCUMENT:{" "}
                {diagnostics.entry[0].resource.type?.coding[0].display}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Date: {diagnostics.entry[0].resource.date?.toString()}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Status: {diagnostics.entry[0].resource.status}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h4" sx={{ fontSize: "0.9rem", mt: 2 }}>
            Encounter
          </Typography>
          <ul>
            <li style={{ fontSize: "1rem" }}>
              {diagnostics.entry[4].resource.class?.display}
            </li>
            <li>
              <Box sx={{ display: "inline-flex", gap: 1 }}>
                <Typography sx={{ fontSize: "1rem" }}>
                  Start date: {diagnostics.entry[4].resource.period?.start}
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>
                  End date: {diagnostics.entry[4].resource.period?.end}
                </Typography>
              </Box>
            </li>
            <li style={{ fontSize: "1rem" }}>
              Status: {diagnostics.entry[4].resource.status}
            </li>
          </ul>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Paper sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  backgroundColor: "#E0E0E0",
                }}
              >
                #Diagnostic Report: {diagnostics.entry[5].resource.resourceType}
              </Typography>
              <Box>
                <ul>
                  <li style={{ fontSize: "1rem" }}>
                    Status: {diagnostics.entry[5].resource.status}
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Issued: {diagnostics.entry[5].resource.issued}
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Result: {diagnostics.entry[5].resource.conclusion}
                  </li>
                </ul>
              </Box>
            </Paper>
            <Paper sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  backgroundColor: "#E0E0E0",
                }}
              >
                {diagnostics.entry[6].resource.resourceType}
              </Typography>
              <Box>
                <ul>
                  <li style={{ fontSize: "1rem" }}>
                    {diagnostics.entry[6].resource.code?.text} -{" "}
                    {diagnostics.entry[7].resource.code?.text}
                  </li>
                  <li style={{ fontSize: "1rem" }}>
                    Patient: {diagnostics.entry[6].resource.subject?.display}
                  </li>
                </ul>
              </Box>
            </Paper>
          </Box>
        </CardContent>
        <CardActions></CardActions>
      </Card>
      <Card
        sx={{
          minWidth: 275,
          minHeight: 275,
          mb: 2,
          borderColor: "#000",
          border: "1px solid",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#E0E0E0",
              px: 2,
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: 18, color: "#000" }}
                color="text.secondary"
                gutterBottom
              >
                DOCUMENT:{" "}
                {prescriptions.entry[0].resource.type?.coding[0].display}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Date: {prescriptions.entry[0].resource.date?.toString()}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h4" sx={{ fontSize: "0.9rem", mt: 2 }}>
            Encounter
          </Typography>
          <ul>
            <li style={{ fontSize: "1rem" }}>
              Doctor: {prescriptions.entry[0].resource.author[0].display}
            </li>
          </ul>

          <Paper sx={{ p: 2 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                backgroundColor: "#E0E0E0",
              }}
            >
              {prescriptions.entry[0].resource.title}:{" "}
              {prescriptions.entry[0].resource.section[0].title}
            </Typography>
            <Box>
              <ul>
                <li style={{ fontSize: "1rem" }}>
                  Patient: {prescriptions.entry[2].resource.name[0].text}
                </li>
                <li style={{ fontSize: "1rem" }}>
                  Gender: {prescriptions.entry[2].resource.gender}
                </li>
                <li style={{ fontSize: "1rem" }}>
                  Encounter: {prescriptions.entry[3].resource.class?.display}
                </li>
                <li style={{ fontSize: "1rem" }}>
                  Date: {prescriptions.entry[3].resource.period.start}
                </li>
              </ul>
            </Box>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                backgroundColor: "#E0E0E0",
              }}
            >
              {prescriptions.entry[4].resource.resourceType}
            </Typography>
            <Box>
              <ul>
                <li style={{ fontSize: "1rem" }}>
                  Medicine -{" "}
                  {prescriptions.entry[4].resource.code?.coding[0].display}
                </li>
                <li style={{ fontSize: "1rem" }}>
                  Dosage:{" "}
                  {prescriptions.entry[5].resource.dosageInstruction[0].text}
                </li>
              </ul>
            </Box>
          </Paper>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </>
  );
}

export default ViewList;
